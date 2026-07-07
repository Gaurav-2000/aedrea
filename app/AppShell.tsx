"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  Suspense,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import Loader from "../src/sections/Loader";
import NavBar from "../src/components/NavBar";
import MusicPlayer from "../src/components/MusicPlayer";
import Cursor from "../src/components/Cursor";
import CookieConsent from "../src/components/CookieConsent";
import { AuthProvider } from "../src/contexts/AuthContext";
import ProtectedRoute from "../src/components/ProtectedRoute";

gsap.registerPlugin(ScrollTrigger);

import { createContext, useContext } from "react";

export const AppShellContext = createContext<{
  startHero: boolean;
  loaderComplete: boolean;
  videoSrc: string;
}>({
  startHero: false,
  loaderComplete: false,
  videoSrc: "",
});

export const useAppShell = () => useContext(AppShellContext);

const APP_READY_TIMEOUT = 3500;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [appReady, setAppReady] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);
  const [cookieConsentVisible, setCookieConsentVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  const isDashboardOrAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register";

  useEffect(() => {
    let active = true;
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
        const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();
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
              img.onerror = resolve;
              img.src = src;
            })
        );

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

    if (isDashboardOrAuth) {
      lenis.start();
      return;
    }

    if (!loaderComplete || cookieConsentVisible) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [loaderComplete, cookieConsentVisible, isDashboardOrAuth]);

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
  }, [pathname]);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(t);
  }, [pathname]);

  // Track page views on route changes for GA4 if consent is accepted
  useEffect(() => {
    const consent = localStorage.getItem("aedrea_cookie_consent");
    if (consent === "accepted" && typeof (window as any).gtag === "function") {
      (window as any).gtag("config", "G-YKLHJKWMQZ", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <AuthProvider>
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
            (loaderComplete && !cookieConsentVisible) || isDashboardOrAuth
              ? ""
              : "pointer-events-none select-none"
          }
        >
          {!isDashboardOrAuth && <Cursor />}
          {!isDashboardOrAuth && <NavBar />}
          {!isDashboardOrAuth && <MusicPlayer src="/images/bg-ambient.mp3" />}
          <AppShellContext.Provider value={{ startHero: startHeroAnimation, loaderComplete, videoSrc }}>
            <Suspense fallback={null}>
              {isDashboardOrAuth && (pathname !== "/login" && pathname !== "/register") ? (
                <ProtectedRoute>{children}</ProtectedRoute>
              ) : (
                children
              )}
            </Suspense>
          </AppShellContext.Provider>
        </div>
      </ReactLenis>

      {!loaderComplete && !isDashboardOrAuth && (
        <Loader
          isReady={appReady}
          onFadeStart={handleFadeStart}
          onComplete={handleLoaderComplete}
        />
      )}

      {!isDashboardOrAuth && (
        <CookieConsent
          loaderComplete={loaderComplete}
          onVisibilityChange={setCookieConsentVisible}
        />
      )}
    </AuthProvider>
  );
}
