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

import AnimatedCounter from "./components/AnimatedCounter";

import TalkButton from "./TalkButton";

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const lenisRef = useRef(null);

  // Prepare app - with timeout to prevent getting stuck
  useEffect(() => {
    async function prepareApp() {
      try {
        // Wait for fonts with a timeout (only in browser)
        if (typeof document !== 'undefined') {
          const fontPromise = document.fonts.ready;
          const timeoutPromise = new Promise((resolve) => 
            setTimeout(resolve, 3000) // 3 second timeout
          );
          
          // Race between fonts loading and timeout
          await Promise.race([fontPromise, timeoutPromise]);
        } else {
          // No document - just wait a bit
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
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

      {/* Loader overlays app */}
      {!appReady && <Loader />}
    </>
  );
};

export default App;

// Demo only
// function fakeHeavyWork() {
//   return new Promise((resolve) => setTimeout(resolve, 1800));
// }
