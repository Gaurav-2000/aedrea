import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TEXT =
  "We don't just build you a website. We build you an AI-powered business system — one that brings in leads while you sleep, responds to customers when you're busy, creates your content automatically, and gives you data to make smarter decisions. We're not a vendor. We're your AI team.";

const WORD_STAGGER_EACH = 0.15; // unchanged — controls word-to-word pacing

const AnimatedText = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioReady = useRef(false);
  const sectionVisible = useRef(false);

  // Audio + IntersectionObserver
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const unlockAudio = () => {
      if (audioCtxRef.current) return;
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const silentBuffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(ctx.destination);
      source.start(0);
      fetch("/images/clickmusic.wav")
        .then((res) => res.arrayBuffer())
        .then((buf) => ctx.decodeAudioData(buf))
        .then((decoded) => {
          audioBufferRef.current = decoded;
          audioReady.current = true;
        })
        .catch(() => { });
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("wheel", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("wheel", unlockAudio);
    window.addEventListener("click", unlockAudio);

    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("wheel", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
        audioReady.current = false;
        audioBufferRef.current = null;
      }
    };
  }, []);

  // Animation
  useLayoutEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    let lastLitIndex = -1;
    let splitInstance = null;
    let ctx = null;
    let rafId = null;
    let cancelled = false;

    const playClick = () => {
      if (
        !audioReady.current ||
        !audioCtxRef.current ||
        !sectionVisible.current
      )
        return;
      audioCtxRef.current.resume().then(() => {
        try {
          const source = audioCtxRef.current.createBufferSource();
          source.buffer = audioBufferRef.current;
          source.connect(audioCtxRef.current.destination);
          source.start(0);
        } catch { /* ignore audio play failures */ }
      });
    };

    // Defer SplitText to next frame so React's DOM paint is complete
    rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        // Nested split: gives us split.words (for position/motion)
        // AND split.chars (for the letter-by-letter color sweep)
        splitInstance = new SplitText(textRef.current, {
          type: "words, chars",
          wordsClass: "word",
          charsClass: "char",
        });

        gsap.set(splitInstance.chars, { color: "#343a40" });

        // Total time it takes the word stagger to "fire" all words —
        // we spread the char color sweep across this exact same window
        // so the overall pacing reads identically, just letter-smooth.
        const wordSpread = (splitInstance.words.length - 1) * WORD_STAGGER_EACH;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top-=90 top",
            end: "+=10000",
            scrub: 3,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress <= 0) return;
              const litCount = Math.floor(self.progress * splitInstance.chars.length);
              if (litCount !== lastLitIndex) {
                playClick();
                lastLitIndex = litCount;
              }
            },
          },
        });

        // Word motion — unchanged pacing
        tl.to(
          splitInstance.words,
          {
            y: 0,
            ease: "power2.out",
            stagger: WORD_STAGGER_EACH,
          },
          0,
        );

        // Letter-by-letter color sweep, synced to the same total duration
        tl.to(
          splitInstance.chars,
          {
            color: "white",
            ease: "power2.out",
            stagger: { amount: wordSpread },
          },
          0,
        );
      }, sectionRef);

      // Production-safe refresh
      if (document.readyState === "complete") {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      } else {
        window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      }
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      ctx?.revert();
      splitInstance?.revert();
    };
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        className="flex items-center justify-start mt-8 mb-0 px-[2%] md:mt-8 md:px-[2%]"
      >
        <h2
          ref={textRef}
          className="font-['Syne',sans-serif] leading-[1.2] text-[clamp(32px,5vw,64px)] md:leading-[1.2] text-[35px] md:text-[clamp(32px,5vw,64px)]"
        >
          {TEXT}
        </h2>
      </section>
    </div>
  );
};

export default AnimatedText;