import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./textDropAnimation.css";

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  "Design meets",
  "AI brains",
  "Automation",
  "Smart systems",
  "Real impact",
];
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1756074277712-1df732f679f8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://bato-web-agency.github.io/bato-shared/img/text-drop/img1.png",
    alt: "Image 1",
    width: 608,
    height: 576,
    speed: 0.0001,
    opacity: 1,
    style: { top: "12%", left: "4%", maxWidth: "26.5vw" },
  },
  {
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 2",
    width: 608,
    height: 804,
    speed: 0.0001,
    opacity: 0.75,
    style: { top: "29%", right: "40%", maxWidth: "26.5vw" },
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1680700308566-543a60569017?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 3",
    width: 658,
    height: 576,
    speed: 0.0001,
    opacity: 1,
    style: { top: "68%", right: "9.5%", maxWidth: "29vw" },
  },
  {
    src: "https://images.unsplash.com/photo-1558485339-5308eba5d621?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 4",
    width: 608,
    height: 576,
    speed: 0.0001,
    opacity: 0.75,
    style: { top: "72%", left: "12%", maxWidth: "26.5vw", zIndex: 100 },
  },
];

export default function TextDropAnimation() {
  const linesRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────────────
    const lenis = new Lenis({
      smooth: true,
      multiplier: 1,
      easing: (t) => t * (2 - t),
      smoothTouch: true,
      lerp: 0.05,
      duration: 1.2,
    });

    // Tie Lenis into GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.normalizeScroll(true);

    // ── Animations ───────────────────────────────────────────────
    linesRef.current.forEach((line, index) => {
      if (!line) return;

      // Text-drop 3-D rotate effect
      gsap.fromTo(
        line,
        { rotateX: -120 },
        {
          rotateX: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Image reveal tied to each line
      const img = imagesRef.current[index];
      if (img) {
        const targetOpacity = IMAGES[index].opacity;
        const startOffset = window.innerWidth < 1024 ? "-=200" : "-=500";

        gsap.to(img, {
          opacity: targetOpacity,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: `bottom bottom${startOffset}`,
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Parallax on image boxes
    imagesRef.current.forEach((el, i) => {
      if (!el) return;
      const speed = IMAGES[i].speed;
      gsap.to(el, {
        y: () => -(1 - speed) * 150,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/*
        Tailwind handles layout/spacing/color utilities.
        Pseudo-elements (::after / ::before) and custom keyframes
        are impossible in pure Tailwind so they live here in a
        minimal <style> block.
      */}

      {/* ════════════════ START SCREEN ════════════════ */}
      <section className="start-section relative flex items-center justify-center px-4 h-[70vh]">
        <div className="relative flex flex-col items-center justify-center max-w-143.75 w-full text-center">
          {/* Heading */}
          <h2
            className="mt-5 text-white font-medium leading-[1.1] text-[clamp(2.5rem,8vw,6rem)]"
            style={{ fontFamily: '"Lora", sans-serif' }}
          >
            Meet Aedrea:
          </h2>

          {/* Sub-text */}
          <p
            className="mt-7.5 font-medium leading-[1.4] text-[clamp(1rem,2vw,1.25rem)]"
            style={{ fontFamily: '"Poppins", sans-serif', color: "#999999" }}
          >
            Where Design Meets AI for Real-World Impact
          </p>

          {/* Scroll arrow */}
          <div
            className="absolute w-5 animate-scroll-bounce"
            style={{ top: "calc(100% + 80px)", left: "calc(50% - 10px)" }}
          >
            <img
              src="https://bato-web-agency.github.io/bato-shared/img/text-gsap/arrow.svg"
              alt="Scroll Down"
              width={20}
              height={20}
              className="block w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ════════════════ TEXT DROP ════════════════ */}
      <section
        className="drop-section relative overflow-hidden pt-23 pb-50 md:pb-60"
        style={{ perspective: "2000px" }}
      >
        {/* Floating images */}
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            className="absolute overflow-hidden rounded-lg transition-opacity duration-500"
            style={{ opacity: 0.1, ...img.style }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={img.width}
              height={img.height}
              className="block w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Animated text lines */}
        {LINES.map((line, i) => (
          <span
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            className="text-drop-line"
          >
            {line}
          </span>
        ))}
      </section>
    </>
  );
}
