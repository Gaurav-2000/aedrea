// src/pages/ContactPage.jsx
// ✅ React + Tailwind + GSAP ScrollTrigger
// ✅ Lenis already in App.jsx — not reinitialised here
// ✅ Add to App.jsx: <Route path="/contact" element={<ContactPage />} />

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import Footer from "@/sections/Footer";
import SEO from "@/components/SEO";
import RedirectButton from "@/components/RedirectButton";
import { services, infoCards, faqs, marqueeItems } from "@/constants";

// ── Images served from /public folder
// Place both files directly in your project's /public/ folder:
//   public/aedreastudio13.png
//   public/contact-screenshot.png
const memeImg = "/images/aedreastudio13.webp";

gsap.registerPlugin(ScrollTrigger);

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FaqItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  const answerRef = useRef(null);

  useEffect(() => {
    if (answerRef.current) {
      gsap.to(answerRef.current, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [open]);

  return (
    <div
      className={`border-b border-white/8 transition-colors duration-300 ${open ? "border-orange-300/20" : ""}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <div className="flex items-start gap-4">
          <span className="text-orange-300/50 font-mono text-xs mt-1 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/80 text-base font-medium group-hover:text-white transition-colors duration-300">
            {q}
          </span>
        </div>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all duration-300 mt-0.5
            ${open
              ? "border-orange-300 text-orange-300 rotate-45"
              : "border-white/20 text-white/40 group-hover:border-orange-300/40"
            }`}
        >
          +
        </span>
      </button>
      <div
        ref={answerRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <p className="text-white/50 text-sm leading-relaxed pb-6 pl-9">{a}</p>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef([]);
  const faqRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(false);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };


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
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          },
        );
      }

      // ── Hero sub items
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-sub"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
            toggleActions: "play none none reset",
          },
        },
      );

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

      // ── Form fields
      gsap.fromTo(
        formRef.current?.querySelectorAll(".form-field"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        },
      );

      // ── Info cards
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });

      // ── FAQ
      gsap.fromTo(
        faqRef.current?.querySelectorAll(".faq-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 80%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      <SEO
        title="Contact AEDREA | Hire Web Agency Delhi NCR | Get Free Quote"
        description="Contact AEDREA Digital Studio — Delhi NCR's AI web agency. Get a free quote for AI websites, WhatsApp chatbots & automation. Call +91-7289873340 or +91-8527722329."
        keywords="contact AEDREA Delhi, hire web agency Delhi NCR, web design quote Delhi NCR, AI website price Delhi, WhatsApp chatbot quote Delhi, free website quote Delhi, automation service Delhi NCR"
        canonical="https://aedrea.com/contact"
        image="https://aedrea.com/images/logos/favicon.png"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          {/* ── LEFT: Text Content ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <p
              className="hero-sub text-orange-300 text-xs tracking-[0.3em] uppercase mb-6 font-semibold"
              style={{ opacity: 0 }}
            >
              Get In Touch
            </p>

            <div className="overflow-hidden">
              <h1 className="text-[clamp(2.8rem,8vw,9rem)] font-black uppercase leading-none tracking-tighter flex flex-wrap">
                {"CONTACT US".split("").map((ch, i) => (
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

            <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-3xl">
              <p
                className="hero-sub text-white/55 text-lg leading-relaxed"
                style={{ opacity: 0 }}
              >
                Let's talk and build something meaningful. Whether it's a
                professional website or an AI system, the right solution starts
                with a clear conversation.
              </p>
              <p
                className="hero-sub text-white/35 text-sm leading-relaxed"
                style={{ opacity: 0 }}
              >
                Built for manufacturers, B2B companies, and growing businesses —
                clear strategy, practical solutions, and results that matter.
              </p>
            </div>

            <div
              className="hero-sub mt-10 flex flex-wrap gap-4"
              style={{ opacity: 0 }}
            >
              <RedirectButton
                href="https://wa.me/917289873340"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-white"
              >
                WhatsApp Now
              </RedirectButton>
              <a
                href="#contact-form"
                className="px-8 py-3 rounded-full border border-white/20 hover:bg-white text-white/70 hover:text-black font-semibold text-sm tracking-wider transition-all duration-300"
              >
                Send a Message →
              </a>
            </div>
          </div>

          {/* ── RIGHT: Images ──────────────────────────────────────────── */}
          <div
            className="hero-sub mt-10 lg:mt-0 lg:w-[320px] xl:w-[380px] shrink-0 flex flex-col gap-4"
            style={{ opacity: 0 }}
          >
            {/* Meme / Ad Image */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-300/10 hover:border-orange-300/60 hover:shadow-orange-300/30 transition-all duration-500 group cursor-pointer"
              style={{ transform: "perspective(800px)" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
                e.currentTarget.style.transition =
                  "transform 0.5s ease, border-color 0.5s, box-shadow 0.5s";
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transition =
                  "transform 0.1s ease, border-color 0.5s, box-shadow 0.5s";
              }}
            >
              {/* Orange glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-300/0 via-orange-300/0 to-orange-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none rounded-2xl" />

              {/* Shine sweep on hover */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute -inset-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-700 ease-in-out" />
              </div>

              <img
                src={memeImg}
                alt="Bhgwan Ka Diya Hua Sab Kuchh Hai - Bus Website Nahi Hai"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />

              {/* Bottom orange tag that slides up on hover */}
              <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-30">
                <div className="bg-orange-300 text-black text-xs font-bold tracking-widest uppercase text-center py-2.5">
                  Aa Jao — Bana Denge ✦
                </div>
              </div>
            </div>
          </div>
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
                <span className="ml-12 text-orange-300">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM + INFO ───────────────────────────────────────────────────── */}
      <section id="contact-form" className="px-6 md:px-12 lg:px-20 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT: Form ───────────────────────────────────────────────── */}
          <div ref={formRef}>
            <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-3 font-semibold">
              Send a Message
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Tell Us About
              <br />
              <span className="text-white/25">Your Project</span>
            </h2>

            {sent ? (
              <div className="rounded-2xl border border-orange-300/30 bg-orange-300/5 p-10 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-orange-400 font-bold text-xl mb-2">
                  Message Sent!
                </p>
                <p className="text-white/50 text-sm">
                  Hum 2 ghante mein reply karenge. WhatsApp pe bhi reach kar
                  sakte ho.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form space-y-5">
                {submitError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-center text-sm text-red-400">
                    Something went wrong, please try again or message us on{" "}
                    <a
                      href="https://wa.me/917289873340"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-orange-400 font-semibold hover:text-orange-300"
                    >
                      WhatsApp
                    </a>.
                  </div>
                )}
                {/* Name + Email */}
                <div
                  className="form-field grid sm:grid-cols-2 gap-4"
                  style={{ opacity: 0 }}
                >
                  <div>
                    <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-300/50 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-300/50 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div
                  className="form-field grid sm:grid-cols-2 gap-4"
                  style={{ opacity: 0 }}
                >
                  <div>
                    <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">
                      Phone no.
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-300/50 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white/70 text-sm focus:outline-none focus:border-orange-300/50 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-black">
                        Select service...
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-black">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-field" style={{ opacity: 0 }}>
                  <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project — your needs, budget, and timeline. Clear conversations build better solutions."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-orange-300/50 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="form-field" style={{ opacity: 0 }}>
                  <RedirectButton
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-white hover:bg-white disabled:bg-orange-300/50 text-black hover:text-black font-bold text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </RedirectButton>
                  <p className="text-white/20 text-xs text-center mt-3">
                    Or connect with us on WhatsApp for a faster response.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── RIGHT: Info cards ─────────────────────────────────────────── */}
          <div className="space-y-4 lg:pt-24">
            {infoCards.map((card, i) => (
              <div
                key={card.label}
                ref={(el) => (cardsRef.current[i] = el)}
                style={{ opacity: 0 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-orange-300/30 hover:bg-white/[0.04] transition-all duration-400"
              >
                {card.href ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <span className="w-11 h-11 rounded-xl bg-orange-300/10 border border-orange-300/20 flex items-center justify-center text-lg shrink-0 group-hover:bg-orange-300/20 transition-colors duration-300">
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-white/30 text-xs tracking-wider uppercase mb-0.5">
                        {card.label}
                      </p>
                      <p className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors duration-300">
                        {card.value}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">{card.sub}</p>
                    </div>
                    <span className="ml-auto text-white/20 group-hover:text-orange-300 transition-colors duration-300 text-lg">
                      →
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="w-11 h-11 rounded-xl bg-orange-300/10 border border-orange-300/20 flex items-center justify-center text-lg shrink-0">
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-white/30 text-xs tracking-wider uppercase mb-0.5">
                        {card.label}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {card.value}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                )}
                <div className="h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        ref={faqRef}
        className="px-6 md:px-12 lg:px-20 py-24 border-t border-white/5"
      >
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-orange-300 text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Common
              <br />
              <span className="text-white/25">Questions</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mt-6 max-w-xs">
              If you have any questions not listed here, feel free to contact us
              directly on WhatsApp — we usually respond within a few hours.
            </p>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" style={{ opacity: 0 }}>
                <FaqItem q={faq.q} a={faq.a} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
