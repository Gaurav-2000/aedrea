import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import RedirectButton from "@/components/RedirectButton";
import { heroProjects } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const refs = { project1Ref, project2Ref, project3Ref };

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
    );

    [project1Ref.current, project2Ref.current].filter(Boolean).forEach((card) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: "top bottom-=80",
          },
        },
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-black w-full overflow-hidden pt-20 sm:pt-28 md:pt-40"
    >
      {/* ── Title ── */}
      <div className="px-4 sm:px-8 md:px-16 pt-6 sm:pt-10">
        <TitleHeader
          title="Our Featuring Work"
          sub="💬 Strategy. Design. Development. 🚀"
        />
      </div>

      {/* ── Cards — single column, fully responsive ── */}
      <div className="px-4 sm:px-8 md:px-16 mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-6">
        {heroProjects.map((p) => (
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            key={p.id}
            ref={refs[p.id]}
            className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            {/* ── Background Image ── */}
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />

            {/* ── Fallback gradient if image missing ── */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 -z-10" />

            {/* ── Bottom info bar ── */}
            <div className="absolute bottom-0 left-0 right-0 bg-white flex items-center justify-between px-3 py-3 sm:px-5 sm:py-4 gap-3">
              <div className="min-w-0">
                <h3 className="text-black font-bold text-sm sm:text-base md:text-lg leading-tight truncate">
                  {p.title}
                </h3>
                {/* Hide desc on very small screens, show from sm up */}
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5 line-clamp-1 sm:line-clamp-2">
                  {p.desc}
                </p>
              </div>

              {/* Arrow button */}
              <div className="shrink-0 bg-black text-white w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  className="sm:w-[18px] sm:h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="flex justify-center py-10 sm:py-14 px-4">
        <RedirectButton
          className=" text-white !bg-transparent hover:!bg-transparent hover:text-orange-300 mt-10"
          to="/our-works"
        >
          View All Projects
        </RedirectButton>
      </div>
    </section>
  );
};

export default ShowcaseSection;
