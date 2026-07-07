import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useHeroAnimation
 * ─────────────────────────────────────────────────────────────
 * Drop-in hook that drives the hero intro sequence.
 *
 * Smoothness fixes vs. the old inline approach:
 *   1. Double-rAF gate — waits for browser to finish layout+paint
 *      before any animation starts (eliminates first-frame jitter)
 *   2. gsap.context() — scoped to section ref, safe cleanup for
 *      React StrictMode double-fire
 *   3. force3D: true on every transform — keeps everything on the
 *      GPU compositor thread
 *   4. will-change applied BEFORE animation, released AFTER
 *   5. All DOM queries cached upfront (no layout thrashing)
 *   6. Arrow drawn with strokeDashoffset (no premium plugin needed)
 */
export function useHeroAnimation(sectionRef, start) {
  const tlRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const section = sectionRef.current;
    if (!section) return;

    let rafId1 = null;
    let rafId2 = null;
    let ctx = null;
    let floatTween = null;

    // Double-rAF: wait for browser to complete layout + composite
    // before touching any animation — this is the key jitter fix.
    rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        // ── Cache all DOM references upfront ──────────────────
        const wordSelectors = [
          ".w-we", ".w-turn", ".w-great", ".w-ideas",
          ".w-into", ".w-brands", ".w-people", ".w-remember",
        ];
        const wordEls = {};
        wordSelectors.forEach((sel) => {
          wordEls[sel] = section.querySelector(sel);
        });

        const heroArt = section.querySelector(".hero-art");
        const arrowStroke = section.querySelector(".hero-arrow__stroke");
        const arrowHead = section.querySelector(".hero-arrow__head");
        const heroArrow = section.querySelector(".hero-arrow");
        const avatars = section.querySelectorAll(".hero-avatar");
        const avatar1 = section.querySelector(".hero-avatar:nth-child(1)");
        const avatarsRest = section.querySelectorAll(".hero-avatar:not(:nth-child(1))");
        const heroReel = section.querySelector(".hero-reel");
        const reelMorph = document.querySelector(".reel-morph"); // outside section

        // ── Pre-promote to GPU layer ─────────────────────────
        const promote = [
          ...Object.values(wordEls).filter(Boolean),
          ...avatars,
          heroReel,
        ].filter(Boolean);
        promote.forEach((el) => {
          el.style.willChange = "transform, opacity";
        });

        // ── GSAP Context (scoped to section) ─────────────────
        ctx = gsap.context(() => {
          // ── Build master timeline ──────────────────────────
          const tl = gsap.timeline({
            onComplete: () => {
              // Release GPU layers after animation — frees VRAM
              promote.forEach((el) => {
                el.style.willChange = "auto";
              });
            },
          });
          tl.timeScale(1.15);
          tlRef.current = tl;

          // ── Reveal helper (same choreography as original) ──
          const reveal = (selector, startOffset, { duration = 1.9, from = "below" } = {}) => {
            const el = wordEls[selector];
            if (!el) return;
            const inner = el.querySelector("g") || el;
            const dir = from === "above" ? -1 : 1;

            tl.set(el, { autoAlpha: 1 }, startOffset);

            if (el.tagName.toLowerCase() === "svg") {
              const viewBox = el.getAttribute("viewBox") || "0 0 0 100";
              const [, , , h] = viewBox.split(/\s+/).map(parseFloat);
              const offset = h * 1.1;
              tl.fromTo(
                inner,
                { y: dir * offset, transformOrigin: "50% 50%" },
                { y: 0, duration, ease: "power4.out", force3D: true },
                startOffset
              );
            } else {
              tl.fromTo(
                inner,
                { yPercent: dir * 110 },
                { yPercent: 0, duration, ease: "power4.out", force3D: true },
                startOffset
              );
            }
          };

          // ── Set initial state ──────────────────────────────
          gsap.set(Object.values(wordEls).filter(Boolean), { autoAlpha: 0 });
          gsap.set(avatars, { scale: 0, autoAlpha: 0 });

          // Arrow setup
          if (arrowStroke) {
            let len;
            try { len = arrowStroke.getTotalLength(); } catch { len = 300; }
            gsap.set(arrowStroke, { strokeDasharray: len, strokeDashoffset: len });
          }
          if (arrowHead) gsap.set(arrowHead, { scale: 0 });

          // ═══════════════════════════════════════════════════
          // ROW 1: "We" + avatars + "turn" / "great"
          // ═══════════════════════════════════════════════════
          reveal(".w-we", 0);

          const screenW = heroArt?.clientWidth || 1200;
          const stepUnit = screenW / 100;
          const turnOffsetLeft = -20 * stepUnit;
          const turnOffsetMid = -10 * stepUnit;

          const turnGreatEls = [wordEls[".w-turn"], wordEls[".w-great"]].filter(Boolean);
          gsap.set(turnGreatEls, { x: turnOffsetLeft, force3D: true });
          reveal(".w-turn", 0.0483);
          reveal(".w-great", 0.0966);

          // Avatar 1
          if (avatar1) {
            tl.fromTo(
              avatar1,
              { scale: 0, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.2)", force3D: true },
              0.35
            );
          }
          if (turnGreatEls.length) {
            tl.to(
              turnGreatEls,
              { x: turnOffsetMid, duration: 0.6, ease: "power4.out", force3D: true },
              0.35
            );
          }

          // Remaining avatars
          if (avatarsRest.length) {
            tl.fromTo(
              avatarsRest,
              { scale: 0, xPercent: -72, autoAlpha: 0 },
              {
                scale: 1, xPercent: 0, autoAlpha: 1,
                duration: 0.7, stagger: 0.12, ease: "expo.out", force3D: true,
              },
              0.82
            );
          }
          if (turnGreatEls.length) {
            tl.to(
              turnGreatEls,
              { x: 0, duration: 0.9, ease: "power4.out", force3D: true },
              0.82
            );
          }

          // ═══════════════════════════════════════════════════
          // ROW 2: "ideas" / "into" / "brands" + arrow
          // ═══════════════════════════════════════════════════
          reveal(".w-ideas", 0, { from: "above" });
          reveal(".w-into", 0.0483, { from: "above" });
          if (wordEls[".w-brands"]) gsap.set(wordEls[".w-brands"], { xPercent: -58, force3D: true });
          reveal(".w-brands", 0.0966, { from: "above" });

          // Arrow draw
          const arrowStart = 0.75;
          const arrowDur = 0.95;
          if (heroArrow) tl.set(heroArrow, { autoAlpha: 1 }, arrowStart - 0.02);
          if (wordEls[".w-brands"]) {
            tl.to(
              wordEls[".w-brands"],
              { xPercent: 0, duration: arrowDur, ease: "power4.out", force3D: true },
              arrowStart
            );
          }
          if (arrowStroke) {
            tl.to(
              arrowStroke,
              { strokeDashoffset: 0, duration: arrowDur, ease: "power4.out" },
              arrowStart
            );
          }
          if (arrowHead) {
            tl.to(
              arrowHead,
              { scale: 1, duration: 0.42, ease: "back.out(3)" },
              ">-0.05"
            );
          }

          // ═══════════════════════════════════════════════════
          // ROW 3: "people" / reel / "remember"
          // ═══════════════════════════════════════════════════
          const isDesktop = window.matchMedia(
            "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
          ).matches;

          if (isDesktop) {
            if (wordEls[".w-people"]) gsap.set(wordEls[".w-people"], { xPercent: 30, force3D: true });
            if (wordEls[".w-remember"]) gsap.set(wordEls[".w-remember"], { xPercent: -20, force3D: true });
            if (heroReel) gsap.set(heroReel, { scale: 0 });

            reveal(".w-people", 0, { duration: 1.15 });
            reveal(".w-remember", 0.0483, { duration: 1.15 });

            if (reelMorph) {
              tl.to(reelMorph, { opacity: 1, duration: 0.4, ease: "power4.out" }, 0.65);
            }
            if (heroReel) {
              tl.to(heroReel, { scale: 1, duration: 1.1, ease: "back.out(1.6)", force3D: true }, 0.95);
            }
            if (wordEls[".w-people"]) {
              tl.to(wordEls[".w-people"], { xPercent: 0, duration: 1.1, ease: "power4.out", force3D: true }, 0.95);
            }
            if (wordEls[".w-remember"]) {
              tl.to(wordEls[".w-remember"], { xPercent: 0, duration: 1.1, ease: "power4.out", force3D: true }, 0.95);
            }
          } else {
            reveal(".w-people", 0, { duration: 1.15 });
            reveal(".w-remember", 0.0483, { duration: 1.15 });
          }

          // ═══════════════════════════════════════════════════
          // Floating avatars idle loop
          // ═══════════════════════════════════════════════════
          if (avatars.length) {
            tl.add(() => {
              floatTween = gsap.to(avatars, {
                yPercent: -6,
                duration: 2.4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                force3D: true,
                stagger: { each: 0.18, yoyo: true, repeat: -1 },
              });
            });
          }
        }, section); // scope to section element
      });
    });

    return () => {
      if (rafId1) cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
      if (floatTween) floatTween.kill();
      if (ctx) ctx.revert(); // kills all context tweens, removes inline styles
    };
  }, [sectionRef, start]);

  // Expose timeline ref if parent needs to pause/seek
  return tlRef;
}