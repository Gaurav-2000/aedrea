import { useEffect, useRef } from "react";
import {
    VideoTexture,
    SRGBColorSpace,
    LinearFilter,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    Vector4,
    Vector2,
    ShaderMaterial,
    DoubleSide,
    Mesh,
    PlaneGeometry,
    CanvasTexture,
} from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  uniform vec4 uFrom;     // x,y,w,h px (top-left origin, y down)
  uniform vec4 uTo;
  uniform float uShow;    // 0..1
  uniform vec2 uVp;       // viewport px
  uniform vec2 uFit;      // world units filling the viewport at z=0
  varying vec2 vUv;
  varying vec2 vRectWH;
  varying vec2 vScreen;  // 0..1 screen uv (top-left) for velocity sampling
  void main() {
    vec2 p = uv;          // 0..1 across the quad
    float pw = 1.0 - (pow(p.x * p.x, 0.75) + pow(1.0 - p.y, 1.5)) * 0.5;
    float sr = smoothstep(pw * 0.45, 0.55 + pw * 0.45, uShow);

    vec4 rect = mix(uFrom, uTo, sr);
    rect.x += mix(rect.z, 0.0, cos(sr * 6.2831853) * 0.5 + 0.5) * 0.06;

    vec2 sp = rect.xy + p * rect.zw;          // vertex pos in px
    float rot = (smoothstep(0.0, 1.0, sr) - sr) * -1.05;
    vec2 ctr = rect.xy + rect.zw * 0.5;
    vec2 rel = sp - ctr;
    float s = sin(rot), c = cos(rot);
    rel = mat2(c, -s, s, c) * rel;
    sp = ctr + rel;

    vec2 world = vec2(
      (sp.x - uVp.x * 0.5) * (uFit.x / uVp.x),
      -(sp.y - uVp.y * 0.5) * (uFit.y / uVp.y)
    );
    gl_Position = projectionMatrix * modelViewMatrix * vec4(world, 0.0, 1.0);
    vUv = vec2(uv.x, 1.0 - uv.y); // flip so the video isn't upside down
    vRectWH = rect.zw;
    vScreen = sp / uVp; // final vertex screen pos -> 0..1 (top-left origin)
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVideoAspect;
  uniform float uRadius;
  uniform sampler2D uVelMap;
  uniform float uVelAmt;
  uniform float uVelScale;
  varying vec2 vUv;
  varying vec2 vRectWH;
  varying vec2 vScreen;
  void main() {
    float planeAspect = vRectWH.x / max(vRectWH.y, 1.0);
    vec2 s = planeAspect > uVideoAspect
      ? vec2(1.0, uVideoAspect / planeAspect)
      : vec2(planeAspect / uVideoAspect, 1.0);
    vec2 uv = (vUv - 0.5) * s + 0.5;
    vec2 vel = texture2D(uVelMap, vScreen).rg - 0.5;
    uv += vel * uVelAmt * uVelScale;
    vec3 col = texture2D(uTexture, uv).rgb;

    vec2 p = vUv * vRectWH;
    vec2 halfRes = vRectWH * 0.5;
    float r = min(uRadius, min(halfRes.x, halfRes.y));
    vec2 q = abs(p - halfRes) - (halfRes - vec2(r));
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    float alpha = 1.0 - smoothstep(-1.0, 1.0, d);
    gl_FragColor = vec4(col, alpha);
  }
`;

// Compute once at module-level to optimize rendering and prevent loading video asset on mobile
const isDesktopDevice = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && window.innerWidth > 768;

const supportsWebGLDevice = typeof window !== "undefined" ? (() => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return false;
        const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
        if (renderer.includes("SwiftShader")) return false;
        return maxTex >= 4096;
    } catch {
        return false;
    }
})() : false;

export default function ReelCanvas({ videoSrc }) {
    const finalVideoSrc = videoSrc;
    if (!isDesktopDevice || !supportsWebGLDevice) {
        if (typeof document !== "undefined") {
            document.documentElement.classList.add("reel-native");
        }
        return null;
    }

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        // ── Ensure video is ready before starting WebGL pipeline ──
        // On first load (cold cache), the video may not have buffered any
        // frame data yet. We must wait for readyState >= 2 (HAVE_CURRENT_DATA)
        // before creating the VideoTexture, otherwise Three.js renders black.
        let disposed = false;

        const bootstrapWebGL = () => {
            if (disposed) return;

            try {
                const videoTex = new VideoTexture(video);
                videoTex.colorSpace = SRGBColorSpace;
                videoTex.minFilter = LinearFilter;
                videoTex.generateMipmaps = false;
                initWebGL(container, canvas, video, videoTex, () => disposed);
            } catch (e) {
                console.warn("WebGL initialization failed, falling back to native video:", e);
                document.documentElement.classList.add("reel-native");
            }
        };

        // Force play with retry — browsers may block autoplay on first visit
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");

        const tryPlay = () => {
            video.play().catch(() => {
                // Retry on user interaction if autoplay was blocked
                const retryPlay = () => {
                    video.play().catch(() => {});
                    window.removeEventListener("touchstart", retryPlay);
                    window.removeEventListener("click", retryPlay);
                };
                window.addEventListener("touchstart", retryPlay, { passive: true, once: true });
                window.addEventListener("click", retryPlay, { passive: true, once: true });
            });
        };

        if (video.readyState >= 2) {
            // Video already has frame data (warm cache / preloaded)
            tryPlay();
            bootstrapWebGL();
        } else {
            // Cold cache — wait for video to buffer at least one frame
            const onCanPlay = () => {
                video.removeEventListener("canplay", onCanPlay);
                tryPlay();
                bootstrapWebGL();
            };
            video.addEventListener("canplay", onCanPlay);

            // Safety timeout — if canplay never fires within 8s, bootstrap anyway
            // so the page isn't permanently broken
            const safetyTimer = setTimeout(() => {
                video.removeEventListener("canplay", onCanPlay);
                tryPlay();
                bootstrapWebGL();
            }, 8000);

            // Clean up the safety timer if canplay fires first
            video.addEventListener("canplay", () => clearTimeout(safetyTimer), { once: true });
        }

        return () => { disposed = true; };
    }, []);

    /** Initialises the full WebGL pipeline once the video has frame data */
    function initWebGL(container, canvas, video, videoTex, isDisposed) {
        let renderer, scene, camera, mesh, trigger, observer, checkDisposed;
        try {
            // Create WebGL Renderer
            renderer = new WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: false,
                powerPreference: "high-performance",
                depth: false,
                stencil: false,
            });
            renderer.setClearColor(0, 0);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            scene = new Scene();
            camera = new PerspectiveCamera(45, 1, 0.1, 100);
            camera.position.z = 3;

            // Initialize uniforms
            const uniforms = {
                uTexture: { value: videoTex },
                uVideoAspect: { value: 16 / 9 },
                uRadius: { value: 28 },
                uFrom: { value: new Vector4(0, 0, 1, 1) },
                uTo: { value: new Vector4(0, 0, 1, 1) },
                uShow: { value: 0 },
                uVp: { value: new Vector2(1, 1) },
                uFit: { value: new Vector2(1, 1) },
                uVelMap: { value: null },
                uVelAmt: { value: 0 },
                uVelScale: { value: 1 },
            };

            // Set video aspect if metadata is already loaded
            if (video.videoWidth && video.videoHeight) {
                uniforms.uVideoAspect.value = video.videoWidth / video.videoHeight;
            }
            video.addEventListener("loadedmetadata", () => {
                uniforms.uVideoAspect.value = video.videoWidth / video.videoHeight;
            });

            const material = new ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms,
                transparent: true,
                depthTest: false,
                depthWrite: false,
                side: DoubleSide,
            });

            // Reduced from (140, 90) = 12,600 vertices to (50, 32) = 1,600 vertices
            // Still visually smooth but 87% fewer vertices — big win on mid-range GPUs
            mesh = new Mesh(new PlaneGeometry(1, 1, 50, 32), material);
            mesh.frustumCulled = false;
            scene.add(mesh);

            let fitW = 1,
                fitH = 1;
            const resizeRenderer = () => {
                const w = window.innerWidth;
                const h = window.innerHeight;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();

                // Fit plane to camera perspective z=3
                const fovRad = (camera.fov * Math.PI) / 180;
                fitH = 2 * Math.tan(fovRad / 2) * camera.position.z;
                fitW = fitH * camera.aspect;
            };

            resizeRenderer();
            window.addEventListener("resize", resizeRenderer);

            // Scroll trigger for progress
            let scrollProgress = 0;
            const introEl = document.querySelector(".intro");
            trigger = introEl ? ScrollTrigger.create({
                trigger: introEl,
                start: "top top",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    scrollProgress = self.progress;
                },
            }) : null;

            // Make container visible
            gsap.set(container, { opacity: 1 });

            // Link the cursor velocity map canvas texture
            let velocityTexture = null;
            let lastPointerTime = 0;

            const keepPointerActive = () => {
                lastPointerTime = performance.now();
            };
            window.addEventListener("pointermove", keepPointerActive, {
                passive: true,
            });

            // Set up IntersectionObserver to only render and play when visible
            let canvasInView = true;
            let forceUpdate = true;
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (isDisposed()) return;
                    canvasInView = entry.isIntersecting;
                    if (canvasInView) {
                        forceUpdate = true;
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                },
                { threshold: 0 },
            );
            observer.observe(canvas);

            // Tick loop
            let prevProgress = -1;
            let prevScrollY = -1;

            const animate = () => {
                if (isDisposed()) return;

                if (!canvasInView) {
                    requestAnimationFrame(animate);
                    return;
                }

                const scrollY = window.scrollY;
                const activePointer = performance.now() - lastPointerTime < 4000;
                const isVideoPlaying =
                    !video.paused && !video.ended && video.readyState >= 2;

                // Skip render if no visual state changed and video is not playing
                if (
                    !isVideoPlaying &&
                    !forceUpdate &&
                    scrollProgress === prevProgress &&
                    scrollY === prevScrollY &&
                    !activePointer
                ) {
                    requestAnimationFrame(animate);
                    return;
                }

                forceUpdate = false;
                prevProgress = scrollProgress;
                prevScrollY = scrollY;

                // Lazy load velocity Canvas texture once available
                if (!velocityTexture && window.velocityCanvas) {
                    velocityTexture = new CanvasTexture(window.velocityCanvas);
                    velocityTexture.flipY = false;
                    velocityTexture.minFilter = LinearFilter;
                    velocityTexture.magFilter = LinearFilter;
                    velocityTexture.generateMipmaps = false;
                    uniforms.uVelMap.value = velocityTexture;
                    uniforms.uVelAmt.value = 0.06;
                }

                const fromEl = document.querySelector(".hero-reel");
                const toEl = document.querySelector(".reel-full__card");

                if (fromEl && toEl) {
                    const fromRect = fromEl.getBoundingClientRect();
                    const toRect = toEl.getBoundingClientRect();

                    uniforms.uFrom.value.set(
                        fromRect.left,
                        fromRect.top,
                        Math.max(1, fromRect.width),
                        Math.max(1, fromRect.height),
                    );
                    uniforms.uTo.value.set(
                        toRect.left,
                        toRect.top,
                        Math.max(1, toRect.width),
                        Math.max(1, toRect.height),
                    );
                    uniforms.uShow.value = scrollProgress;
                    uniforms.uVp.value.set(window.innerWidth, window.innerHeight);
                    uniforms.uFit.value.set(fitW, fitH);
                    uniforms.uRadius.value = 14;

                    // Scale velocity by size aspect ratio
                    const currentWidth =
                        fromRect.width + (toRect.width - fromRect.width) * scrollProgress;
                    uniforms.uVelScale.value = Math.min(
                        3,
                        Math.max(1, toRect.width / Math.max(1, currentWidth)),
                    );

                    if (velocityTexture && activePointer) {
                        velocityTexture.needsUpdate = true;
                    }

                    renderer.render(scene, camera);
                }

                requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);

            // Cleanup is handled by the disposed flag from the outer useEffect
            // but we still need to clean up event listeners and WebGL resources
            // when the outer effect's disposed flag is set
            checkDisposed = setInterval(() => {
                if (isDisposed()) {
                    clearInterval(checkDisposed);
                    window.removeEventListener("resize", resizeRenderer);
                    window.removeEventListener("pointermove", keepPointerActive);
                    trigger?.kill();
                    if (renderer) renderer.dispose();
                    if (observer) observer.disconnect();
                }
            }, 500);
        } catch (e) {
            console.warn("WebGL setup failed, falling back to native video:", e);
            document.documentElement.classList.add("reel-native");
            if (renderer) {
                try { renderer.dispose(); } catch (err) {}
            }
            if (trigger) {
                try { trigger.kill(); } catch (err) {}
            }
            if (observer) {
                try { observer.disconnect(); } catch (err) {}
            }
            if (checkDisposed) {
                clearInterval(checkDisposed);
            }
        }
    }

    return (
        <>

            <video
                ref={videoRef}
                src={finalVideoSrc || null}
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                poster="/images/hero-poster.webp"
                className=""
                style={{
                    position: "fixed",
                    width: "320px",
                    height: "180px",
                    opacity: 0.001,
                    pointerEvents: "none",
                    left: 0,
                    top: 0,
                    zIndex: -1,
                }}
            />
            <div
                ref={containerRef}
                className="reel-morph opacity-0"
                aria-hidden="true"
            >
                <canvas ref={canvasRef} className="reel-morph__canvas" />
            </div>
        </>
    );
}
