// import React, {
//   lazy,
//   Suspense,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ReactLenis } from "lenis/react";
// import { Routes, Route, useLocation } from "react-router-dom";

// import Loader from "./sections/Loader";
// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage"; // ← only Home stays eager
// import MusicPlayer from "./components/MusicPlayer";
// import Cursor from "./components/Cursor";
// import CookieConsent from "./components/CookieConsent";

// // All other pages lazy
// const ServicesPage = lazy(() => import("./pages/ServicesPage"));
// const OurWork = lazy(() => import("./pages/OurWork"));
// const AboutPage = lazy(() => import("./pages/AboutPage"));
// const ContactPage = lazy(() => import("./pages/ContactPage"));
// const WebDesignService = lazy(() => import("./pages/WebDesignService"));
// const AutomationService = lazy(() => import("./pages/AutomationService"));
// const SEOService = lazy(() => import("./pages/SEOServices"));
// const SEOChecker = lazy(() => import("./pages/SEOChecker"));

// gsap.registerPlugin(ScrollTrigger);

// // How long we're willing to wait for fonts + critical images before
// // forcing the loader to exit anyway. Tune this — 3.5s is a reasonable
// // ceiling for mobile; lower it once font preloading is in place.
// const APP_READY_TIMEOUT = 3500;

// const App = () => {
//   const [appReady, setAppReady] = useState(false);
//   const [loaderComplete, setLoaderComplete] = useState(false);
//   const [startHeroAnimation, setStartHeroAnimation] = useState(false);
//   const [cookieConsentVisible, setCookieConsentVisible] = useState(false);
//   const lenisRef = useRef(null);
//   const location = useLocation();

//   useEffect(() => {
//     async function prepareApp() {
//       try {
//         // Fonts — NOT awaited on its own anymore. document.fonts.ready
//         // has no built-in timeout and can hang 15-20s+ on a cold cache
//         // / slow connection, which was the actual cause of the long
//         // first-load stall. It's now just one promise in the race below.
//         const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

//         // Preload critical hero images — these must be visible when loader exits
//         const criticalImages = [
//           "/images/hero-book.webp",
//           "/images/hero-watch.webp",
//           "/images/hero-card.webp",
//         ];

//         const imagePromises = criticalImages.map(
//           (src) =>
//             new Promise((resolve) => {
//               const img = new Image();
//               img.onload = resolve;
//               img.onerror = resolve; // don't block on failure
//               img.src = src;
//             }),
//         );

//         // Race: wait for fonts + images together, OR a single shared
//         // timeout. Whichever finishes first wins — so a slow font load
//         // can no longer block the loader past APP_READY_TIMEOUT.
//         await Promise.race([
//           Promise.all([fontsPromise, ...imagePromises]),
//           new Promise((resolve) => setTimeout(resolve, APP_READY_TIMEOUT)),
//         ]);
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppReady(true);
//       }
//     }
//     prepareApp();
//   }, []);

//   useEffect(() => {
//     const lenis = lenisRef.current?.lenis;
//     if (!lenis) return;

//     if (!loaderComplete || cookieConsentVisible) {
//       lenis.stop();
//     } else {
//       lenis.start();
//     }
//   }, [loaderComplete, cookieConsentVisible]);

//   useEffect(() => {
//     const lenis = lenisRef.current?.lenis;
//     if (!lenis) return;

//     lenis.on("scroll", ScrollTrigger.update);

//     return () => {
//       lenis.off("scroll", ScrollTrigger.update);
//     };
//   }, [loaderComplete]);

//   useLayoutEffect(() => {
//     lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   useEffect(() => {
//     const t = setTimeout(() => ScrollTrigger.refresh(), 100);
//     return () => clearTimeout(t);
//   }, [location.pathname]);

//   // Track page views on route changes for GA4 if consent is accepted
//   useEffect(() => {
//     const consent = localStorage.getItem("aedrea_cookie_consent");
//     if (consent === "accepted" && typeof window.gtag === "function") {
//       window.gtag("config", "G-YKLHJKWMQZ", {
//         page_path: location.pathname,
//       });
//     }
//   }, [location.pathname]);


//   return (
//     <>
//       <ReactLenis
//         root
//         options={{
//           duration: 1.2,
//           easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//           smoothWheel: true,
//         }}
//         ref={lenisRef}
//       >
//         <div
//           className={
//             loaderComplete && !cookieConsentVisible
//               ? ""
//               : "pointer-events-none select-none"
//           }
//         >
//           <Cursor />
//           <NavBar />
//           <MusicPlayer src="/images/bg-ambient.mp3" />
//           <Suspense fallback={null}>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <HomePage
//                     key={location.key}
//                     startHero={startHeroAnimation}
//                     loaderComplete={loaderComplete}
//                   />
//                 }
//               />
//               <Route path="/about" element={<AboutPage />} />
//               <Route path="/services" element={<ServicesPage />} />
//               <Route path="/our-works" element={<OurWork />} />
//               <Route path="/contact" element={<ContactPage />} />
//               <Route path="/seo-checker" element={<SEOChecker />} />
//               <Route
//                 path="/services/web-design"
//                 element={<WebDesignService />}
//               />
//               <Route path="/services/seo-services" element={<SEOService />} />
//               <Route
//                 path="/services/ai-automation"
//                 element={<AutomationService />}
//               />
//               <Route path="*" element={
//                 <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
//                   <h1 className="text-6xl font-bold mb-4">404</h1>
//                   <p className="text-xl text-white/60 mb-8">Page not found</p>
//                   <a href="/" className="text-orange-400 hover:text-orange-300 underline text-lg">← Back to Home</a>
//                 </div>
//               } />
//             </Routes>
//           </Suspense>
//         </div>
//       </ReactLenis>

//       {!loaderComplete && (
//         <Loader
//           isReady={appReady}
//           onFadeStart={() => setStartHeroAnimation(true)}
//           onComplete={() => setLoaderComplete(true)}
//         />
//       )}

//       <CookieConsent
//         loaderComplete={loaderComplete}
//         onVisibilityChange={setCookieConsentVisible}
//       />
//     </>
//   );
// };

// export default App;

import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { Routes, Route, useLocation } from "react-router-dom";

import Loader from "./sections/Loader";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage"; // ← only Home stays eager
import MusicPlayer from "./components/MusicPlayer";
import Cursor from "./components/Cursor";
import CookieConsent from "./components/CookieConsent";

// All other pages lazy
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const OurWork = lazy(() => import("./pages/OurWork"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WebDesignService = lazy(() => import("./pages/WebDesignService"));
const AutomationService = lazy(() => import("./pages/AutomationService"));
const SEOService = lazy(() => import("./pages/SEOServices"));
const SEOChecker = lazy(() => import("./pages/SEOChecker"));

gsap.registerPlugin(ScrollTrigger);

// How long we're willing to wait for fonts + critical images before
// forcing the loader to exit anyway. Tune this — 3.5s is a reasonable
// ceiling for mobile; lower it once font preloading is in place.
const APP_READY_TIMEOUT = 3500;

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [cookieConsentVisible, setCookieConsentVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let active = true;

    // Fetch video in background immediately as a Blob to ensure instant 0s play latency
    const fallbackTimeout = setTimeout(() => {
      if (active) setVideoSrc("/videos/hero-video.mp4");
    }, 4000);

    fetch("/videos/hero-video.mp4")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.blob();
      })
      .then((blob) => {
        if (active) {
          clearTimeout(fallbackTimeout);
          const url = URL.createObjectURL(blob);
          setVideoSrc(url);
        }
      })
      .catch((err) => {
        console.warn("Video blob fetch failed, falling back to network path:", err);
        if (active) {
          clearTimeout(fallbackTimeout);
          setVideoSrc("/videos/hero-video.mp4");
        }
      });

    async function prepareApp() {
      try {
        // Fonts — NOT awaited on its own anymore. document.fonts.ready
        // has no built-in timeout and can hang 15-20s+ on a cold cache
        // / slow connection, which was the actual cause of the long
        // first-load stall. It's now just one promise in the race below.
        const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

        // Preload critical hero images — these must be visible when loader exits
        const criticalImages = [
          "/images/hero-book.webp",
          "/images/hero-watch.webp",
          "/images/hero-card.webp",
        ];

        const imagePromises = criticalImages.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // don't block on failure
              img.src = src;
            }),
        );

        // Race: wait for fonts + images together, OR a single shared
        // timeout. Whichever finishes first wins — so a slow font load
        // can no longer block the loader past APP_READY_TIMEOUT.
        await Promise.race([
          Promise.all([fontsPromise, ...imagePromises]),
          new Promise((resolve) => setTimeout(resolve, APP_READY_TIMEOUT)),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepareApp();

    return () => {
      active = false;
      clearTimeout(fallbackTimeout);
    };
  }, []);

  const handleFadeStart = useCallback(() => {
    setStartHeroAnimation(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaderComplete(true);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    if (!loaderComplete || cookieConsentVisible) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [loaderComplete, cookieConsentVisible]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [loaderComplete]);

  useLayoutEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Track page views on route changes for GA4 if consent is accepted
  useEffect(() => {
    const consent = localStorage.getItem("aedrea_cookie_consent");
    if (consent === "accepted" && typeof window.gtag === "function") {
      window.gtag("config", "G-YKLHJKWMQZ", {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);


  return (
    <>
      <ReactLenis
        root
        options={{
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        }}
        ref={lenisRef}
      >
        <div
          className={
            loaderComplete && !cookieConsentVisible
              ? ""
              : "pointer-events-none select-none"
          }
        >
          <Cursor />
          <NavBar />
          <MusicPlayer src="/images/bg-ambient.mp3" />
          <Suspense fallback={null}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    key={location.key}
                    startHero={startHeroAnimation}
                    loaderComplete={loaderComplete}
                    videoSrc={videoSrc}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/our-works" element={<OurWork />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/seo-checker" element={<SEOChecker />} />
              <Route
                path="/services/web-design"
                element={<WebDesignService />}
              />
              <Route path="/services/seo-services" element={<SEOService />} />
              <Route
                path="/services/ai-automation"
                element={<AutomationService />}
              />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
                  <h1 className="text-6xl font-bold mb-4">404</h1>
                  <p className="text-xl text-white/60 mb-8">Page not found</p>
                  <a href="/" className="text-orange-400 hover:text-orange-300 underline text-lg">← Back to Home</a>
                </div>
              } />
            </Routes>
          </Suspense>
        </div>
      </ReactLenis>

      {!loaderComplete && (
        <Loader
          isReady={appReady}
          onFadeStart={handleFadeStart}
          onComplete={handleLoaderComplete}
        />
      )}

      <CookieConsent
        loaderComplete={loaderComplete}
        onVisibilityChange={setCookieConsentVisible}
      />
    </>
  );
};

export default App;