import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import {
  steps,
  marqueeItems,
  techStack,
  plans,
  deliverables,
} from "@/constants";
import RedirectButton from "@/components/RedirectButton";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const automations = [
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
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    tag: "Most Requested",
    title: "WhatsApp Automation",
    desc: "Our AI automation services handle WhatsApp 24/7 — auto-reply to leads, send order updates, payment reminders, follow-ups, and broadcast campaigns on WhatsApp Business API. Zero manual effort.",
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
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.19-1.19a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
    tag: "AI-Powered",
    title: "AI Call Assistant",
    desc: "A voice-based AI automation service that answers your business calls, qualifies leads, books appointments, and transfers hot prospects to your team — powered by Vapi.ai.",
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
    tag: "Lead Gen",
    title: "Lead Generation Automation",
    desc: "Our AI automation services capture leads from Facebook Ads, Google Forms, Instagram DMs, and landing pages — auto-qualify, score, and push them straight to your CRM or WhatsApp.",
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
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h.01M11 8h6" />
      </svg>
    ),
    tag: "Sales",
    title: "CRM & Pipeline Automation",
    desc: "AI automation services for your CRM — auto-create deals, update stages, assign tasks to sales reps, and send follow-up sequences so no lead ever slips through the cracks.",
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    tag: "Marketing",
    title: "Email & SMS Drip Automation",
    desc: "Welcome sequences, abandoned cart nudges, re-engagement campaigns, and post-purchase flows — our AI automation services run these forever, converting on autopilot.",
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
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
    tag: "Support",
    title: "AI Chatbot (Website + Instagram)",
    desc: "Deploy a trained AI automation service chatbot on your website and Instagram DMs that answers FAQs, collects contact details, and hands off complex queries to a human agent.",
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
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    tag: "Ops",
    title: "Appointment & Booking Automation",
    desc: "AI automation services for scheduling — let customers self-book meetings, demos, or service slots with automated confirmations, reminders, and rescheduling. Zero back-and-forth.",
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
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    tag: "Workflow",
    title: "Internal Workflow Automation",
    desc: "Our AI automation services auto-generate invoices, send payment reminders, sync Google Sheets, notify Slack channels, and route tasks — eliminating repetitive internal ops forever.",
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
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    tag: "Retention",
    title: "Review & Referral Automation",
    desc: "Automatically request Google reviews after every purchase, trigger referral messages to happy customers, and build your reputation — a complete AI automation service for retention.",
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function AutomationService() {
  const heroRef = useRef(null);
  const titleLine1 = useRef(null);
  const titleLine2 = useRef(null);
  const tagRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardsRef = useRef([]);
  const stepsRef = useRef([]);
  const techRef = useRef([]);
  const pricingRef = useRef([]);
  const sectionsRef = useRef([]);



  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero tag */
      gsap.from(tagRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      /* Title char split */
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

      if (titleLine1.current && titleLine2.current) {
        const chars1 = wrapChars(titleLine1.current);
        const chars2 = wrapChars(titleLine2.current);
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

      /* Automation cards */
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

      /* Process steps */
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

      /* Tech items */
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

      /* Pricing cards */
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

      /* Section headings */
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
        title="AI Automation Services Delhi NCR | WhatsApp Bots & AI Chatbot | AEDREA"
        description="Top-rated AI automation services in Delhi NCR — WhatsApp bots, AI voice calls, lead generation, CRM automation & email drips. Best AI automation services for SMEs. Setup from ₹8,000. Free audit."
        keywords="ai automation services Delhi NCR, WhatsApp automation Delhi NCR, AI chatbot services Delhi NCR, business automation Delhi NCR, lead generation automation Delhi NCR, CRM automation Delhi NCR, voice AI Delhi, Make N8N automation Delhi, ai automation services, ai automation services for small business"
        canonical="https://aedrea.com/services/automation"
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
        <div
          className="pointer-events-none absolute bottom-0 -left-20 w-[250px] h-[250px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,69,0,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Tag */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full text-[white] text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase ]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Automation Services — Delhi NCR
        </div>

        {/* Title */}
        <div
          className="mb-5 sm:mb-6 leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <div
            ref={titleLine1}
            className="text-[clamp(2.2rem,8vw,6rem)] font-extrabold tracking-tight"
          >
            Automate Everything.
          </div>
          <div
            ref={titleLine2}
            className="text-[clamp(2.2rem,8vw,6rem)] font-extrabold tracking-tight"
          >
            <span className="text-[white]">Grow</span> on Autopilot.
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[#888] text-base sm:text-lg leading-relaxed max-w-[580px] mb-8 sm:mb-10"
        >
          Delhi NCR's most trusted{" "}
          <strong className="text-white">AI automation services</strong> — from
          WhatsApp follow-ups to AI voice calls, we build automation systems
          that work 24/7 so your team focuses on closing deals, not chasing
          leads.
        </p>

        {/* Actions */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap"
        >
          <RedirectButton
            to="/contact"
            className="bg-[transparent] hover:bg-[#ff6a33] text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 duration-200 w-full sm:w-auto text-center"
          >
            Get a Free Audit
          </RedirectButton>
          <RedirectButton
            to="/our-works"
            className="bg-transparent border border-[#222] hover:border-[#555] text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-medium transition-colors w-full sm:w-auto text-center"
          >
            See Case Studies
          </RedirectButton>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:flex sm:flex-row sm:gap-12 gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#1a1a1a]"
        >
          {[
            { num: "24/7", label: "Always Running" },
            { num: "10×", label: "More Follow-ups" },
            { num: "72h", label: "Setup Delivery" },
            { num: "₹0", label: "Manual Work" },
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
        style={{ transform: "rotate(-2deg)", margin: "0 -5%", width: "110%" }}
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
          WHAT WE AUTOMATE
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI Automation Services — What We Cover
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Every Channel,
              <br />
              Fully Automated
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            We don't sell tools — we build complete{" "}
            <strong className="text-white">AI automation services</strong>{" "}
            tailored to your business workflows and customer journey in Delhi
            NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {automations.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 sm:p-7 group hover:border-[rgba(255,69,0,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-10 h-10 bg-[rgba(255,69,0,0.12)] rounded-lg flex items-center justify-center text-[white]">
                  {item.icon}
                </div>
                {item.tag && (
                  <span
                    className="text-[white] text-[0.62rem] font-bold tracking-widest uppercase border border-[rgba(255,69,0,0.25)] bg-[rgba(255,69,0,0.07)] px-2 py-0.5 rounded-full"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.tag}
                  </span>
                )}
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
          NEWSPAPER FEATURE SECTION
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 bg-[#0d0d0d] border-y border-[#1a1a1a] overflow-hidden">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Image column */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Decorative glow behind image */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 50%, rgba(255,69,0,0.12) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 rounded-2xl overflow-hidden border border-[#222] shadow-2xl max-w-[480px] w-full">
              <img
                src="/images/girlimage.jpeg"
                alt="AEDREA Digital Studio — Best AI Automation Services in Delhi NCR featured in Digital Times"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 z-20 bg-[white] text-black text-[0.68rem] font-bold tracking-widest px-4 py-2.5 rounded-xl shadow-lg"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ★ DELHI NCR'S #1
              <br />
              AI AUTOMATION AGENCY
            </div>
          </div>

          {/* Content column */}
          <div>
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              As Featured · Digital Times
            </p>
            <h2
              className="text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold leading-tight mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Still Searching for the Best
              <br />
              <span className="text-[white]">AI Automation Services?</span>
              <br />
              You've Found Them.
            </h2>
            <p className="text-[#888] text-sm leading-relaxed mb-5">
              Businesses across Delhi NCR choose AEDREA for professional{" "}
              <strong className="text-white">AI automation services</strong>{" "}
              that actually deliver results — not just dashboards. We build
              systems that generate leads, close follow-ups, and run operations
              around the clock.
            </p>

            {/* Keyword pills — SEO + UX */}
            <div className="flex flex-wrap gap-2 mb-7">
              {[
                "AI Automation Services Delhi NCR",
                "WhatsApp Automation Delhi NCR",
                "AI Chatbot Services Delhi NCR",
                "Lead Generation Automation Delhi NCR",
                "CRM Automation Delhi NCR",
                "Business Automation Delhi NCR",
              ].map((kw) => (
                <span
                  key={kw}
                  className="text-[0.68rem] font-semibold text-[white] border border-[rgba(255,69,0,0.28)] bg-[rgba(255,69,0,0.07)] px-3 py-1 rounded-full"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-4 mb-7 pt-6 border-t border-[#1a1a1a]">
              {[
                { num: "200+", label: "Automations Built" },
                { num: "50+", label: "Delhi NCR Clients" },
                { num: "98%", label: "Client Retention" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-[1.4rem] sm:text-[1.7rem] font-extrabold leading-none text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-[0.72rem] text-[#888] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <RedirectButton
                to="/contact"
                className="bg-[white] hover:bg-[#ff6a33] text-black px-7 py-3.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 duration-200 text-center"
              >
                Book Free Automation Audit
              </RedirectButton>
              <RedirectButton
                href="https://wa.me/917289873340"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-[#222] hover:border-[#555] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-colors text-center"
              >
                WhatsApp Us
              </RedirectButton>
            </div>
          </div>
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
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              How We Deliver AI Automation Services
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Our Process,
              <br />
              No Black Boxes
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Transparent{" "}
            <strong className="text-white">AI automation services</strong> build
            process. You see every flow before it goes live. No surprises, no
            dependency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          {/* Steps */}
          <div>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (stepsRef.current[i] = el)}
                className="flex gap-5 sm:gap-6 py-5 sm:py-6 border-b border-[#1a1a1a] last:border-none group hover:opacity-80 transition-opacity cursor-default"
              >
                <span
                  className="text-[white] text-xs font-bold w-7 flex-shrink-0 pt-0.5"
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
          <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6 sm:p-8 min-h-[300px] sm:min-h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-5 sm:mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[white]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
              </div>
              <p className="text-[#555] text-[0.7rem] tracking-widest mb-5 uppercase">
                Live AI Automation Service Monitor
              </p>

              {[
                {
                  label: "New Lead via Facebook Ad",
                  status: "trigger",
                  dot: "bg-blue-500",
                },
                {
                  label: "WhatsApp Welcome Message Sent",
                  status: "action",
                  dot: "bg-[white]",
                },
                {
                  label: "Lead Qualified by AI Chatbot",
                  status: "action",
                  dot: "bg-[white]",
                },
                {
                  label: "Hot Lead → Notify Sales Rep",
                  status: "action",
                  dot: "bg-green-500",
                },
                {
                  label: "Follow-up Sequence Started",
                  status: "action",
                  dot: "bg-[white]",
                },
              ].map((node, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${node.dot}`}
                  />
                  <div className="flex-1 h-px bg-[#222]" />
                  <span className="text-[#666] text-[0.68rem] leading-tight max-w-[180px] text-right">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[#555] text-[0.7rem] tracking-widest mb-3 uppercase">
                AI Automation Services Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "MAKE",
                  "VAPI.AI",
                  "WATI",
                  "OPENAI",
                  "ZAPIER",
                  "N8N",
                  "PABBLY",
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-[rgba(255,69,0,0.12)] text-[white] text-[0.7rem] font-bold px-2.5 py-1 rounded-full border border-[rgba(255,69,0,0.2)]"
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
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI Automation Services Stack & Deliverables
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Built With
              <br />
              Best-in-Class Tools
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Enterprise-grade{" "}
            <strong className="text-white">AI automation services</strong> — not
            janky Zaps. Proper systems with monitoring, error handling, and
            failsafes for Delhi NCR businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          {/* Tech list */}
          <div className="flex flex-col gap-3">
            {techStack.map((item, i) => (
              <div
                key={i}
                ref={(el) => (techRef.current[i] = el)}
                className="flex items-start sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 bg-[#111] border border-[#1a1a1a] rounded-xl hover:border-[rgba(255,69,0,0.35)] transition-colors"
              >
                <span
                  className="bg-[rgba(255,69,0,0.12)] border border-[rgba(255,69,0,0.2)] text-[white] text-[0.72rem] font-bold px-3 py-1 rounded-md min-w-[80px] sm:min-w-[100px] text-center flex-shrink-0"
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
              What You Receive With Our AI Automation Services
            </h4>
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-[#1a1a1a] last:border-none text-[0.84rem] sm:text-[0.88rem] text-[#888]"
              >
                <div className="w-4 h-4 bg-[rgba(255,69,0,0.12)] border border-[rgba(255,69,0,0.3)] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[white] text-[9px]">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PRICING
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 bg-[#111] border-t border-[#1a1a1a]">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI Automation Services — Investment
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Transparent Pricing,
              <br />
              No Surprises
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Fixed setup cost for our{" "}
            <strong className="text-white">AI automation services</strong>. No
            hourly billing. No scope creep. You know exactly what you pay before
            we start.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={(el) => (pricingRef.current[i] = el)}
              className={`bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 relative transition-colors duration-300
                ${plan.popular ? "border-2 border-[white]" : "border border-[#1a1a1a] hover:border-[#555]"}`}
            >
              {plan.popular && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[white] text-black text-[0.68rem] font-bold tracking-widest px-3 py-1 rounded-full whitespace-nowrap"
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
                <span className="text-[#555] text-base sm:text-lg font-bold">
                  {" "}
                  {plan.priceSuffix}
                </span>
              </p>
              <p className="text-[#555] text-[0.7rem] mb-1">{plan.billing}</p>
              <p className="text-[white] text-[0.72rem] font-bold tracking-wide mb-4 pb-4 border-b border-[#1a1a1a]">
                👉 {plan.timeline}
              </p>
              <ul className="flex flex-col gap-2 sm:gap-2.5 mb-6 sm:mb-8">
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    className="flex gap-2 text-[#888] text-[0.84rem]"
                  >
                    <span className="text-[white]">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
              <RedirectButton
                to="/contact"
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 justify-center text-center
                  ${plan.popular
                    ? "bg-[white] hover:bg-[#ff6a33] text-black border-none"
                    : "bg-transparent text-white border border-[#1a1a1a] hover:border-[#555]"
                  }`}
              >
                {plan.cta}
              </RedirectButton>
            </div>
          ))}
        </div>

        {/* Retainer note */}
        <div className="mt-10 sm:mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p
                className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Ongoing AI Automation Services Retainer
              </p>
              <h3
                className="text-base sm:text-lg font-bold mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Want us to manage & grow your AI automation services monthly?
              </h3>
              <p className="text-[#555] text-sm">
                Monitoring, new flow builds, optimisation, and priority support
                — starting at{" "}
                <span className="text-white font-semibold">₹5,000 / month</span>
                .
              </p>
            </div>
            <RedirectButton
              to="/contact"
              className="bg-transparent border border-[rgba(255,69,0,0.4)] hover:border-[white] text-[white] px-6 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
            >
              Ask About Retainer →
            </RedirectButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA BANNER
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
      `}</style>
    </div>
  );
}