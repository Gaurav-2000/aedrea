import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { expCards } from "../constants";
import GlowCard from "../components/GlowCard";
import RedirectButton from "@/components/RedirectButton";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = [
  "#ffffffff", // orange
];

const ExperienceSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Timeline cards slide in from left
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // Timeline vertical line shrinks as you scroll
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", { scaleY: 1 - self.progress });
        },
      },
    });

    // expText fade in
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Our Digital Services" sub="💼 Our Expertise" />

        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => {
              const accent = ACCENTS[index % ACCENTS.length];

              return (
                <div key={card.title} className="exp-card-wrapper">
                  {/* ── Left column: GlowCard + image panel ── */}
                  <div className="xl:w-2/6 flex flex-col gap-4">
                    <GlowCard card={card} index={index}>
                      <ul className="list-disc ms-5 mt-5 flex flex-col gap-3 text-white-50">
                        {card.review.map((point, i) => (
                          <li key={i} className="text-lg">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </GlowCard>

                    {/* Visual preview image */}
                    {/* <ServiceImagePanel card={card} index={index} /> */}
                  </div>

                  {/* ── Right column: timeline + content ── */}
                  <div className="xl:w-4/6">
                    <div className="flex items-start">
                      <div className="timeline-wrapper">
                        <div className="timeline" />
                        <div className="gradient-line w-1 h-full" />
                      </div>

                      <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20 w-full">
                        <div className="timeline-logo md:ml-2.5">
                          <img src={card.logoPath} alt="logo" />
                        </div>

                        <div className="flex-1">
                          {/* Index counter pill */}
                          <span
                            className="inline-block mb-4"
                            style={{
                              fontFamily: "'Syne', sans-serif",
                              fontSize: "9px",
                              fontWeight: 700,
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: accent,
                              border: `1px solid ${accent}30`,
                              padding: "3px 12px",
                              borderRadius: "100px",
                            }}
                          >
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {String(expCards.length).padStart(2, "0")}
                          </span>

                          <h3 className="text-3xl md:text-4xl text-white">
                            {card.title}
                          </h3>

                          <p className="my-5 text-white-50">
                            🗓️&nbsp;{card.date}
                          </p>

                          <p className="text-[#839CB5] italic">What We Offer</p>

                          <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                            {card.responsibilities.map((responsibility, i) => (
                              <li key={i} className="text-lg">
                                {responsibility}
                              </li>
                            ))}
                          </ul>

                          {/* Per-service inline "Learn more" link */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center py-14">
          <RedirectButton className=" text-white !bg-transparent hover:!bg-transparent hover:text-orange-300 mt-10" to="/services">Explore Services</RedirectButton>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.07); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
