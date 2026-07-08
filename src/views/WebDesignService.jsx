import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import {
  webSteps,
  webTechStack,
  webDeliverables,
  webPlans,
  marqueeItems,
} from "@/constants";
import RedirectButton from "@/components/RedirectButton";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const whatWeBuild = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Corporate Portals",
    desc: "Professional company websites that build trust instantly — for manufacturers, exporters, B2B service firms, and consultancies. Our web development service delivers corporate portals that convert visitors into leads.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    title: "Product Showcases",
    desc: "Catalogue websites with sharp product photography, filters, and enquiry forms — built to convert distributor inquiries. A dedicated web development service for product-driven businesses.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Landing Pages",
    desc: "High-conversion single pages for campaigns, launches, or lead capture — with A/B ready structure and fast load times. Our web development service ensures every landing page is optimised for results.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: "Portfolio Sites",
    desc: "Stunning showcases for agencies, architects, designers, and creators — built to win projects through first impressions. Our web development service creates portfolios that get you hired.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Custom Web Apps",
    desc: "Interactive dashboards, booking systems, client portals — built in React with clean architecture and fast performance. This is our flagship web development service for businesses that need more than a brochure site.",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Mobile-First Sites",
    desc: "60%+ of your visitors are on mobile. Every web development service we deliver is tested pixel-perfect across all screen sizes and devices — because your customers are on their phones.",
  },
];

const webExtraCosts = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    label: "Domain",
    price: "₹800 – ₹1,500",
    period: "/ year",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: "Hosting",
    price: "₹2,000 – ₹6,000",
    period: "/ year",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    label: "Maintenance",
    price: "₹2,000 – ₹5,000",
    period: "/ month",
  },
];

/* FAQ data — keyword-rich */
const faqs = [
  {
    q: "What does your web development service include?",
    a: "Our web development service covers everything from design to deployment — UI/UX design, custom React development, SEO setup, mobile optimisation, and post-launch support. Every web development service package is tailored to your business goals.",
  },
  {
    q: "How long does the web development service take?",
    a: "Our web development service typically delivers a prototype within 48 hours and a complete site within 2–4 weeks depending on complexity. We keep timelines tight because your business can't wait.",
  },
  {
    q: "Is your web development service suitable for small businesses?",
    a: "Absolutely. Our web development service starts at ₹15,000 and is designed specifically for SMEs, manufacturers, exporters, and local businesses across Delhi NCR who need a professional online presence without enterprise-level costs.",
  },
  {
    q: "Do you offer ongoing support after the web development service?",
    a: "Yes. Our web development service includes a post-launch support window, and we offer monthly maintenance plans so your site stays fast, secure, and up to date.",
  },
  {
    q: "Why choose AEDREA's web development service over freelancers?",
    a: "With AEDREA's web development service, you get a dedicated team, fixed pricing, transparent timelines, and production-grade code — not WordPress templates or page builders. Our web development service is built for businesses that want real results.",
  },
  {
    q: "Which cities does your web development service cover?",
    a: "Our web development service is based in Delhi NCR and serves clients across Nangloi, Bawana, Rohini, Pitampura, Dwarka, Noida, Gurgaon, and all major Delhi NCR industrial and commercial zones.",
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function WebDesignService() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const titleLine1 = useRef(null);
  const titleLine2 = useRef(null);
  const marqueeRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const stepsRef = useRef([]);
  const techRef = useRef([]);
  const pricingRef = useRef([]);
  const sectionsRef = useRef([]);



  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tagRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      const line1 = titleLine1.current;
      const line2 = titleLine2.current;
      if (line1 && line2) {
        const wrapChars = (el) => {
          const text = el.innerText;
          el.innerHTML = text
            .split("")
            .map(
              (c) =>
                `<span class="char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${c === " " ? "&nbsp;" : c}</span></span>`,
            )
            .join("");
          return el.querySelectorAll(".char span");
        };
        const chars1 = wrapChars(line1);
        const chars2 = wrapChars(line2);

        gsap.from(chars1, {
          y: "110%",
          opacity: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.3,
        });
        gsap.from(chars2, {
          y: "110%",
          opacity: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.025,
          delay: 0.5,
        });
      }

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.from(actionsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 1.0,
      });

      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        delay: 1.2,
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.out",
          delay: (i % 3) * 0.1,
        });
      });

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.from(step, {
          scrollTrigger: { trigger: step, start: "top 88%" },
          opacity: 0,
          x: -30,
          duration: 0.5,
          ease: "power3.out",
          delay: i * 0.08,
        });
      });

      techRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          delay: i * 0.07,
        });
      });

      pricingRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          opacity: 0,
          y: 50,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.12,
        });
      });

      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="bg-[#0a0a0a] text-white font-sans overflow-x-hidden"
    >
      <SEO
        title="Web Design & Development Delhi NCR | React Websites | AEDREA"
        description="Custom React websites & web development service for Delhi NCR businesses — corporate portals, product showcases, landing pages & web apps. Starting ₹15,000. Free 30-min consultation."
        keywords="web design Delhi NCR, web development service Delhi, React website development Delhi, custom website manufacturer Delhi, corporate website Delhi, landing page Delhi NCR, web development service SME Delhi, web development service Nangloi Bawana"
        canonical="https://aedrea.com/services/web-design"
        image="https://aedrea.com/images/logos/favicon.png"
      />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 pt-16 sm:pt-20 lg:pt-25 pb-14 sm:pb-16 lg:pb-20 relative overflow-hidden">
        {/* radial glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,69,0,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Tag */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full text-white text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase  ]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Web Development Service · Web Design &amp; Development
        </div>

        {/* Title */}
        <div
          ref={titleRef}
          className="mb-5 sm:mb-6 leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <div
            ref={titleLine1}
            className="text-[clamp(2.4rem,8vw,6rem)] font-extrabold tracking-tight"
          >
            Websites That
          </div>
          <div
            ref={titleLine2}
            className="text-[clamp(2.4rem,8vw,6rem)] font-extrabold tracking-tight"
          >
            Actually Converts.
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[#888] text-base sm:text-lg leading-relaxed max-w-[560px] mb-8 sm:mb-10"
        >
          Our web development service delivers custom websites built for speed,
          clarity, and conversion — from corporate portals to product showcases.
          Every pixel is intentional, every interaction smooth. Trusted web
          development service for Delhi NCR businesses.
        </p>

        {/* Actions */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap"
        >
          <RedirectButton
            to="/contact"
            className="bg-transparent hover:bg-white  text-white hover:text-black px-7 sm:px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 duration-200 w-full sm:w-auto text-center"
          >
            Get a Free Quote
          </RedirectButton>
          <RedirectButton
            to="/our-works"
            className="bg-transparent border border-[#222] hover:border-[#555] text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-medium transition-colors w-full sm:w-auto text-center"
          >
            See Our Work
          </RedirectButton>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:flex sm:flex-row sm:gap-12 gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#1a1a1a]"
        >
          {[
            { num: "48h", label: "Prototype Delivery" },
            { num: "100", label: "PageSpeed Score" },
            { num: "3×", label: "Avg. Lead Increase" },
            { num: "₹0", label: "Hidden Costs" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-[1.8rem] sm:text-[2.2rem] font-extrabold leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {s.num}
              </div>
              <div className="text-xs text-[#888] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          MARQUEE
      ══════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ transform: "rotate(2deg)", margin: "0 -5%", width: "110%" }}
      >
        <div className="border-y border-white/10 py-4 bg-white/[0.02]">
          <div
            ref={marqueeRef}
            className="flex gap-12 whitespace-nowrap animate-ticker will-change-transform"
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

      {/* ══════════════════════════════
          INTRO STRIP — keyword-dense
      ══════════════════════════════ */}
      <section className="px-5 mt-20 sm:px-8 lg:px-16 py-8 border-b border-[#1a1a1a] bg-[rgba(255,69,0,0.04)]">
        <p className="text-[#666] text-[0.78rem] sm:text-sm leading-relaxed text-center max-w-4xl mx-auto">
          AEDREA is a professional <strong>web development service</strong>{" "}
          based in Delhi NCR. We provide end-to-end{" "}
          <strong>web development service</strong> for manufacturers, exporters,
          SMEs, and startups. Whether you need a corporate portal, an e-commerce
          platform, or a custom web app, our{" "}
          <strong>web development service</strong> team handles it all — design,
          code, testing, and deployment. Our{" "}
          <strong>web development service</strong> is trusted by businesses
          across Nangloi, Bawana, Rohini, Noida, and Gurgaon. Choose a that
          delivers measurable results, not just pretty pages.
        </p>
      </section>

      {/* ══════════════════════════════
          WHAT WE BUILD
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            <p
              className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Web Development Service · What We Build
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Right Website
              <br />
              For Your Business
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            We don't do templates. Our web development service designs every
            site from scratch — based on your goals, your audience, and your
            market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {whatWeBuild.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 sm:p-7 group hover:border-[rgba(255,69,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 bg-[rgba(255,69,0,0.12)] rounded-lg flex items-center justify-center text-white mb-4 sm:mb-5">
                {item.icon}
              </div>
              <h3
                className="font-bold text-sm mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-[#888] text-[0.84rem] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          PROCESS
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 bg-[#111] border-y border-[#1a1a1a]">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            <p
              className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Web Development Service · How We Work
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Our Process,
              <br />
              No Surprises
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Simple, transparent web development service workflow. You know
            exactly what's happening at every stage — from first call to
            go-live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          {/* Steps */}
          <div>
            {webSteps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (stepsRef.current[i] = el)}
                className="flex gap-5 sm:gap-6 py-5 sm:py-6 border-b border-[#1a1a1a] last:border-none group hover:opacity-80 transition-opacity cursor-default"
              >
                <span
                  className="text-white text-xs font-bold w-7 flex-shrink-0 pt-0.5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {step.num}
                </span>
                <div>
                  <h4
                    className="text-sm font-bold mb-1.5"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[#888] text-[0.84rem] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual panel */}
          <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6 sm:p-8 min-h-[300px] sm:min-h-[360px] flex flex-col justify-between">
            <div>
              <p className="text-[#777] text-[0.7rem] tracking-widest mb-4 sm:mb-5 uppercase">
                Web Development Service · Project Health Score
              </p>
              {[
                { label: "Performance (Core Web Vitals)", w: "90%" },
                { label: "Mobile Responsiveness", w: "100%" },
                { label: "SEO Score", w: "70%" },
                { label: "Load Speed", w: "55%" },
              ].map((bar) => (
                <div key={bar.label} className="mb-3 sm:mb-4">
                  <p className="text-[#777] text-[0.7rem] mb-1.5">
                    {bar.label}
                  </p>
                  <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: bar.w }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-[#777] text-[0.7rem] tracking-widest mb-3 uppercase">
                Web Development Service Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "REACT",
                  "NEXT.JS",
                  "VITE",
                  "TAILWIND",
                  "GSAP",
                  "LENIS",
                  "FIGMA",
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-[rgba(255,69,0,0.12)] text-white text-[0.7rem] font-bold px-2.5 py-1 rounded-full border border-[rgba(255,69,0,0.2)]"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TECH STACK + DELIVERABLES
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            <p
              className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Web Development Service · Stack &amp; Deliverables
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Aedrea Builds With
              <br />
              the Best Tools
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Production-grade web development service stack. Not WordPress. Not
            page builders. Real code that scales with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          {/* Tech list */}
          <div className="flex flex-col gap-3">
            {webTechStack.map((item, i) => (
              <div
                key={i}
                ref={(el) => (techRef.current[i] = el)}
                className="flex items-start sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 bg-[#111] border border-[#1a1a1a] rounded-xl hover:border-[rgba(255,69,0,0.35)] transition-colors"
              >
                <span
                  className="bg-[rgba(255,69,0,0.12)] border border-[rgba(255,69,0,0.2)] text-white text-[0.72rem] font-bold px-3 py-1 rounded-md min-w-[80px] sm:min-w-[90px] text-center flex-shrink-0"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.badge}
                </span>
                <p className="text-[#888] text-[0.84rem] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8">
            <h4
              className="font-bold text-base sm:text-lg mb-5 sm:mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              What You Receive From Our Service
            </h4>
            {webDeliverables.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-[#1a1a1a] last:border-none text-[0.84rem] sm:text-[0.88rem] text-[#888]"
              >
                <div className="w-4 h-4 bg-[rgba(255,69,0,0.12)] border border-[rgba(255,69,0,0.3)] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-[9px]">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FAQ — keyword-rich
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 bg-[#111] border-t border-[#1a1a1a]">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="mb-10 sm:mb-12"
        >
          <p
            className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Web Development Service · FAQ
          </p>
          <h2
            className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Common Questions About
            <br />
            Our Web Development Service
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 sm:p-6 hover:border-[rgba(255,69,0,0.3)] transition-colors"
            >
              <h3
                className="font-bold text-sm mb-3 text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {faq.q}
              </h3>
              <p className="text-[#888] text-[0.84rem] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          PRICING
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            <p
              className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Web Development Service · Investment
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Web Development Service Pricing,
              <br />
              No Surprises
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Fixed-price web development service packages. No hourly billing. No
            scope creep. You know the cost before our web development service
            begins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {webPlans.map((plan, i) => (
            <div
              key={i}
              ref={(el) => (pricingRef.current[i] = el)}
              className={`bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 relative transition-colors duration-300
                ${plan.popular
                  ? "border-2 border-white animate-pulse-subtle"
                  : "border border-[#1a1a1a] hover:border-[#555]"
                }`}
            >
              {plan.ribbon && (
                <span
                  className={`absolute -top-3 right-6 text-[0.62rem] sm:text-[0.68rem] font-extrabold tracking-widest px-3 py-1 rounded-sm whitespace-nowrap uppercase
                    ${plan.ribbon === "SILVER" ? "bg-zinc-700 text-zinc-100 border border-zinc-600" : ""}
                    ${plan.ribbon === "REGULAR" ? "bg-yellow-500 text-black" : ""}
                    ${plan.ribbon === "PREMIUM" ? "bg-red-600 text-white" : ""}
                  `}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {plan.ribbon}
                </span>
              )}
              {plan.popular && !plan.ribbon && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[0.68rem] font-bold tracking-widest px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  ★ MOST POPULAR
                </span>
              )}
              <p
                className="text-[#888] text-[0.75rem] font-bold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {plan.name}
              </p>
              <p
                className="text-[1.6rem] sm:text-[1.8rem] font-extrabold mb-1 leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {plan.price}
                <span className="text-[#777] text-base sm:text-lg font-bold">
                  {" "}
                  {plan.priceSuffix}
                </span>
              </p>
              <p className="text-[#777] text-[0.7rem] mb-3 pb-5 sm:pb-6 border-b border-[#1a1a1a]">
                {plan.billingDetails || "one-time · web development service · no hidden fees"}
              </p>
              <p className="text-white text-[0.72rem] font-bold tracking-wide mb-3">
                👉 {plan.timeline}
              </p>
              <ul className="flex flex-col gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    className="flex gap-2 text-[#888] text-[0.84rem]"
                  >
                    <span className="text-white">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
              <RedirectButton
                to="/contact"
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${plan.popular
                    ? "bg-white hover:text-black text-black border-none"
                    : "bg-transparent text-white border border-[#1a1a1a] hover:border-[#555]"
                  }`}
              >
                {plan.cta}
              </RedirectButton>
            </div>
          ))}
        </div>

        {/* Extra Costs */}
        <div className="mt-10 sm:mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <p
                className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Web Development Service · Extra Costs 💰
              </p>
              <h3
                className="text-base sm:text-lg font-bold"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Additional Running Costs to Budget For
              </h3>
            </div>
            <p className="text-[#777] text-xs sm:max-w-[220px]">
              These are third-party costs not included in your web development
              service package price.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {webExtraCosts.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#111] border border-[#1a1a1a] rounded-xl px-5 py-4 hover:border-[rgba(255,69,0,0.3)] transition-colors"
              >
                <div className="w-9 h-9 bg-[rgba(255,69,0,0.1)] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#777] text-[0.7rem] uppercase tracking-widest mb-0.5">
                    {item.label}
                  </p>
                  <p
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.price}
                    <span className="text-[#777] font-normal text-xs">
                      {" "}
                      {item.period}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY CHOOSE US — keyword strip
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-10 border-t border-[#1a1a1a] bg-[rgba(255,69,0,0.03)]">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="max-w-4xl mx-auto text-center"
        >
          <p
            className="text-white text-xs font-bold tracking-[0.12em] uppercase mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Why AEDREA · Web Development Service Delhi NCR
          </p>

          <p className="text-[#666] text-[0.78rem] sm:text-sm leading-loose">
            Looking for a reliable web development service in Delhi? AEDREA
            delivers modern frontend web development solutions focused on
            performance, UI/UX, SEO, and scalable deployment. Our frontend web
            development expertise is trusted by manufacturers in Bawana,
            exporters in Okhla, and service businesses across Delhi NCR. We are
            more than a web development service — we act as a long-term digital
            growth partner for ambitious brands.
            <br />
            <br />
            Every project is backed by strategy, clean code, and
            conversion-focused design thinking. Our frontend web development
            team has delivered landing pages, business websites, and custom web
            applications tailored for speed and user experience. From startup
            brands to industrial businesses, AEDREA builds digital platforms
            designed to grow visibility, trust, and leads online.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA
      ══════════════════════════════ */}

      <Footer />

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
        @keyframes pulseSubtle {
          0%, 100% { border-color: rgba(255, 255, 255, 1); }
          50% { border-color: rgba(255, 255, 255, 0.4); }
        }
        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}