// src/pages/OurWork
// .jsx
// ✅ React + Tailwind + GSAP ScrollTrigger
// ✅ Lenis already handled in App.jsx
// ✅ Add to App.jsx: <Route path="/projects" element={<OurWork
//  />} />

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, stats, categories } from "../constants";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import RedirectButton from "@/components/RedirectButton";
import ShowcaseWall from "@/sections/ShowcaseWall";

gsap.registerPlugin(ScrollTrigger);

// ─── CATEGORY FILTER PILL ────────────────────────────────────────────────────
const FilterPill = ({ label, active, onClick }) => (
  <RedirectButton
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${active
      ? "bg-orange-400 border-orange-600 text-white"
      : "border-white/15 text-white/50 hover:border-orange-500/50 hover:text-black"
      }`}
  >
    {label}
  </RedirectButton>
);

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, refCallback }) => {
  const isFeatured = project.featured;

  return (
    <div
      ref={refCallback}
      style={{ opacity: 0 }}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 cursor-pointer
        ${isFeatured
          ? "md:col-span-2 border-white/15 bg-white/[0.03] hover:border-orange-400/40"
          : "border-white/10 bg-white/[0.02] hover:border-orange-400/30 hover:bg-white/[0.05]"
        }`}
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden ${isFeatured ? "h-72 md:h-80" : "h-64 md:h-48"}`}
        style={{ backgroundColor: project.color + "15" }}
      >
        {/* Placeholder gradient when no image */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${project.color}60 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Project number watermark */}
        <span
          className="absolute top-4 left-5 font-mono text-6xl font-black opacity-10 select-none"
          style={{ color: project.color }}
        >
          {project.id}
        </span>

        {/* Category badge */}
        <span
          className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
          style={{
            color: project.color,
            borderColor: project.color + "50",
            backgroundColor: project.color + "15",
          }}
        >
          {project.category}
        </span>

        {/* Featured badge */}
        {isFeatured && (
          <span className="absolute bottom-4 left-5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-orange-600 text-white">
            ★ Featured
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold tracking-wider hover:bg-orange-300 transition-colors duration-200"
            >
              View Live →
            </a>
          ) : (
            <span className="px-6 py-2.5 rounded-full text-white text-xs font-bold tracking-wider">
              Get Started
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-white/30 font-mono text-xs">
            {project.year}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-white/30 text-xs">{project.industry}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-white/30 text-xs">{project.location}</span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-1 group-hover:text-orange-300 transition-colors duration-300"
          style={{ color: "white" }}
        >
          {project.title}
        </h3>
        <p className="text-white/40 text-sm mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Highlights — only on featured */}
        {isFeatured && (
          <ul className="space-y-1.5 mb-5">
            {project.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-white/50 text-xs"
              >
                <span
                  style={{ color: project.color }}
                  className="mt-0.5 shrink-0"
                >
                  ▸
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border"
              style={{
                color: project.color,
                borderColor: project.color + "35",
                backgroundColor: project.color + "10",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${project.color}80, transparent)`,
        }}
      />
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function OurWork() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
            stagger: 0.035,
            duration: 0.9,
            ease: "power4.out",
            delay: 0.1,
          },
        );
      }

      // ── Marquee
      const marquee = marqueeRef.current;
      if (marquee) {
        const totalWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: -totalWidth,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      }

      // ── Stats counter
      const statEls = statsRef.current?.querySelectorAll(".stat-item");
      if (statEls?.length) {
        gsap.fromTo(
          statEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Cards animate on filter change
  useEffect(() => {
    const validCards = cardsRef.current.filter(Boolean);
    if (!validCards.length) return;

    gsap.fromTo(
      validCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
      },
    );
  }, [activeCategory]);

  const marqueeItems = [
    "React Development",
    "GSAP Animations",
    "AI Chatbots",
    "WhatsApp Automation",
    "Three.js",
    "Vapi.ai",
    "Delhi NCR",
    "Manufacturing Websites",
    "B2B Digital",
    "Lenis Scroll",
    "OpenAI GPT-4",
    "Vercel Deploy",
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <SEO
        title="Our Work & Case Studies | AEDREA Digital Studio Delhi NCR"
        description="Explore AEDREA's portfolio — websites, React builds, WhatsApp automation & chatbot systems built for Delhi NCR manufacturers and SMEs."
        keywords="AEDREA portfolio, web design case study Delhi NCR, React website manufacturer Delhi, AI website Delhi, WhatsApp automation Delhi SME, web agency Nangloi Bawana Mundka"
        canonical="https://aedrea.com/our-works"
        image="https://aedrea.com/images/logos/favicon.png"
      />
      <section
        ref={heroRef}
        className="pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="overflow-hidden">
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-none tracking-tighter flex flex-wrap">
            {"OUR WORK".split("").map((ch, i) => (
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

        <p className="mt-8 text-white/50 text-lg md:text-xl max-w-2xl font-light tracking-wide">
          Websites, branding, and automation systems built for real businesses
          from Delhi NCR manufacturers to growing service brands. We focus on
          practical work that helps businesses look better, respond faster, and
          operate smarter.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <a
            href="#projects-grid"
            className="px-8 py-3 rounded-full bg-transparent hover:bg-white text-white hover:text-black font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          >
            View Projects
          </a>
          <RedirectButton
            to="/services"
            className="px-8 py-3 rounded-full border border-white/20  text-white/70 hover:text-black font-semibold text-sm tracking-wider transition-all duration-300"
          >
            Our Services
          </RedirectButton>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ transform: "rotate(2deg)", margin: "0 -5%", width: "110%" }}
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
                <span className="ml-12 text-orange-500">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item text-center md:text-left"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl md:text-5xl font-bold  bg-clip-text bg-gradient-to-r  mb-2">
                {s.value}
              </div>
              <div className="text-white/40 text-sm tracking-wider uppercase font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER + GRID ────────────────────────────────────────────────── */}
      <section id="projects-grid" className="px-6 md:px-12 lg:px-20 pb-32">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => {
                setActiveCategory(cat);
                cardsRef.current = [];
              }}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              refCallback={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-white/30">
            <p className="text-2xl font-bold mb-2">Coming Soon</p>
            <p className="text-sm">
              More projects in this category on the way.
            </p>
          </div>
        )}
      </section>

      <ShowcaseWall />
      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}

      <Footer />
    </div>
  );
}
