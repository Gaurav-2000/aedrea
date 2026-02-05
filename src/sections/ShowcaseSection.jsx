import React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
    );
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];
    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        },
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="work" className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* left */}
          <div ref={project1Ref} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="" />
            </div>
            <div className="text-content">
              <h2>
                On_Demant Rides Made Simple with a Powerfull, User-friendlly App
                Called Ryde
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React Native, Expo, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="project-list-wrapper overflow-hidden">
            <div ref={project2Ref} className="project">
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="/images/project2.png" alt="" />
              </div>
              <h2>Library Management Platform</h2>
            </div>
            <div ref={project3Ref} className="project">
              <div className="image-wrapper bg-[#f1c3a6]">
                <img src="/images/project3.png" alt="" />
              </div>
              <h2>Start-Up Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
