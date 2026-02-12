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
              <h1>
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
              </h1>

              <h1>Into real projects </h1>
              <h1> That deliever Results </h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Aedrea is an independent design studio focused on building modern,
              <br />
              performance-driven websites.
            </p>
            <Button
              className="md:w-80  md:h-16 w-60 h-12"
              id="work"
              text="Click to Scroll"
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
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
