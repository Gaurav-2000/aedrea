import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

/* ─────────────────────── Noise generation ─────────────────────── */

function singleOctaveNoise(w, h, gridSize) {
  const gw = Math.ceil(w / gridSize) + 2;
  const gh = Math.ceil(h / gridSize) + 2;
  const grid = new Float32Array(gw * gh);
  for (let i = 0; i < grid.length; i++) grid[i] = Math.random();

  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx = x / gridSize;
      const gy = y / gridSize;
      const ix = Math.floor(gx);
      const iy = Math.floor(gy);
      const fx = gx - ix;
      const fy = gy - iy;
      // smoothstep interpolation
      const sx = fx * fx * (3 - 2 * fx);
      const sy = fy * fy * (3 - 2 * fy);
      const v00 = grid[iy * gw + ix];
      const v10 = grid[iy * gw + ix + 1];
      const v01 = grid[(iy + 1) * gw + ix];
      const v11 = grid[(iy + 1) * gw + ix + 1];
      out[y * w + x] =
        (v00 + (v10 - v00) * sx) * (1 - sy) +
        (v01 + (v11 - v01) * sx) * sy;
    }
  }
  return out;
}

/** Multi-octave value noise → organic blob shapes */
function generateNoise(w, h) {
  const octaves = [
    { size: 28, weight: 0.55 },
    { size: 14, weight: 0.30 },
    { size: 7, weight: 0.15 },
  ];
  const noise = new Float32Array(w * h);
  for (const { size, weight } of octaves) {
    const oct = singleOctaveNoise(w, h, size);
    for (let i = 0; i < noise.length; i++) noise[i] += oct[i] * weight;
  }
  return noise;
}

/* ─────────────────────── Constants ─────────────────────── */

// Total pixel budget for the noise texture (~79k pixels). The actual
// width/height are computed at mount time to match the viewport aspect
// ratio so blobs stay proportional on both desktop and mobile.
const NOISE_PIXELS = 79200;
const SOFT_EDGE = 0.035; // sharp-ish organic edges like jasonjerez.com

/* ─────────────────────── Component ─────────────────────── */

export default function Loader({
  isReady = false,
  onComplete = () => { },
  onFadeStart = () => { },
} = {}) {
  const canvasRef = useRef(null);
  const counterTextRef = useRef(null);
  const overlayRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const isReadyRef = useRef(isReady);
  const hasExitedRef = useRef(false);
  const noiseRef = useRef(null);
  const bufferRef = useRef(null);
  const imageDataRef = useRef(null);
  const noiseDimRef = useRef({ w: 360, h: 220 });
  const countTweenRef = useRef(null);
  const counterObjRef = useRef(null);

  // Keep mutable ref in sync
  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  // Generate noise texture on mount & fill canvas solid black
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const vh = Math.max(window.innerHeight, document.documentElement.clientHeight);
    canvas.width = vw * dpr;
    canvas.height = vh * dpr;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#E8E4DE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Compute noise dimensions matching the viewport aspect ratio
    const aspect = vw / vh;
    const noiseW = Math.round(Math.sqrt(NOISE_PIXELS * aspect));
    const noiseH = Math.round(NOISE_PIXELS / noiseW);
    noiseDimRef.current = { w: noiseW, h: noiseH };

    // Pre-compute noise
    noiseRef.current = generateNoise(noiseW, noiseH);

    // Pre-allocate offscreen buffer for dissolve rendering
    const buffer = document.createElement("canvas");
    buffer.width = noiseW;
    buffer.height = noiseH;
    bufferRef.current = buffer;

    const bufCtx = buffer.getContext("2d");
    const imgData = bufCtx.createImageData(noiseW, noiseH);
    imageDataRef.current = imgData;
  }, []);

  /* ── Exit transition: noise dissolve ── */
  const triggerExit = useCallback(() => {
    if (hasExitedRef.current) return;

    const canvas = canvasRef.current;
    const counterText = counterTextRef.current;
    const overlay = overlayRef.current;
    const noise = noiseRef.current;
    const buffer = bufferRef.current;
    const imgData = imageDataRef.current;
    if (!canvas || !counterText || !overlay || !noise || !buffer || !imgData) {
      console.warn("Loader exit triggered before canvas ready. Falling back to instant complete.");
      hasExitedRef.current = true;
      try { onFadeStart(); } catch (e) { console.error(e); }
      try { onComplete(); } catch (e) { console.error(e); }
      if (overlay) overlay.style.display = "none";
      return;
    }

    hasExitedRef.current = true;

    const ctx = canvas.getContext("2d");
    const bufCtx = buffer.getContext("2d");
    const pixels = imgData.data;

    const exitTl = gsap.timeline({ onComplete });

    // Phase 1: Hold 100% briefly, then fade counter text out + scale down
    exitTl.to(counterText, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      delay: 0.3,
      ease: "power3.inOut",
    });

    // Phase 2: Start revealing page content (fires onFadeStart callback)
    exitTl.call(() => {
      onFadeStart();
      gsap.set(overlay, { backgroundColor: "transparent" });
    }, null, "+=0.05");

    // Phase 3: Noise dissolve — organic ink-blot dissolution
    const prog = { value: 0 };
    exitTl.to(
      prog,
      {
        value: 1,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const p = prog.value;
          const lo = p - SOFT_EDGE;
          const invRange = 1 / (SOFT_EDGE * 2);
          const { w: nW, h: nH } = noiseDimRef.current;
          const len = nW * nH;

          for (let i = 0; i < len; i++) {
            const n = noise[i];
            // threshold with soft edge → alpha
            let a;
            if (n <= lo) a = 0;
            else if (n >= lo + SOFT_EDGE * 2) a = 255;
            else a = ((n - lo) * invRange * 255) | 0;

            // Off-white color: #E8E4DE → RGB(232, 228, 222)

            const idx = i << 2;
            pixels[idx] = 232;     // R
            pixels[idx + 1] = 228; // G
            pixels[idx + 2] = 222; // B
            pixels[idx + 3] = a;
          }

          bufCtx.putImageData(imgData, 0, 0);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
        },
      },
      "<"
    );

    // Clean up
    exitTl.set(overlay, { display: "none" });
  }, [onComplete, onFadeStart]);

  const triggerExitRef = useRef(triggerExit);
  useEffect(() => {
    triggerExitRef.current = triggerExit;
  }, [triggerExit]);

  /* ── Counter tween: 0 → 90/100 ── */
  useEffect(() => {
    const counterText = counterTextRef.current;
    if (!counterText) return;

    const counterObj = { val: 0 };
    const targetVal = isReadyRef.current ? 100 : 90;

    const countTween = gsap.to(counterObj, {
      val: targetVal,
      duration: isReadyRef.current ? 1.8 : 1.4,
      ease: "power2.out",
      onUpdate: () => setPercent(Math.floor(counterObj.val)),
      onComplete: () => {
        if (targetVal === 100 || isReadyRef.current) {
          triggerExitRef.current();
        }
      },
    });

    // Stash references for the isReady watcher
    countTweenRef.current = countTween;
    counterObjRef.current = counterObj;

    return () => countTween.kill();
  }, []);

  /* ── Fast-tween 90→100 when assets finish loading ── */
  useEffect(() => {
    if (isReady) {
      const countTween = countTweenRef.current;
      const counterObj = counterObjRef.current;

      if (countTween && counterObj && countTween.vars.val === 90) {
        countTween.kill();
        gsap.to(counterObj, {
          val: 100,
          duration: 0.45,
          ease: "power2.out",
          onUpdate: () => setPercent(Math.floor(counterObj.val)),
          onComplete: () => triggerExitRef.current(),
        });
      }
    }
  }, [isReady]);

  /* ── Render ── */
  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#E8E4DE",
      }}
    >
      {/* Canvas — the noise dissolve is painted here */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Counter text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div
          ref={counterTextRef}
          className="select-none font-sans font-medium text-[15vw] md:text-[10vw] leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-sans), 'Geist Variable', sans-serif",
            willChange: "transform, opacity",
            color: "#1a1a1a",
          }}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}