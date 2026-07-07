import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  ScrollExpandMedia — GSAP + ScrollTrigger rewrite
  ─────────────────────────────────────────────────
  WHY GSAP OVER JS SCROLL MATH:
  • ScrollTrigger handles pinning natively — no sticky/overflow conflicts
  • gsap.to() with scrub drives all values from a single timeline
  • GSAP uses rAF + compositor-layer hints internally — no manual throttle needed
  • Children reveal uses a separate ScrollTrigger.create()

  PINNING STRATEGY:
  • ScrollTrigger `pin: sectionRef` pins the 100vh visual for 250vh of scroll
  • `pinSpacing: false` — the wrapperRef IS the spacer, no double-spacing
  • `scrub: 1` ties all animation values to scroll position with 1s lag
*/

const buildYouTubeEmbed = (src) => {
  if (!src) return "";
  const base = src.includes("embed") ? src : src.replace("watch?v=", "embed/");
  const videoId = src.includes("v=") ? src.split("v=")[1]?.split("&")[0] : "";
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1${
    videoId ? `&playlist=${videoId}` : ""
  }`;
};

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const wrapperRef = useRef(null); // 250vh tall scroll spacer + trigger
  const sectionRef = useRef(null); // 100vh pinned visual container
  const cardRef = useRef(null); // expanding media card
  const bgRef = useRef(null); // background image wrapper
  const overlayRef = useRef(null); // dark overlay on media
  const firstWordRef = useRef(null); // title — flies left
  const restWordRef = useRef(null); // title — flies right
  const metaRef = useRef(null); // date + scroll cue
  const childrenRef = useRef(null); // content below section

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Card start / end dimensions
      const startW = isMobile ? 280 : 340;
      const startH = isMobile ? 200 : 260;
      const endW = vw * (isMobile ? 0.96 : 0.98);
      const endH = vh * (isMobile ? 0.78 : 0.9);

      // Stamp initial state instantly — avoids a single-frame flash
      gsap.set(cardRef.current, {
        width: startW,
        height: startH,
        borderRadius: 20,
        x: "-50%",
        y: "-50%",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      });

      // ── SKIP ANIMATIONS ON MOBILE ──────────────────────────────────────
      if (isMobile) {
        // Set wrapper height to minimum on mobile (no tall scroll spacer)
        if (wrapperRef.current) {
          wrapperRef.current.style.height = "100vh";
        }
        // Keep the card at initial size on mobile - no animation
        return;
      }

      // ── Main scrub timeline (DESKTOP ONLY) ──────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current, // tall spacer is the scroll trigger
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // 1s lag = physical, not instant
          pin: sectionRef.current, // pin the 100vh visual shell
          pinSpacing: false, // wrapperRef already provides the height
          anticipatePin: 1,
          invalidateOnRefresh: true, // recalculate on window resize
        },
      });

      // Card grows to near-fullscreen
      tl.to(
        cardRef.current,
        {
          width: endW,
          height: endH,
          borderRadius: 4,
          boxShadow: "0 0px 5px rgba(0,0,0,0.1)",
          ease: "none",
        },
        0,
      );

      // Background fades out as card fills the screen
      if (bgRef.current) {
        tl.to(
          bgRef.current,
          {
            opacity: 0,
            ease: "none",
            duration: 0.4,
          },
          0,
        );
      }

      // Media overlay fades to transparent
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            ease: "none",
            duration: 0.5,
          },
          0,
        );
      }

      // Title — first word flies left, rest flies right
      if (firstWordRef.current) {
        tl.to(
          firstWordRef.current,
          {
            x: isMobile ? "-100vw" : "-150vw",
            opacity: 0,
            ease: "none",
            duration: 0.4,
          },
          0,
        );
      }
      if (restWordRef.current) {
        tl.to(
          restWordRef.current,
          {
            x: isMobile ? "100vw" : "150vw",
            opacity: 0,
            ease: "none",
            duration: 0.4,
          },
          0,
        );
      }

      // Date + scroll cue fade out
      if (metaRef.current) {
        tl.to(
          metaRef.current,
          {
            opacity: 0,
            ease: "none",
            duration: 0.35,
          },
          0,
        );
      }

      // ── Children entry animation (separate trigger - DESKTOP ONLY) ──────────────
      if (childrenRef.current && !isMobile) {
        // Target explicit .sem-reveal elements, or fall back to common tags
        const childItems = childrenRef.current.querySelectorAll(
          ".sem-reveal, h1, h2, h3, h4, p, span, li, a, button, [data-reveal]",
        );
        const targets =
          childItems.length > 0 ? childItems : [childrenRef.current];

        gsap.set(targets, { y: 28, opacity: 0 });

        ScrollTrigger.create({
          trigger: childrenRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(targets, {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.08,
            });
          },
        });
      }
    }, wrapperRef);

    // Full GSAP context cleanup on unmount / route navigation
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/*
        LAYOUT:
        wrapperRef  — 250vh tall, provides scroll distance for the pin
        sectionRef  — 100vh, gets pinned by ScrollTrigger for the whole scroll
        cardRef     — absolute-centered, animated from small → fullscreen
      */}

      {/* Tall scroll spacer — this is what ScrollTrigger scrubs against */}
      <div ref={wrapperRef} className="relative" style={{ height: "250vh" }}>
        {/* Visual shell — ScrollTrigger pins this for 250vh of scroll */}
        <div
          ref={sectionRef}
          className="w-full h-screen overflow-hidden flex items-center justify-center"
        >
          {/* Background image — fades out as card expands */}
          {bgImageSrc && (
            <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={bgImageSrc}
                alt=""
                className="w-full h-full object-cover block scale-110 blur-md"
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-black/25" />
            </div>
          )}

          {/* Expanding media card — GSAP drives width/height/borderRadius */}
          <div
            ref={cardRef}
            className="absolute top-1/2 left-1/2 z-10 overflow-hidden"
            style={{
              maxWidth: "98vw",
              maxHeight: "92vh",
              willChange: "width, height, border-radius",
            }}
          >
            {/* Self-hosted video */}
            {mediaType === "video" && !mediaSrc?.includes("youtube.com") && (
              <div className="relative w-full h-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  playsinline
                  webkit-playsinline="true"
                  preload="metadata"
                  className="w-full h-full object-cover block"
                />
                <div
                  ref={overlayRef}
                  className="absolute inset-0 bg-black/35"
                  style={{ opacity: 0.6 }}
                />
              </div>
            )}

            {/* YouTube embed */}
            {mediaType === "video" && mediaSrc?.includes("youtube.com") && (
              <div className="relative w-full h-full pointer-events-none">
                <iframe
                  src={buildYouTubeEmbed(mediaSrc)}
                  className="w-full h-full border-0 block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title || "video"}
                />
                <div
                  ref={overlayRef}
                  className="absolute inset-0 bg-black/35 pointer-events-none"
                  style={{ opacity: 0.6 }}
                />
              </div>
            )}

            {/* Image */}
            {mediaType === "image" && (
              <div className="relative w-full h-full">
                <img
                  src={mediaSrc}
                  alt={title || ""}
                  className="w-full h-full object-cover block"
                />
                <div
                  ref={overlayRef}
                  className="absolute inset-0 bg-black/45"
                  style={{ opacity: 0.8 }}
                />
              </div>
            )}
          </div>

          {/* Title — two words fly apart on scroll */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 pointer-events-none"
            style={{ mixBlendMode: textBlend ? "difference" : "normal" }}
          >
            {firstWord && (
              <h2
                ref={firstWordRef}
                className="m-0 text-center text-white font-bold"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                  willChange: "transform, opacity",
                }}
              >
                {firstWord}
              </h2>
            )}
            {restOfTitle && (
              <h2
                ref={restWordRef}
                className="m-0 text-center text-white font-bold"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                  willChange: "transform, opacity",
                }}
              >
                {restOfTitle}
              </h2>
            )}
          </div>

          {/* Date + scroll cue */}
          {(date || scrollToExpand) && (
            <div
              ref={metaRef}
              className="absolute bottom-[7%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none whitespace-nowrap"
            >
              {date && (
                <p
                  className="text-white m-0 tracking-wide"
                  style={{ fontSize: "1.1rem" }}
                >
                  {date}
                </p>
              )}
              {scrollToExpand && (
                <p className="text-sm font-medium text-white m-0">
                  {scrollToExpand}
                </p>
              )}
            </div>
          )}
        </div>
        {/* end pinned section */}
      </div>
      {/* end tall wrapper */}

      {/* Children — staggered fade-up on scroll into view */}
      {children && (
        <div ref={childrenRef} className="w-full">
          {children}
        </div>
      )}
    </>
  );
};

export default ScrollExpandMedia;
