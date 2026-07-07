import { lazy, Suspense, useEffect, useRef } from "react";
import SEO from "@/components/SEO";
import Hero from "../sections/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Eager — first section after hero, needs to be ready instantly
import AnimatedText from "../sections/AnimatedText";

// Lazy Loaded Sections
const ShowcaseSection = lazy(() => import("../sections/ShowcaseSection"));
const LogoSection = lazy(() => import("../sections/LogoSection"));
const FeatureCards = lazy(() => import("../sections/FeatureCards"));
const ExperienceSection = lazy(() => import("../sections/ExperienceSection"));
const ScrollText = lazy(() => import("../sections/ScrollText"));
const Contact = lazy(() => import("../sections/Contact"));
const Footer = lazy(() => import("../sections/Footer"));
const Memories = lazy(() => import("../sections/Memories"));
const WavePath = lazy(() => import("../components/Elastic"));
const ReelCanvas = lazy(() => import("@/components/ReelCanvas"));

const HomePage = ({ startHero, loaderComplete, videoSrc }) => {
  const finalVideoSrc = videoSrc;
  const videoRef = useRef(null);
  const playStartedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force inline play attributes programmatically
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    let observer = null;
    let started = false;
    let interactionRegistered = false;
    let syncIntervalId = null;

    const tryPlay = () => {
      if (started) return;

      video.play()
        .then(() => {
          started = true;
          cleanupInteraction();
        })
        .catch(() => {
          if (!interactionRegistered) {
            interactionRegistered = true;
            window.addEventListener("touchstart", handleInteraction, { passive: true });
            window.addEventListener("click", handleInteraction, { passive: true });
          }
        });
    };

    const handleInteraction = () => {
      tryPlay();
    };

    const cleanupInteraction = () => {
      if (interactionRegistered) {
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("click", handleInteraction);
        interactionRegistered = false;
      }
    };

    const syncPlaybackTime = () => {
      const heroVideo = window.__heroVideo;
      if (heroVideo && video) {
        // Sync play state
        if (heroVideo.paused && !video.paused) {
          video.pause();
        } else if (!heroVideo.paused && video.paused) {
          video.play().catch(() => {});
        }

        // Sync currentTime if ready and drifted by more than 0.3s
        if (video.readyState >= 2 && heroVideo.readyState >= 2) {
          const diff = Math.abs(video.currentTime - heroVideo.currentTime);
          if (diff > 0.3) {
            video.currentTime = heroVideo.currentTime;
          }
        }
      }
    };

    const startSync = () => {
      // Sync immediately on view entry
      syncPlaybackTime();

      // Periodically check every 2.5 seconds (low frequency to prevent seek jitter)
      clearInterval(syncIntervalId);
      syncIntervalId = setInterval(syncPlaybackTime, 2500);
    };

    const stopSync = () => {
      clearInterval(syncIntervalId);
      if (started) {
        video.pause();
        started = false;
      }
      cleanupInteraction();
    };

    if (window.IntersectionObserver) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startSync();
            tryPlay();
          } else {
            stopSync();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(video);
    } else {
      tryPlay();
    }

    return () => {
      if (observer) observer.disconnect();
      clearInterval(syncIntervalId);
      cleanupInteraction();
    };
  }, [startHero]);

  useEffect(() => {
    // Prefetch all lazy-loaded chunks in background when page mounts to leverage browser caching
    const prefetchChunks = () => {
      import("../sections/ShowcaseSection").catch(() => {});
      import("../sections/LogoSection").catch(() => {});
      import("../sections/FeatureCards").catch(() => {});
      import("../sections/ExperienceSection").catch(() => {});
      import("../sections/ScrollText").catch(() => {});
      import("../sections/Contact").catch(() => {});
      import("../sections/Footer").catch(() => {});
      import("../sections/Memories").catch(() => {});
      import("../components/Elastic").catch(() => {});
      import("@/components/ReelCanvas").catch(() => {});
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(prefetchChunks);
    } else {
      const timer = setTimeout(prefetchChunks, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!loaderComplete) return;

    // Refresh ScrollTrigger after a slight delay to ensure all DOM elements are painted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, [loaderComplete]);
  return (
    <>
      <SEO
        title="Web Agency Delhi NCR | AEDREA Digital Studio"
        description="AEDREA builds websites, WhatsApp automation & chatbots for Delhi NCR manufacturers & SMEs. Based in Delhi. Call +91-7289873340 or +91-8527722329."
        keywords="AI web agency Delhi NCR, website with chatbot Delhi, WhatsApp automation Delhi manufacturer, web design Nangloi Bawana Mundka, AI website SME Delhi, chatbot service Delhi NCR, React website Delhi"
        canonical="https://aedrea.com/"
        image="https://aedrea.com/images/logos/favicon.png"
      />

      {/* Main Smooth Scroll Container */}
      <main className="page">
        {/* Hero Stack containing Intro + Full Reel Card bounds */}
        <div className="hero-stack">
          <Hero start={startHero} videoSrc={finalVideoSrc} />
          <section className="reel-full" aria-label="Reel showcase">
            <div className="reel-full__card">
              <video
                ref={videoRef}
                src={finalVideoSrc}
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="auto"
                autoPlay
                poster="/images/hero-poster.webp"
                className="mobile-video"
              />
            </div>
          </section>
        </div>

        <AnimatedText />

        {/* WebGL scroll morph overlay — lazy loaded so Three.js doesn't block initial paint */}
        {startHero && (
          <Suspense fallback={null}>
            <ReelCanvas videoSrc={finalVideoSrc} />
          </Suspense>
        )}

        {/* Rest of the Homepage Sections - load only after loader is complete */}
        {loaderComplete && (
          <Suspense fallback={null}>
            <ShowcaseSection />
            <LogoSection />
            <FeatureCards />
            <ExperienceSection />
            <Memories />
            <ScrollText />
            <WavePath />
            <Contact />
            <Footer />
          </Suspense>
        )}
      </main>
    </>
  );
};

export default HomePage;