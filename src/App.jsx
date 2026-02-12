import React from "react";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import NavBar from "./components/NavBar";
import LogoSection from "./sections/LogoSection";
import FeatureCards from "./sections/FeatureCards";
import ExperienceSection from "./sections/ExperienceSection";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ScrollText from "./sections/ScrollText";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import AnimatedText from "./sections/AnimatedText";

const App = () => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <NavBar />
      <Hero />
      <AnimatedText />
      <ShowcaseSection />
      <LogoSection />
      <FeatureCards />
      <ExperienceSection />
      <TechStack />
      {/* <Testimonials /> */}
      <ScrollText />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
