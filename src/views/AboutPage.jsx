// src/pages/AboutPage.jsx
// ✅ React + Tailwind + GSAP ScrollTrigger
// ✅ Add to App.jsx: <Route path="/about" element={<AboutPage />} />

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import RedirectButton from "@/components/RedirectButton";
import { marqueeItems, values, timeline, team, stack } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const stackRef = useRef(null);
  const manifestoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero letter reveal
      const letters = heroRef.current?.querySelectorAll(".hero-letter");
      if (letters?.length) {
        gsap.fromTo(
          letters,
          { y: 130, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.1,
          },
        );
      }

      // ── Hero sub content
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-sub"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        },
      );

      // ── Marquee

      const marquee = marqueeRef.current;
      if (marquee) {
        const totalWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: -totalWidth,

          duration: 26,
          ease: "none",
          repeat: -1,
        });
      }

      // ── Manifesto big text
      gsap.fromTo(
        manifestoRef.current?.querySelectorAll(".manifesto-line"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: manifestoRef.current, start: "top 75%" },
        },
      );

      // ── Values
      gsap.fromTo(
        valuesRef.current?.querySelectorAll(".value-item"),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: valuesRef.current, start: "top 75%" },
        },
      );

      // ── Timeline items
      gsap.fromTo(
        timelineRef.current?.querySelectorAll(".timeline-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
        },
      );

      // ── Team card
      gsap.fromTo(
        teamRef.current?.querySelectorAll(".team-card"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
        },
      );

      // ── Stack pills
      gsap.fromTo(
        stackRef.current?.querySelectorAll(".stack-pill"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: stackRef.current, start: "top 80%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <SEO
        title="About AEDREA | Web Agency for Manufacturers & SMEs Delhi NCR"
        description="AEDREA is a Delhi NCR based AI web agency helping manufacturers & SMEs grow with AI websites, WhatsApp automation & digital systems. Based in Delhi. Call +91-7289873340."
        keywords="about AEDREA digital studio, AI web agency Delhi NCR, web agency Delhi manufacturers, who is AEDREA, AEDREA team Delhi, digital studio Delhi NCR, AI automation agency Delhi"
        canonical="https://aedrea.com/about"
        image="https://aedrea.com/images/logos/favicon.png"
      />
      <section
        ref={heroRef}
        className="pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <p
          className="hero-sub text-orange-300 text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
          style={{ opacity: 0 }}
        >
          Who We Are
        </p>
        <div className="overflow-hidden">
          <h1 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-none tracking-tighter flex flex-wrap">
            {"ABOUT US".split("").map((ch, i) => (
              <span
                key={i}
                className="hero-letter inline-block"
                style={{ opacity: 0 }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-4xl">
          <p
            className="hero-sub text-white/60 text-lg leading-relaxed"
            style={{ opacity: 0 }}
          >
            AEDREA was built to help strong offline businesses create a stronger
            online presence through professional websites, clear branding, and
            practical AI systems that improve growth, trust, and everyday
            business operations.
          </p>
          <p
            className="hero-sub text-white/40 text-base leading-relaxed"
            style={{ opacity: 0 }}
          >
            Founded by a developer who came from real sales experience and
            understood what businesses actually need — not just a pretty
            website, but a growth engine.
          </p>
        </div>

        <div
          className="hero-sub mt-10 flex flex-wrap gap-4"
          style={{ opacity: 0 }}
        >
          <RedirectButton
            to="/our-works"
            className="px-8 py-3 rounded-full bg-transparent  text-white font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          >
            See Our Work
          </RedirectButton>
          <RedirectButton
            to="/services"
            className="px-8 py-3 rounded-full border border-white/20 hover:!text-black  text-white/70 hover:text-white font-semibold text-sm tracking-wider transition-all duration-300"
          >
            Our Services
          </RedirectButton>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ transform: "rotate(-2deg)", margin: "0 -5%", width: "110%" }}
      >
        <div className="border-y border-white/10 py-4 bg-white/[0.02]">
          <div
            ref={marqueeRef}
            className="flex gap-12 whitespace-nowrap will-change-transform"
          >
            {[...marqueeItems, ...marqueeItems].map((tag, i) => (
              <span
                key={i}
                className="text-white/30 text-sm font-medium tracking-[0.25em] uppercase"
              >
                {tag}
                <span className="ml-12 text-orange-300">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MANIFESTO ─────────────────────────────────────────────────────── */}
      <section
        ref={manifestoRef}
        className="px-6 md:px-12 lg:px-20 py-28 border-b border-white/5"
      >
        <div className="max-w-5xl">
          {[
            { text: "We don't build websites.", muted: false },
            { text: "We build growth systems.", muted: false },
            { text: "The website is just the beginning.", muted: true },
          ].map((line, i) => (
            <div
              key={i}
              className="manifesto-line overflow-hidden"
              style={{ opacity: 0 }}
            >
              <p
                className={`text-[clamp(1.8rem,5vw,4.5rem)] font-black leading-tight tracking-tight ${line.muted ? "text-white/20" : "text-white"}`}
              >
                {line.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 manifesto-line" style={{ opacity: 0 }}>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            Delhi NCR ke manufacturers, B2B companies, aur growing businesses
            deserve more than a template site. They need AI, automation, and
            design working together — that's exactly what AEDREA delivers.
          </p>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section
        ref={valuesRef}
        className="px-6 md:px-12 lg:px-20 py-24 border-b border-white/5"
      >
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              Our Values
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              What We
              <br />
              <span className="text-white/25">Stand For</span>
            </h2>
          </div>
          <div className="space-y-7">
            {values.map((v) => (
              <div
                key={v.num}
                className="value-item flex gap-5 items-start group"
                style={{ opacity: 0 }}
              >
                <span className="text-orange-300 font-mono text-xs mt-1 shrink-0">
                  {v.num}
                </span>
                <div className="border-t border-white/10 pt-4 flex-1 group-hover:border-orange-500/40 transition-colors duration-300">
                  <p className="text-white font-semibold mb-2">{v.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section
        ref={timelineRef}
        className="px-6 md:px-12 lg:px-20 py-24 border-b border-white/5"
      >
        <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
          Our Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          How We Got Here
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/8 hidden md:block" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item flex gap-8 items-start group"
                style={{ opacity: 0 }}
              >
                {/* Year */}
                <div className="shrink-0 w-20 text-right">
                  <span className="text-orange-300 font-mono text-sm font-bold">
                    {item.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative shrink-0 hidden md:flex items-center justify-center w-3 h-3 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-600 group-hover:scale-150 transition-transform duration-300" />
                  <div className="absolute w-5 h-5 rounded-full border border-orange-500/30 group-hover:border-orange-500/60 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-10 border-b border-white/5 group-hover:border-white/10 transition-colors duration-300">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section
        ref={teamRef}
        className="px-6 md:px-12 lg:px-20 py-24 border-b border-white/5"
      >
        <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
          The Team
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Who Builds This
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="team-card group cursor-default"
              style={{ opacity: 0 }}
            >
              {/* ── Portrait ── */}
              {/* ── Portrait ── */}
              <div
                className="relative w-full overflow-hidden rounded-lg mb-3
   bg-white/[0.025] border border-white border-20
   transition-all duration-700"
                style={{ aspectRatio: "3/4" }}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top
    grayscale brightness-90
    group-hover:scale-105
    transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[52px] font-black tracking-tighter select-none
         transition-transform duration-700 ease-out
         group-hover:scale-[1.06]"
                      style={{ color: member.color + "40" }}
                    >
                      {member.initial}
                    </span>
                  </div>
                )}

                {/* Subtle color tint overlay — dissolves on hover for extra "pop" */}
                <div
                  className="absolute inset-0 pointer-events-none
     mix-blend-color opacity-0 group-hover:opacity-100
     transition-opacity duration-700"
                  style={{ backgroundColor: member.color + "33" }}
                />

                {/* Bottom fade — visible on hover only */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 pointer-events-none
     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* ── Name ── */}
              <p
                className="text-[17px] tracking-tight leading-snug
                   text-white/60 group-hover:text-white/85
                   transition-colors duration-300"
              >
                {member.name}
              </p>

              {/* ── Role ── */}
              <p
                className="mt-[5px] font-mono text-[12px] tracking-[0.11em] uppercase
                   text-white/30 group-hover:text-white/60
                   transition-colors duration-300"
              >
                {member.role}
              </p>
            </div>
          ))}

          {/* ── Ghost card — open role ── */}
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      <section
        ref={stackRef}
        className="px-6 md:px-12 lg:px-20 py-24 border-b border-white/5"
      >
        <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
          What We Use
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Stack</h2>

        <div className="flex flex-wrap gap-3">
          {stack.map((item) => (
            <div
              key={item.name}
              className="stack-pill group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-orange-500/40 hover:bg-orange-950/20 transition-all duration-300 cursor-default"
              style={{ opacity: 0 }}
            >
              <span className="text-[9px] font-bold tracking-widest uppercase text-orange-300/60 group-hover:text-orange-400 transition-colors duration-300">
                {item.category}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}

      <Footer />
    </div>
  );
}
