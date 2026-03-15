import React from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroExperiance from "../components/HeroModels/HeroExperiance";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.inOut",
      },
    );
  });

  return (
    <section className="relative overflow-hidden" id="hero">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>
      <div className="hero-layout">
        {/* left hero text */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              {/* <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper ">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="spanTextOrange flex items-center md:gap-2 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="image text"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1> */}
              <h1 className="font-semibold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-400">
                  AI-Powered
                </span>
                <br />
                Digital Experiences
                <span className="block font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  that
                  <span className="slide ">
                    <span className="wrapper ">
                      {words.map((word, index) => (
                        <span
                          key={index}
                          className=" text-orange-400  font-light  flex items-center md:gap-2 gap-1 "
                        >
                          <img
                            src={word.imgPath}
                            alt="image text"
                            className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                          />
                          <span>{word.text}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>

              {/* <h1>Into real projects </h1>
              <h1> That deliever Results </h1> */}
            </div>
            <p className="text-white/100 italic text-sm sm:text-base md:text-lg lg:text-xl relative z-10 opacity-40 hover:opacity-100 transition-opacity duration-300">
              Smart design. AI automation. High-performance websites.
            </p>
            <Button
              className="md:w-80  md:h-16 w-60 h-12"
              id="work"
              text="Click Me.. "
            />
          </div>
        </header>

        {/* right 3d model */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperiance />
          </div>
        </figure>
      </div>
      {/* <AnimatedCounter /> */}
    </section>
  );
};

export default Hero;
