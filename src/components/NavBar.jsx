import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { navLinks } from "../constants";
import logo from "@/assets/AEDREALogoWhite2.svg";

import TalkButton from "@/TalkButton";

const PANEL_COLORS = ["#B497CF", "#5227FF"];
const ACCENT_COLOR = "#FF7A00";
const SOCIAL_ITEMS = [
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/aedrea-studio-479a033b0",
  },
  { label: "WhatsApp", link: "https://wa.me/917289873340" },
  { label: "Instagram", link: "https://www.instagram.com/aedrea.studio/" },
];

const NavBar = () => {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const openRef = useRef(false);
  const busyRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  // Hamburger line refs
  const toggleBtnRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ── Close on route change ─────────────────────────────────────────────────
  useEffect(() => {
    if (openRef.current) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Initial GSAP setup ────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const preCont = preLayersRef.current;
    if (!panel) return;

    if (preCont) {
      preLayerElsRef.current = Array.from(
        preCont.querySelectorAll(".sm-prelayer"),
      );
    }

    gsap.set([panel, ...preLayerElsRef.current], { xPercent: 100 });

    // Hamburger initial state
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      transformOrigin: "center center",
      rotate: 0,
      y: 0,
      opacity: 1,
    });
  }, []);

  // ── Panel open timeline ───────────────────────────────────────────────────
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    );
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
    const socialTitle = panel.querySelector(".sm-socials-title");

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(
        el,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelStart = lastTime + (layers.length ? 0.08 : 0);
    const panelDur = 0.65;

    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: panelDur, ease: "power4.out" },
      panelStart,
    );

    if (itemEls.length) {
      const itemsAt = panelStart + panelDur * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1 },
        },
        itemsAt,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08 },
          },
          itemsAt + 0.1,
        );
      }
    }

    const socialsAt = panelStart + panelDur * 0.4;
    if (socialTitle)
      tl.to(
        socialTitle,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        socialsAt,
      );
    if (socialLinks.length)
      tl.to(
        socialLinks,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: { each: 0.08 },
        },
        socialsAt + 0.04,
      );

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: 100,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        );
        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        );
        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        );
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, []);

  // ── Hamburger ↔ X animation ───────────────────────────────────────────────
  const animateIcon = useCallback((opening) => {
    spinTweenRef.current?.kill();

    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;

    if (opening) {
      // top line moves down 5px + rotates 45°, bottom moves up 5.5px + rotates -45°, middle fades
      spinTweenRef.current = gsap
        .timeline({ defaults: { duration: 0.38, ease: "power3.inOut" } })
        .to(l2, { opacity: 0, scaleX: 0, duration: 0.2 }, 0)
        .to(l1, { y: 5, rotate: 45 }, 0)
        .to(l3, { y: -5.5, rotate: -45, width: "100%" }, 0);
    } else {
      // restore hamburger
      spinTweenRef.current = gsap
        .timeline({ defaults: { duration: 0.38, ease: "power3.inOut" } })
        .to(l1, { y: 0, rotate: 0 }, 0)
        .to(l3, { y: 0, rotate: 0, width: "11px" }, 0)
        .to(l2, { opacity: 1, scaleX: 1, duration: 0.25 }, 0.15);
    }
  }, []);

  // ── Toggle / Close ────────────────────────────────────────────────────────
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) playOpen();
    else playClose();
    animateIcon(target);
  }, [playOpen, playClose, animateIcon]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    playClose();
    animateIcon(false);
  }, [playClose, animateIcon]);

  const handleNavClick = (e, link) => {
    closeMenu();
    if (link.startsWith("/#") && location.pathname !== "/") {
      window.location.href = link;
    }
  };

  const isPricing = pathname === "/pricing";

  return (
    <>
      <header
        className={`navbar ${(scrolled || isPricing) ? "scrolled backdrop-blur-xl !bg-black/50 !top-0" : "not-scrolled !top-0"}`}
      >
        <div className="inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="flex items-center gap-2">
              <img className="w-10 md:w-12" src={logo?.src || logo} alt="Aedrea " />
              <p className="text-white font-medium">AEDREA</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="desktop">
            <ul>
              {navLinks.map(({ link, name }) => {
                if (name === "Services") {
                  return (
                    <li key={name} className="group relative">
                      <Link href={link} className="flex items-center gap-1">
                        <span>{name}</span>
                        <svg
                          className="w-3 h-3 text-white/40 group-hover:rotate-180 transition-transform duration-300 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="underline" />
                      </Link>
                      
                      {/* Apple-clean Services Dropdown */}
                      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 text-left">
                        <div className="bg-[#0d0d12]/95 border border-[#1a1a24] backdrop-blur-xl rounded-xl p-2 shadow-2xl space-y-0.5">
                          <Link
                            href="/services"
                            className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-xs font-semibold text-white/95"
                          >
                            <p className="font-semibold text-white">All Services</p>
                            <p className="text-[10px] text-white/40 font-normal mt-0.5">Explore our capabilities</p>
                          </Link>
                          <div className="h-px bg-white/5 my-1" />
                          <Link
                            href="/services/web-design"
                            className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-xs font-semibold text-white/95"
                          >
                            <p className="font-semibold text-white">Web Design & Dev</p>
                            <p className="text-[10px] text-white/40 font-normal mt-0.5">High-performance corporate sites</p>
                          </Link>
                          <Link
                            href="/services/seo-services"
                            className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-xs font-semibold text-white/95"
                          >
                            <p className="font-semibold text-white">AI SEO Services</p>
                            <p className="text-[10px] text-white/40 font-normal mt-0.5">Rank on Google first page</p>
                          </Link>
                          <Link
                            href="/services/ai-automation"
                            className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-xs font-semibold text-white/95"
                          >
                            <p className="font-semibold text-white">AI Automation</p>
                            <p className="text-[10px] text-white/40 font-normal mt-0.5">WhatsApp bots & receptionists</p>
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={name} className="group">
                    {link.startsWith("/") && !link.startsWith("/#") ? (
                      <Link href={link}>
                        <span>{name}</span>
                        <span className="underline" />
                      </Link>
                    ) : (
                      <a href={link} onClick={(e) => handleNavClick(e, link)}>
                        <span>{name}</span>
                        <span className="underline" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:inline-block text-xs font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-full transition-all duration-300"
            >
              SaaS Login
            </Link>
            <TalkButton />

            {/* ── Hamburger button ── */}
            <button
              ref={toggleBtnRef}
              onClick={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex lg:hidden items-center justify-center w-5 h-10
                         bg-transparent border-0 cursor-pointer relative z-[201]"
            >
              {/*
                Fixed 16×12 canvas centred in the 40×40 button.
                Lines sit at y = 0, 5.5, 11 inside the canvas.
                X-animation: line1 → y+5.5 rotate45, line3 → y-5.5 rotate-45
              */}
              <span className="relative block w-[16px] h-[12px] pointer-events-none">
                {/* Line 1 — top */}
                <span
                  ref={line1Ref}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "1.5px",
                    borderRadius: "9999px",
                    background: "#fff",
                    transformOrigin: "center center",
                  }}
                />
                {/* Line 2 — middle */}
                <span
                  ref={line2Ref}
                  style={{
                    position: "absolute",
                    top: "5px",
                    left: 0,
                    width: "100%",
                    height: "1.5px",
                    borderRadius: "9999px",
                    background: "#fff",
                    transformOrigin: "center center",
                  }}
                />
                {/* Line 3 — bottom (slightly shorter, right-aligned) */}
                <span
                  ref={line3Ref}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "11px",
                    height: "1.5px",
                    borderRadius: "9999px",
                    background: "#fff",
                    transformOrigin: "center center",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile panel ── */}
      <div
        className="fixed inset-0 z-[199] pointer-events-none lg:hidden"
        style={{ "--sm-accent": ACCENT_COLOR }}
        aria-hidden={!open}
      >
        {/* Pre-layers */}
        <div
          ref={preLayersRef}
          className="absolute top-0 right-0 bottom-0 w-full pointer-events-none"
        >
          {(() => {
            let arr = [...PANEL_COLORS];
            if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute inset-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* Panel */}
        <aside
          ref={panelRef}
          aria-hidden={!open}
          className="absolute top-0 right-0 w-full h-full bg-white flex flex-col overflow-y-auto pointer-events-auto z-10"
          style={{ padding: "5.5rem 1.5rem 2rem 1.5rem" }}
        >
          {/* Panel close button */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                       bg-black/5 hover:bg-black/10 rounded-full transition-colors duration-200
                       border border-black/10 cursor-pointer z-20"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="#000"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex flex-col flex-1 gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              data-numbering="true"
            >
              {navLinks.map(({ link, name }, i) => (
                <li
                  key={name}
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                >
                  {link.startsWith("/") && !link.startsWith("/#") ? (
                    <Link
                      href={link}
                      onClick={closeMenu}
                      className="sm-panel-item"
                      data-index={i + 1}
                    >
                      <span className="sm-panel-itemLabel">{name}</span>
                    </Link>
                  ) : (
                    <a
                      href={link}
                      onClick={(e) => handleNavClick(e, link)}
                      className="sm-panel-item"
                      data-index={i + 1}
                    >
                      <span className="sm-panel-itemLabel">{name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="sm-socials mt-auto pt-8 flex flex-col gap-3">
              <h3
                className="sm-socials-title m-0 text-base font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                Socials
              </h3>
              <ul className="list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap">
                {SOCIAL_ITEMS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-[1.1rem] font-medium text-[#111] no-underline relative inline-block py-[2px]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .navbar.not-scrolled { top: 0 !important; }

        .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; }

        .sm-panel-item {
          position: relative;
          color: #000;
          font-weight: 600;
          font-size: clamp(2.8rem, 11vw, 4rem);
          cursor: pointer;
          line-height: 1;
          letter-spacing: -2px;
          text-transform: uppercase;
          display: inline-block;
          text-decoration: none;
          padding-right: 1.4em;
          transition: color 0.15s ease;
        }
        .sm-panel-item:hover { color: var(--sm-accent, #5227FF); }

        .sm-panel-itemLabel {
          display: inline-block;
          will-change: transform;
          transform-origin: 50% 100%;
        }

        .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
        .sm-panel-list     { counter-reset: smItem; }

        .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.1em;
          right: 0.3em;
          font-size: 16px;
          font-weight: 400;
          color: var(--sm-accent, #5227FF);
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: var(--sm-num-opacity, 0);
        }

        .sm-socials-link { transition: color 0.3s ease, opacity 0.3s ease; }
        .sm-socials-link:hover { color: var(--sm-accent, #5227FF); }
      `}</style>
    </>
  );
};

export default NavBar;
