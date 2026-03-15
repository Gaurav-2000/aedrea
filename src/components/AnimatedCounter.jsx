import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CountUp from "react-countup";
import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [startCount, setStartCount] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        cardsRef.current,
        {
          y: 0,
          opacity: 0,
        },
        {
          keyframes: {
            y: [0, 50, -40, 0],
            easeEach: "power2.inOut",
          },
          opacity: 1,

          duration: 5,
          stagger: 0.4,

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 40%",

            // once: true,

            scrub: true,
            onEnter: () => setStartCount(true),
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      id="counter"
      className=" mb-15  padding-x-lg xl:mt-0"
    >
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="flex flex-col justify-center rounded-lg bg-zinc-900 p-10"
          >
            <div className="counter-number mb-2 text-3xl font-bold text-white-50">
              {startCount ? (
                <CountUp end={item.value} suffix={item.suffix} />
              ) : (
                `0${item.suffix}`
              )}
            </div>

            <div className="text-lg text-white-50">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
