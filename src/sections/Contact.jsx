import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import RedirectButton from "@/components/RedirectButton";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content fade in
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".contact-left-item"),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        },
      );

      // Vertical divider line draw
      gsap.fromTo(
        sectionRef.current?.querySelector(".v-line"),
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        },
      );

      // Right items stagger
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".contact-right-item"),
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reset",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        {/* ── TitleHeader — unchanged ──────────────────────────────────── */}
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />

        {/* ── Split Line Layout ─────────────────────────────────────────── */}
        <div
          ref={sectionRef}
          className="mt-16 flex flex-col md:flex-row items-stretch gap-0"
        >
          {/* ── LEFT: Main CTA ───────────────────────────────────────────── */}
          <div className="flex-1 pr-0 md:pr-12 flex flex-col justify-center gap-6 pb-10 md:pb-0">
            {/* Tag */}
            <p
              className="contact-left-item text-orange-300 text-xs tracking-[0.3em] uppercase font-semibold"
              style={{ opacity: 0 }}
            >
              Start a Conversation
            </p>

            {/* Big text */}
            <div className="contact-left-item" style={{ opacity: 0 }}>
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight text-white">
                Any Idea ?
              </h3>
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight text-white/20">
                Talk to us
              </h3>
            </div>

            {/* Sub line */}
            <p
              className="contact-left-item text-white/40 text-sm leading-relaxed max-w-xs"
              style={{ opacity: 0 }}
            >
              <strong>Whether it’s a website or an AI system — one conversation brings
              complete clarity. No commitment, just clear direction.</strong>
            </p>

            {/* Buttons */}
            <div
              className="contact-left-item flex flex-wrap gap-3"
              style={{ opacity: 0 }}
            >
              <RedirectButton
                href="https://wa.me/917289873340"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black"
              >
                WhatsApp Now
              </RedirectButton>
              <RedirectButton
                to="/contact"
                className="bg-white text-black"
              >
                Full Contact Form
              </RedirectButton>
            </div>
          </div>

          {/* ── VERTICAL DIVIDER LINE ─────────────────────────────────────── */}
          <div className="hidden md:flex flex-col items-center px-2">
            <div
              className="v-line w-px flex-1 min-h-[160px]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, white, transparent)",
                opacity: 0,
              }}
            />
          </div>

          {/* ── Horizontal line for mobile ───────────────────────────────── */}
          <div
            className="block md:hidden w-full h-px my-8"
            style={{
              background:
                "linear-gradient(to right, transparent, white, transparent)",
            }}
          />

          {/* ── RIGHT: Info stack ─────────────────────────────────────────── */}
          <div className="flex-1 pl-0 md:pl-12 flex flex-col justify-center gap-5">
            {/* Email */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@aedrea.com&su=Project%20Discussion&body=Hi%20Aedrea%20Team,%0A%0AProject:%0ABudget:%0ATimeline:"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-right-item group flex items-center gap-4 border-b border-white/8 pb-5 hover:text-white transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <span className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-base shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                ✉️
              </span>
              <div className="flex-1">
                <p className="text-white/25 text-[12px] tracking-[0.15em] uppercase mb-0.5">
                  Email
                </p>
                <p className="text-white/70 group-hover:text-white transition-colors duration-300">
                  support@aedrea.com
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/917289873340"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-right-item group flex items-center gap-4 border-b border-white/8 pb-5 hover:text-white transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <span className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-base shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                💬
              </span>
              <div className="flex-1">
                <p className="text-white/25 text-[12px] tracking-[0.15em] uppercase mb-0.5">
                  WhatsApp
                </p>
                <p className="text-white/70 group-hover:text-white transition-colors duration-300">
                  +91 7289873340 or click to chat
                </p>
              </div>
            </a>

            {/* Location + Response */}
            <div
              className="contact-right-item group flex items-center gap-4"
              style={{ opacity: 0 }}
            >
              <span className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-base shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                📍
              </span>
              <div>
                <p className="text-white/25 text-[12px] tracking-[0.15em] uppercase mb-0.5">
                  Location
                </p>
                <p className="text-white/80 group-hover:text-white transition-colors duration-300">Pitampura, New Delhi</p>
                <p className="text-white/25 text-[12px] mt-0.5">
                  Reply within 2 hours · Mon–Sat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
