// src/sections/Footer.jsx
// ✅ Drop-in replacement — same imports as before

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialImgs } from "../constants";
import RedirectButton from "@/components/RedirectButton";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Our Works", href: "/our-works" },
  { name: "Our Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Footer = () => {
  const footerRef = useRef(null);
  const lettersRef = useRef([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Big AEDREA letters reveal on scroll
      gsap.fromTo(
        lettersRef.current.filter(Boolean),
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reset", // ← ye line magic hai
          },
        },
      );

      // ── Content fade up
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".footer-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-white/8 overflow-hidden pt-20 pb-0 px-6 md:px-12 lg:px-20"
    >
      {/* ── Purple glow behind text ─────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-16">
        <div className="w-[700px] h-[200px] bg-orange-600/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Top row: tagline + nav links ───────────────────────────────── */}
      <div
        ref={contentRef}
        className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16"
      >
        {/* Left — tagline */}
        <div className="footer-item max-w-xs" style={{ opacity: 0 }}>
          <p className="text-orange-300 text-2xl tracking-[0.3em] uppercase !font-semibold mb-3">
            let's <br />Colaborate
          </p>
        </div>

        {/* Center — nav */}
        <div className="footer-item" style={{ opacity: 0 }}>
          <p className="text-white/50 tracking-[0.2em] uppercase mb-4">Pages</p>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <RedirectButton
                  to={link.href}
                  className="border-none !text-white/75 !bg-transparent hover:!bg-transparent text-center md:text-left"
                  ariaLabel={`Navigate to ${link.name} page`}
                >
                  {link.name}
                </RedirectButton>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — contact */}
        <div className="footer-item" style={{ opacity: 0 }}>
          <p className="text-white/50  tracking-[0.2em] uppercase mb-4">
            Contact
          </p>
          <div className="space-y-3">
            <a
              href="https://wa.me/917289873340"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/75 hover:text-orange-400 text-sm transition-colors duration-300 group"
            >
              <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs group-hover:border-orange-500/40 transition-colors duration-300">
                💬
              </span>
              WhatsApp Us
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@aedrea.com&su=Project%20Discussion&body=Hi%20Aedrea%20Team,%0A%0AProject:%0ABudget:%0ATimeline:"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-white/75 hover:text-orange-400 text-sm transition-colors duration-300 group"
            >
              <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs group-hover:border-orange-500/40 transition-colors duration-300">
                ✉️
              </span>
              support@aedrea.com
            </a>
            <p className="flex items-center gap-2.5 text-white/75 text-sm">
              <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs">
                📍
              </span>
              Pitampura, New Delhi
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {socialImgs.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center hover:border-orange-500/50 hover:bg-orange-950/30 transition-all duration-300 hover:scale-110"
              >
                <img
                  src={s.imgPath}
                  alt="social"
                  className="w-7 h-7 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div
        className="footer-item mb-8 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-white/5 pt-6"
        style={{ opacity: 0 }}
      >
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Aedrea Studio. All rights reserved.
        </p>
        <p className="text-white/15 text-xs">
          Built with React · GSAP · Lenis · Three.js
        </p>
      </div>

      {/* ── GIANT AEDREA TEXT — half cut at bottom ─────────────────────── */}
      {/* overflow-hidden on footer clips the bottom half */}
      <div
        className="flex justify-center"
        style={{
          marginBottom: "-0.45em", // pulls text into bottom edge — half cut effect
          lineHeight: 1,
        }}
      >
        {"AEDREA".split("").map((ch, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block font-black uppercase select-none"
            style={{
              fontSize: "clamp(5rem, 20vw, 20rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              opacity: 0,
              marginTop: "-5rem", // adjusts vertical position of text within the footer
              color: "rgba(255, 255, 255, 0.2)",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
