import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Loader() {
  const svgRef = useRef(null);
  const wormRef = useRef(null);

  useEffect(() => {
    // Worm animation (mobile + desktop)
    gsap.fromTo(
      wormRef.current,
      { strokeDashoffset: 10 },
      {
        strokeDashoffset: 1165,
        duration: 2.8,
        repeat: -1,
        ease: "power1.inOut",
      },
    );

    // Desktop-only enhancement
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": () => {
        gsap.to(svgRef.current, {
          xPercent: () => gsap.utils.random(-12, 12),
          yPercent: () => gsap.utils.random(-12, 12),
          duration: 0.25,
          repeat: -1,
          yoyo: true,
          ease: "linear",
        });
      },
    });
  }, []);

  return (
    <div className="min-h-screen grid place-items-center bg-neutral-950  transition-colors">
      <svg
        ref={svgRef}
        viewBox="0 0 128 128"
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(23, 100%, 60%)
"
            />
            <stop
              offset="100%"
              stopColor="hsl(23, 100%, 50%)
"
            />
          </linearGradient>
        </defs>

        {/* Ring */}
        <circle
          r="56"
          cx="64"
          cy="64"
          fill="none"
          stroke="hsla(0,10%,10%,0.1)"
          strokeWidth="16"
          strokeLinecap="round"
          className="dark:stroke-[hsla(0,10%,90%,0.1)] transition-colors"
        />

        {/* Worm */}
        <path
          ref={wormRef}
          d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
          fill="none"
          stroke="url(#pl-grad)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="44 1111"
        />
      </svg>
    </div>
  );
}
