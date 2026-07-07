"use client";

import { lazy, Suspense, useEffect, useRef } from "react";
import { useAppShell } from "./AppShell";
import Hero from "../src/sections/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Eager — first section after hero, needs to be ready instantly
import AnimatedText from "../src/sections/AnimatedText";

// Lazy Loaded Sections
const ShowcaseSection = lazy(() => import("../src/sections/ShowcaseSection"));
const LogoSection = lazy(() => import("../src/sections/LogoSection"));
const FeatureCards = lazy(() => import("../src/sections/FeatureCards"));
const ExperienceSection = lazy(() => import("../src/sections/ExperienceSection"));
const ScrollText = lazy(() => import("../src/sections/ScrollText"));
const Contact = lazy(() => import("../src/sections/Contact"));
const Footer = lazy(() => import("../src/sections/Footer"));
const Memories = lazy(() => import("../src/sections/Memories"));
const WavePath = lazy(() => import("../src/components/Elastic"));
const ReelCanvas = lazy(() => import("../src/components/ReelCanvas"));

export default function Home() {
  const { startHero, loaderComplete, videoSrc } = useAppShell();
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const interactionRegisteredRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force inline play attributes programmatically
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    let observer: IntersectionObserver | null = null;
    let syncIntervalId: any = null;

    const tryPlay = () => {
      if (startedRef.current) return;

      video.play()
        .then(() => {
          startedRef.current = true;
          cleanupInteraction();
        })
        .catch(() => {
          if (!interactionRegisteredRef.current) {
            interactionRegisteredRef.current = true;
            window.addEventListener("touchstart", handleInteraction, { passive: true });
            window.addEventListener("click", handleInteraction, { passive: true });
          }
        });
    };

    const handleInteraction = () => {
      tryPlay();
    };

    const cleanupInteraction = () => {
      if (interactionRegisteredRef.current) {
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("click", handleInteraction);
        interactionRegisteredRef.current = false;
      }
    };

    const syncPlaybackTime = () => {
      const heroVideo = (window as any).__heroVideo;
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
      syncPlaybackTime();
      clearInterval(syncIntervalId);
      syncIntervalId = setInterval(syncPlaybackTime, 2500);
    };

    const stopSync = () => {
      clearInterval(syncIntervalId);
      if (startedRef.current) {
        video.pause();
        startedRef.current = false;
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
      import("../src/sections/ShowcaseSection").catch(() => {});
      import("../src/sections/LogoSection").catch(() => {});
      import("../src/sections/FeatureCards").catch(() => {});
      import("../src/sections/ExperienceSection").catch(() => {});
      import("../src/sections/ScrollText").catch(() => {});
      import("../src/sections/Contact").catch(() => {});
      import("../src/sections/Footer").catch(() => {});
      import("../src/sections/Memories").catch(() => {});
      import("../src/components/Elastic").catch(() => {});
      import("../src/components/ReelCanvas").catch(() => {});
    };

    if ((window as any).requestIdleCallback) {
      (window as any).requestIdleCallback(prefetchChunks);
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
    <main className="page">
      {/* Hero Stack containing Intro + Full Reel Card bounds */}
      <div className="hero-stack">
        <Hero start={startHero} videoSrc={videoSrc} />
        <section className="reel-full" aria-label="Reel showcase">
          <div className="reel-full__card">
            <video
              ref={videoRef}
              src={videoSrc || undefined}
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
          <ReelCanvas videoSrc={videoSrc} />
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
  );
}
