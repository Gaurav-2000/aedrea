// src/sections/ShowcaseWall.jsx
// Place just before <Footer /> in OurWork.jsx:
//   import ShowcaseWall from "@/sections/ShowcaseWall";
//   <ShowcaseWall />
//
// Images are real Unsplash photos — swap with your own project shots later.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── GALLERY ITEMS ────────────────────────────────────────────────────────────
// All images from Unsplash (free, no attribution required for placeholders).
// Replace `image` with your own project screenshots when ready.
// span: "full" → takes both columns | span: "half" → single column
// height: "tall" | "normal" | "short"
const items = [
  {
    id: 1,
    image: "/images/aedreastudio1.webp",
    span: "full",
    height: "tall",
  },
  {
    id: 2,
    image: "/images/aedreastudio2.webp",
    span: "half",
    height: "normal",
  },
  {
    id: 3,
    image: "/images/aedreastudio4.webp",
    span: "half",
    height: "normal",
  },
  {
    id: 4,
    image: "/images/aedreastudio7.webp",
    span: "half",
    height: "tall",
  },
  {
    id: 5,
    image: "/images/aedreastudio5.webp",
    span: "half",
    height: "tall",
  },
  {
    id: 6,
    image: "/images/aedreastudio11.webp",
    span: "full",
    height: "normal",
  },
  {
    id: 7,
    image: "/images/aedreastudio7.webp",
    span: "half",
    height: "normal",
  },
  {
    id: 8,
    image: "/images/aedreastudio16.webp",
    span: "half",
    height: "normal",
  },
  {
    id: 9,
    image: "/images/aedreastudio17.webp",
    span: "full",
    height: "tall",
  },
  {
    id: 10,
    image: "/images/aedreastudio18.webp",
    span: "half",
    height: "normal",
  },
  {
    id: 11,
    image: "/images/aedreastudio19.webp",
    span: "half",
    height: "normal",
  },
  {
    id: 13,
    image: "/images/aedreastudio20.webp",
    span: "full",
    height: "tall",
  },
  {
    id: 14,
    image: "/images/aedreastudio21.webp",
    span: "half",
    height: "tall",
  },
  {
    id: 15,
    image: "/images/aedreastudio22.webp",
    span: "half",
    height: "tall",
  },
  {
    id: 16,
    image: "/images/aedreastudio23.webp",
    span: "half",
    height: "tall",
  },
  {
    id: 17,
    image: "/images/aedreastudio24.webp",
    span: "half",
    height: "tall",
  },
  {
    id: 18,
    image: "/images/aedreastudio25.webp",
    span: "full",
    height: "tall",
  },
];

// ─── SINGLE CARD ──────────────────────────────────────────────────────────────
const GalleryCard = ({ item, refCb }) => {
  const imgRef = useRef(null);
  const overlayRef = useRef(null);

  const heightClass =
    {
      tall: "h-[460px] md:h-[580px]",
      normal: "h-[320px] md:h-[420px]",
      short: "h-[240px] md:h-[300px]",
    }[item.height] ?? "h-[360px]";

  const colClass =
    item.span === "full" ? "col-span-1 md:col-span-2" : "col-span-1";

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.7, ease: "power2.out" });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.75, ease: "power2.inOut" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power1.out",
    });
  };

  return (
    <div
      ref={refCb}
      className={`${colClass} relative overflow-hidden cursor-pointer rounded-none`}
      style={{ opacity: 0 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`relative ${heightClass} overflow-hidden rounded-none`}>
        {/* Image */}
        <div
          ref={imgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          <img
            src={item.image}
            alt={`Gallery image ${item.id}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Subtle dark hover veil */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/25 pointer-events-none"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function ShowcaseWall() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {items.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            refCb={(el) => (cardsRef.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
}
