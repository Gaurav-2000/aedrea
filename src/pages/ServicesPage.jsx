import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import RedirectButton from "@/components/RedirectButton";
import { whyPoints, marqueeItems } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: "01",
    slug: "web-design",
    category: "Web",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect
          x="4"
          y="8"
          width="40"
          height="28"
          rx="3"
          stroke="#FF2A00"
          strokeWidth="2.5"
        />
        <path
          d="M16 36l-4 6h24l-4-6"
          stroke="#FF2A00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M14 20l6 5-6 5"
          stroke="#FF2A00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 28h8"
          stroke="#FF2A00"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Web Design & Development",
    tags: ["Custom Websites", "Modern UI", "Performance Builds"],
    description:
      "Custom websites built for speed, clarity, and conversion. From corporate portals to product showcases — every pixel is intentional, every interaction smooth.",
    bullets: [
      "React / Next.js / Vite — production-grade stack",
      "Mobile-first, responsive across all screen sizes",
      "GSAP animations & smooth scroll (Lenis)",
      "SEO-optimized structure & Core Web Vitals focused",
    ],
    cta: "See Projects →",
    // ← ADD your media here
    media: "/images/WebsitePicture.jpg",
    mediaType: "image",
  },
  {
    id: "02",
    category: "AI",
    slug: "seo-services",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#FF2A00" strokeWidth="2.5" />
        <path
          d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8"
          stroke="#FF2A00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill="#FF2A00" />
        <path
          d="M24 6v4M24 38v4M6 24h4M38 24h4"
          stroke="#FF2A00"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "AI SEO Services",
    tags: ["GPT-4 Powered", "24/7 Lead Capture", "Multilingual"],
    description:
      "Train a custom AI on your business — products, FAQs, pricing. It answers visitors instantly, captures leads, and never sleeps. Hindi + English support.",
    bullets: [
      "OpenAI GPT-4 fine-tuned on your business data",
      "Embedded on your website in 48 hours",
      "Lead capture + CRM integration",
      "Hindi / Hinglish / English support",
    ],
    cta: "Book a Demo →",
    media: "/images/SEOImage.webp",
    mediaType: "image",
  },
  {
    id: "03",
    slug: "ai-automation",
    category: "Automation",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect
          x="6"
          y="10"
          width="22"
          height="32"
          rx="3"
          stroke="#FF2A00"
          strokeWidth="2.5"
        />
        <path
          d="M28 18h10a3 3 0 013 3v14a3 3 0 01-3 3H28"
          stroke="#FF2A00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="17" cy="38" r="2" fill="#FF2A00" />
        <path
          d="M13 16h8M13 21h8M13 26h5"
          stroke="#FF2A00"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Automate Everything with AI",
    tags: ["WATI + OpenAI", "Auto-Reply", "Broadcast"],
    description:
      "Turn your WhatsApp Business number into an AI sales rep. Auto-reply to inquiries, qualify leads, send catalogues — all on autopilot via WATI + OpenAI.",
    bullets: [
      "WATI integration + OpenAI backend",
      "Smart auto-replies in Hindi/English",
      "Product catalogue automation",
      "Lead qualification & follow-up flows",
    ],
    cta: "Get Started →",
    media: "/images/Automation.png",
    mediaType: "image",
  },
];

// At the top of your component or in a utils file
function useIsMobile() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

// ─── CURSOR PREVIEW COMPONENT ─────────────────────────────────────────────────
// Floating card that follows the mouse and shows service media

function CursorPreview({ activeService, visible }) {
  const previewRef = useRef(null);
  const videoRefs = useRef({});
  const rafRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  // ── Smooth lerp follow
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.1);
      if (previewRef.current) {
        // offset: right + slightly above cursor
        previewRef.current.style.transform = `translate(${pos.current.x + 24}px, ${pos.current.y - 170}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // ── Show / hide
  useEffect(() => {
    if (isMobile || !previewRef.current) return;
    gsap.to(previewRef.current, {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.88,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [visible, isMobile]);

  // ── Wipe reveal + video switch on service change
  useEffect(() => {
    if (isMobile || !activeService || !previewRef.current) return;

    // Play the active video, pause others
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      if (!vid) return;
      if (id === activeService.id) {
        vid.currentTime = 0;
        vid.play().catch(() => { });
      } else {
        vid.pause();
      }
    });

    // Clip-path wipe animation on switch
    gsap.fromTo(
      previewRef.current,
      { clipPath: "inset(0 100% 0 0 round 14px)" },
      {
        clipPath: "inset(0 0% 0 0 round 14px)",
        duration: 0.45,
        ease: "power3.out",
      },
    );
  }, [activeService, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={previewRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "260px",
        height: "260px",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
        background: "#0a0a0a",
      }}
    >
      {/* All service media stacked — only active one visible */}
      {services.map((svc) => (
        <div
          key={svc.id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: activeService?.id === svc.id ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          {svc.mediaType === "video" ? (
            <video
              ref={(el) => (videoRefs.current[svc.id] = el)}
              src={svc.media}
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={svc.media}
              alt={svc.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      ))}

      {/* Bottom label */}
      {activeService && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "6px",
            padding: "3px 10px",
            color: "white",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {activeService.id} — {activeService.category}
        </div>
      )}

      {/* Orange corner accent */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#f97316",
        }}
      />
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const whyRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const servicesListRef = useRef(null); // ← NEW: ref on the services list wrapper
  const navigate = useNavigate();

  // ── Cursor state
  const [activeService, setActiveService] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  // ── Hide system cursor only over the services list
  useEffect(() => {
    const el = servicesListRef.current;
    if (!el) return;
    const show = () => (document.body.style.cursor = "none");
    const hide = () => (document.body.style.cursor = "");
    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
    return () => {
      el.removeEventListener("mouseenter", show);
      el.removeEventListener("mouseleave", hide);
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero heading letter reveal
      if (heroRef.current) {
        const letters = heroRef.current.querySelectorAll(".hero-letter");
        gsap.fromTo(
          letters,
          { y: 120, opacity: 0 },
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

      // ── Marquee continuous scroll
      if (marqueeRef.current) {
        const totalWidth = marqueeRef.current.scrollWidth / 2;
        gsap.to(marqueeRef.current, {
          x: -totalWidth,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }

      // ── Why section fade
      if (whyRef.current) {
        gsap.fromTo(
          whyRef.current.querySelectorAll(".why-item"),
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: whyRef.current, start: "top 75%" },
          },
        );
      }

      // ── Service rows staggered reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });

      // ── Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true,
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // ── Row hover handlers
  const handleRowEnter = (svc) => {
    setActiveService(svc);
    setCursorVisible(true);
  };
  const handleRowLeave = () => {
    setCursorVisible(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      <SEO
        title="AI Websites, WhatsApp Automation & Chatbot Services Delhi NCR | AEDREA"
        description="AEDREA builds websites, WhatsApp bots, voice AI receptionists & chatbots for Delhi NCR manufacturers and SMEs. Plans starting ₹15,000. Call +91-7289873340."
        keywords="AI website Delhi NCR, WhatsApp automation Delhi, chatbot service Delhi NCR, voice AI receptionist Delhi, web design manufacturer Delhi, AI automation Nangloi Bawana Mundka, website development SME Delhi"
        canonical="https://aedrea.com/services"
        image="https://aedrea.com/images/logos/favicon.png"
      />

      {/* Cursor preview — rendered at root level so it's above everything */}
      <CursorPreview activeService={activeService} visible={cursorVisible} />

      {/* ── HERO HEADING ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="overflow-hidden">
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-none tracking-tighter flex flex-wrap">
            {"OUR  SERVICES".split("").map((ch, i) => (
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
          Creative websites, clear branding, and practical AI systems — built
          for businesses that want stronger operations, better trust, and
          long-term digital growth.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <a
            href="#services-grid"
            className="px-8 py-3 rounded-full bg-transparent hover:bg-white text-white hover:!text-black font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Explore Services
          </a>
          <RedirectButton
            to="/contact"
            className="px-8 py-3 rounded-full border border-white/20 hover:!text-black text-white/70  font-semibold text-sm tracking-wider transition-all duration-300"
          >
            AI Support
          </RedirectButton>
        </div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────────────── */}
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

      {/* ── WHY WORK WITH US ─────────────────────────────────────────────── */}
      <section ref={whyRef} className="px-6 md:px-12 lg:px-20 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              Why AEDREA
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Why Work
              <br />
              <span className="text-white/30">With Us</span>
            </h2>
          </div>
          <div className="space-y-6">
            {whyPoints.map((pt) => (
              <div
                key={pt.num}
                className="why-item flex gap-5 items-start group"
                style={{ opacity: 0 }}
              >
                <span className="text-orange-300 font-mono text-xs mt-1 shrink-0">
                  {pt.num}
                </span>
                <div className="border-t border-white/10 pt-4 flex-1 group-hover:border-orange-500/40 transition-colors duration-300">
                  <p className="text-white/70 text-base leading-relaxed">
                    {pt.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ─────────────────────────────────────────────────── */}
      <section id="services-grid" className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="mb-16">
          <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Primary Services
          </h2>
        </div>

        {/* ── Big-Type Row List — cursor zone starts here */}
        <div ref={servicesListRef} className="border-t border-white/[0.08]">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ opacity: 0 }}
              onClick={() => svc.slug && navigate(`/services/${svc.slug}`)}
              onMouseEnter={() => handleRowEnter(svc)} // ← NEW
              onMouseLeave={handleRowLeave} // ← NEW
              className={`
                group border-b border-white/[0.08]
                grid grid-cols-[1fr_auto] items-end gap-6
                py-8 md:py-10
                transition-colors duration-300
                hover:border-orange-500/30
                ${svc.slug ? "cursor-none" : "cursor-default"}
              `}
            >
              {/* LEFT — eyebrow + big title + tags */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-3 font-medium">
                  {svc.id} — {svc.category}
                </p>

                <h3
                  className="
                    font-black uppercase leading-none tracking-tight
                    text-[clamp(2.2rem,5.5vw,4.5rem)]
                    text-white/[0.30]
                    group-hover:text-white
                    transition-colors duration-300
                  "
                >
                  {svc.title}
                </h3>

                <div
                  className="
                    flex flex-wrap gap-2 mt-5
                    opacity-0 translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300
                  "
                >
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        text-[9px] font-semibold tracking-[0.12em] uppercase
                        text-orange-300 border border-orange-500/30
                        px-2.5 py-1
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT — number + arrow */}
              <div className="flex flex-col items-end gap-4 pb-1 self-end">
                <span className="text-[10px] tracking-[0.1em] text-white/20 font-mono group-hover:text-orange-300 transition-colors duration-300">
                  {svc.id}
                </span>
                <div
                  className="
                    w-10 h-10 border border-white/[0.12]
                    flex items-center justify-center
                    text-white/20 text-sm
                    group-hover:border-orange-500/50 group-hover:text-orange-300
                    transition-all duration-300
                    group-hover:rotate-[-45deg]
                  "
                  style={{ transition: "all 0.3s ease" }}
                >
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
