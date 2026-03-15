// import React from "react";
// import Hero from "./sections/Hero";
// import ShowcaseSection from "./sections/ShowcaseSection";
// import NavBar from "./components/NavBar";
// import LogoSection from "./sections/LogoSection";
// import FeatureCards from "./sections/FeatureCards";
// import ExperienceSection from "./sections/ExperienceSection";
// import TechStack from "./sections/TechStack";
// import Testimonials from "./sections/Testimonials";
// import Contact from "./sections/Contact";
// import Footer from "./sections/Footer";
// import ScrollText from "./sections/ScrollText";
// import gsap from "gsap";
// import { ReactLenis } from "lenis/react";
// import { useEffect, useRef } from "react";
// import AnimatedText from "./sections/AnimatedText";
// import Loader from "./sections/Loader";

// const App = () => {
//   const lenisRef = useRef();

//   useEffect(() => {
//     function update(time) {
//       lenisRef.current?.lenis?.raf(time * 1000);
//     }

//     gsap.ticker.add(update);

//     return () => gsap.ticker.remove(update);
//   }, []);
//   return (
//     <>
//       <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
//       <Loader />
//       <NavBar />
//       <Hero />
//       <AnimatedText />
//       <ShowcaseSection />
//       <LogoSection />
//       <FeatureCards />
//       <ExperienceSection />
//       <TechStack />
//       {/* <Testimonials /> */}
//       <ScrollText />
//       <Contact />
//       <Footer />
//     </>
//   );
// };

// export default App;

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";

import Loader from "./sections/Loader";
import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import AnimatedText from "./sections/AnimatedText";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoSection from "./sections/LogoSection";
import FeatureCards from "./sections/FeatureCards";
import ExperienceSection from "./sections/ExperienceSection";
import TechStack from "./sections/TechStack";
import ScrollText from "./sections/ScrollText";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import AboutUs from "./sections/AboutUs";
import AnimatedCounter from "./components/AnimatedCounter";
import TextDropAnimation from "./sections/TextDropAnimation";

import TalkButton from "./TalkButton";

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const lenisRef = useRef(null);

  // Prepare app
  useEffect(() => {
    async function prepareApp() {
      await Promise.all([
        document.fonts.ready,
        fakeHeavyWork(), // replace later
      ]);

      setAppReady(true);
    }

    prepareApp();
  }, []);

  // GSAP ↔ Lenis sync
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      {/* Lenis MUST always exist */}
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        {appReady && (
          <>
            <TalkButton />
            <NavBar />
            <Hero />
            {/* <AboutUs /> */}
            <TextDropAnimation />
            <AnimatedCounter />
            <AnimatedText />
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <TechStack />
            <ScrollText />
            <Contact />
            <Footer />
          </>
        )}
      </ReactLenis>
      <TalkButton />

      {/* Loader overlays app */}
      {!appReady && <Loader />}
    </>
  );
};

export default App;

// Demo only
function fakeHeavyWork() {
  return new Promise((resolve) => setTimeout(resolve, 1800));
}
