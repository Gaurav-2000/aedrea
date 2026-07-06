import gsap from "gsap";
import { useEffect, useRef } from "react";
import { marqueeItems } from "@/constants";

const LogoSection = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;
    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        x: -totalWidth,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div className="py-20">
      <div
        className="relative overflow-hidden"
        style={{ transform: "rotate(2deg)", margin: "0 -5%", width: "110%" }}
      >
        <div className="border-y border-white/10 py-4 bg-white/[0.02]">
          <div
            ref={marqueeRef}
            className="flex gap-12 whitespace-nowrap will-change-transform"
          >
            {[...marqueeItems, ...marqueeItems].map((tag, i) => (
              <span
                key={i}
                className="text-white/30 text-sm font-medium tracking-[0.25em] uppercase"
              >
                {tag}
                <span className="ml-12 text-orange-500">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
