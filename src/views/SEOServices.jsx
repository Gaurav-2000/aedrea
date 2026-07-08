import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import {
  SeoSteps,
  SeoTechStack,
  SeoPlans,
  marqueeItems,
  SeoDeliverables,
} from "@/constants";
import RedirectButton from "@/components/RedirectButton";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const seoServices = [
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
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    tag: "Foundation",
    title: "Technical SEO Audit",
    desc: "Deep crawl of your website — Core Web Vitals, crawlability, indexation issues, broken links, duplicate content, and schema errors. Full report with priority fixes. The bedrock of every effective AI SEO Services engagement.",
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
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    tag: "On-Page",
    title: "On-Page SEO Optimization",
    desc: "Title tags, meta descriptions, heading hierarchy, keyword placement, internal linking, image alt texts, and URL structure — optimized page by page for maximum ranking potential.",
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
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    tag: "Off-Page",
    title: "Off-Page SEO & Link Building",
    desc: "High-DA backlinks from relevant Indian and global sites, guest posting, digital PR, and competitor link gap analysis — build domain authority that compounds. Our AI SEO Services use AI-powered prospecting to find link opportunities your competitors miss.",
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
    tag: "Local SEO",
    title: "Local SEO & Google Business",
    desc: "Our AI SEO Services Delhi NCR specialization helps businesses dominate 'near me' searches across Delhi, Noida, and Gurugram. Google Business Profile optimization, local citations, NAP consistency, and review generation — built for Delhi NCR markets.",
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
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    tag: "AI-Powered",
    title: "AI SEO Services — Content Strategy",
    desc: "Our AI SEO Services combine machine-learning keyword research with human editorial judgment — producing content clusters, pillar pages, and blog strategies built around real search intent. AI SEO Services that rank and convert, not just fill pages.",
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
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    tag: "E-commerce",
    title: "E-commerce SEO",
    desc: "Product page optimization, category structure, schema markup for products & reviews, breadcrumb SEO, and faceted navigation fixes for Shopify, WooCommerce, and custom stores.",
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
    tag: "Analytics",
    title: "SEO Reporting & Tracking",
    desc: "Monthly rank tracking reports, organic traffic analysis, CTR optimization, keyword gap reports, and competitor movement — full transparency that sets our AI SEO Services apart from every agency that hides behind vanity metrics.",
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
    tag: "Content",
    title: "SEO Content Writing",
    desc: "Keyword-targeted blog posts, landing page copy, service pages, and FAQs — written to rank on Google and convert real visitors into paying customers.",
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
    tag: "Mobile",
    title: "Mobile SEO & Core Web Vitals",
    desc: "Speed optimizations, LCP, CLS, FID fixes, mobile usability improvements, and AMP setup — because Google ranks mobile-first and so should you.",
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function SEOService() {
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
      gsap.from(tagRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

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
        title="AI SEO Services Delhi NCR | Rank on Page 1 | AEDREA Digital Studio"
        description="AI SEO Services for Delhi NCR businesses — technical SEO, local SEO, link building & content powered by AI. Plans from ₹8,000/month. Get a free AI SEO audit today."
        keywords="AI SEO Services Delhi NCR, AI SEO Services Delhi, AI SEO agency Delhi NCR, local SEO Delhi NCR, technical SEO agency Delhi, AI SEO Services Noida, AI SEO Services Gurugram, Google ranking Delhi NCR"
        canonical="https://aedrea.com/services/seo-services"
        image="https://aedrea.com/images/logos/favicon.png"
      />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 pt-16 sm:pt-20 lg:pt-25 pb-14 sm:pb-16 lg:pb-20 relative overflow-hidden">
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
        {/* [KW-1] AI SEO Services — page identifier tag */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full text-[white] text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase   ]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          AI SEO Services
        </div>

        {/* Title */}
        <div
          className="mb-5 sm:mb-6 leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <div
            ref={titleLine1}
            className="text-[clamp(2.4rem,8vw,6rem)] font-extrabold tracking-tight"
          >
            Rank Higher.
          </div>
          <div
            ref={titleLine2}
            className="text-[clamp(2.4rem,8vw,6rem)] font-extrabold tracking-tight"
          >
            Get Found. <span className="text-[white]">Grow.</span>
          </div>
        </div>

        {/* Subtitle */}
        {/* [KW-2] AI SEO Services + [LOC-1] Delhi NCR */}
        <p
          ref={subtitleRef}
          className="text-[#888] text-base sm:text-lg leading-relaxed max-w-[580px] mb-8 sm:mb-10"
        >
          The leading AI SEO Services for Delhi NCR businesses — on-page,
          off-page, technical, and local SEO powered by AI. We get your business
          to Page 1 of Google and keep it there, month after month.
        </p>

        {/* Actions */}
        {/* [KW-3] AI SEO Services — primary CTA button */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap"
        >
          <RedirectButton
            to="/contact"
            className="bg-[transparent]  text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 duration-200 w-full sm:w-auto text-center"
          >
            Get Free Audit
          </RedirectButton>
          <RedirectButton
            to="/seo-checker"
            className="bg-transparent border border-[#222]  hover:border-[#555] text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-bold transition-colors w-full sm:w-auto text-center"
          >
            Check SEO Results
          </RedirectButton>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:flex sm:flex-row sm:gap-12 gap-6 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#1a1a1a]"
        >
          {[
            { num: "3–6", label: "Months to Rank" },
            { num: "4×", label: "Avg. Traffic Growth" },
            { num: "100+", label: "Keywords Tracked" },
            { num: "₹0", label: "Paid Ads Needed" },
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
          SEO SERVICES GRID
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            {/* [KW-4] AI SEO Services — section label */}
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              What Our AI SEO Services Cover
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Full-Spectrum AI SEO,
              {/* [KW-5] AI SEO — heading */}
              <br />
              Nothing Left Out
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            We don't do cookie-cutter AI SEO Services. Every strategy is built
            {/* [KW-6] AI SEO Services — section description */}
            around your industry, competitors, and search intent — not a
            template.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {seoServices.map((item, i) => (
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
          PROCESS
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20 bg-[#111] border-y border-[#1a1a1a]">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            {/* [KW-7] AI SEO Services — process label */}
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              How Our AI SEO Services Work
            </p>
            {/* [KW-8] AI SEO Services — process heading */}
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Our AI SEO Services Process,
              <br />
              Month by Month
            </h2>
          </div>
          {/* [KW-9] AI SEO Services + [LOC-2] Delhi NCR — process description */}
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Our AI SEO Services Delhi NCR clients typically see measurable
            keyword movement in 60–90 days, with compounding organic growth from
            month 4 onwards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          {/* Steps */}
          <div>
            {SeoSteps.map((step, i) => (
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

          {/* Visual panel — SEO health mockup */}
          <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-5 sm:mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-[white]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
              </div>
              {/* [KW-10] AI SEO Services — dashboard label */}
              <p className="text-[#555] text-[0.7rem] tracking-widest mb-4 uppercase">
                AI SEO Services — Health Dashboard
              </p>

              {[
                { label: "Domain Authority", w: "62%", val: "62/100" },
                { label: "Core Web Vitals (LCP)", w: "88%", val: "Good" },
                { label: "Keyword Rankings (Top 10)", w: "74%", val: "37 kws" },
                {
                  label: "Backlink Profile Quality",
                  w: "55%",
                  val: "Improving",
                },
                { label: "Page Indexation Rate", w: "93%", val: "93%" },
              ].map((bar) => (
                <div key={bar.label} className="mb-3 sm:mb-4">
                  <div className="flex justify-between mb-1.5">
                    <p className="text-[#555] text-[0.7rem]">{bar.label}</p>
                    <p className="text-[white] text-[0.7rem] font-bold">
                      {bar.val}
                    </p>
                  </div>
                  <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[white] rounded-full transition-all"
                      style={{ width: bar.w }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[#555] text-[0.7rem] tracking-widest mb-3 uppercase mt-4">
                SEO Tool Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "AHREFS",
                  "SEMRUSH",
                  "GSC",
                  "GA4",
                  "SURFER",
                  "SCREAMINGFROG",
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
            {/* [KW-11] AI SEO Services — stack section label */}
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI SEO Services — Stack & Deliverables
            </p>
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Pro Tools,
              <br />
              Real Results
            </h2>
          </div>
          {/* [KW-12] AI SEO Services — stack description */}
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Our AI SEO Services are powered by the same tools used by the
            world's top agencies — Ahrefs, Semrush, Surfer — so every ranking
            decision is driven by real data, not guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          {/* Tech list */}
          <div className="flex flex-col gap-3">
            {SeoTechStack.map((item, i) => (
              <div
                key={i}
                ref={(el) => (techRef.current[i] = el)}
                className="flex items-start sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 bg-[#111] border border-[#1a1a1a] rounded-xl hover:border-[rgba(255,69,0,0.35)] transition-colors"
              >
                <span
                  className="bg-[rgba(255,69,0,0.12)] border border-[rgba(255,69,0,0.2)] text-[white] text-[0.68rem] font-bold px-3 py-1 rounded-md min-w-[90px] sm:min-w-[120px] text-center flex-shrink-0"
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
            {/* [KW-13] AI SEO Services — deliverables heading */}
            <h4
              className="font-bold text-base sm:text-lg mb-5 sm:mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              What You Receive with Our AI SEO Services Every Month
            </h4>
            {SeoDeliverables.map((item, i) => (
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
            {/* [KW-14] AI SEO Services — pricing label */}
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI SEO Services — Investment
            </p>
            {/* [KW-15] AI SEO Services — pricing heading */}
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              AI SEO Services Plans,
              <br />
              No Lock-ins
            </h2>
          </div>
          {/* [KW-16] AI SEO Services + [LOC-3] Delhi NCR — pricing description */}
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Our AI SEO Services Delhi NCR packages run month-to-month. Cancel
            anytime. We earn your trust every month — not through lock-in
            clauses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {SeoPlans.map((plan, i) => (
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
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all duration-200
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

        {/* One-time audit note */}
        <div className="mt-10 sm:mt-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p
                className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                One-Time Option
              </p>
              {/* [KW-17] AI SEO Services — one-time audit heading */}
              <h3
                className="text-base sm:text-lg font-bold mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Need AI SEO Services as a one-time deep audit + action plan?
              </h3>
              {/* [KW-18] AI SEO Services + [LOC-4] Delhi — one-time audit desc */}
              <p className="text-[#555] text-sm">
                Full technical AI SEO Services audit for Delhi businesses —
                keyword research, on-page recommendations, and a 90-day roadmap
                — one-time at{" "}
                <span className="text-white font-semibold">
                  ₹5,000 – ₹12,000
                </span>
                .
              </p>
            </div>
            <RedirectButton
              to="/contact"
              className="bg-transparent border border-[rgba(255,69,0,0.4)] hover:border-[white] text-[white] px-6 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
            >
              Get AI SEO Audit Only →{/* [KW-19] AI SEO — audit button */}
            </RedirectButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY SEO OVER ADS — QUICK COMPARISON
      ══════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-16 py-14 sm:py-16 lg:py-20">
        <div
          ref={(el) => sectionsRef.current.push(el)}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 mb-10 sm:mb-12"
        >
          <div>
            {/* [KW-20] AI SEO Services — comparison label */}
            <p
              className="text-[white] text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Why AI SEO Services Beat Paid Ads
            </p>
            {/* [KW-21] AI SEO Services — comparison heading */}
            <h2
              className="text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Why AI SEO Services Are
              <br />
              the Smarter Long-Term Bet
            </h2>
          </div>
          <p className="text-[#888] text-sm leading-relaxed sm:max-w-xs">
            Ads stop the moment you stop paying. AI SEO Services compound.
            {/* [KW-22] AI SEO Services — comparison description */}
            Every month your rankings get stronger and your cost-per-visitor
            drops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* SEO column */}
          <div className="bg-[#111] border border-[rgba(255,69,0,0.3)] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[rgba(255,69,0,0.15)] rounded-lg flex items-center justify-center text-[white] text-lg">
                ✦
              </div>
              {/* [KW-23] AI SEO Services — column heading */}
              <h3
                className="font-bold text-base"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                AI SEO Services (Organic)
              </h3>
            </div>
            {[
              "Traffic keeps growing after you invest in AI SEO Services",
              "Clicks are 100% free — no cost per click",
              "Builds long-term brand authority in your niche",
              "Compounds — AI SEO Services results improve every month",
              "Trusted more by users than paid ads",
            ].map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2.5 border-b border-[#1a1a1a] last:border-none text-[0.84rem] text-[#888]"
              >
                <span className="text-[white] mt-0.5 flex-shrink-0">▸</span>
                {pt}
              </div>
            ))}
          </div>

          {/* Ads column */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#444] text-lg">
                ✕
              </div>
              <h3
                className="font-bold text-base text-[#555]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Paid Ads
              </h3>
            </div>
            {[
              "Traffic stops the moment budget runs out",
              "Every click costs money — forever",
              "No lasting brand authority built",
              "Ad fatigue — costs rise over time",
              "Users often skip ads, prefer organic results",
            ].map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2.5 border-b border-[#1a1a1a] last:border-none text-[0.84rem] text-[#555]"
              >
                <span className="text-[#333] mt-0.5 flex-shrink-0">▸</span>
                {pt}
              </div>
            ))}
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