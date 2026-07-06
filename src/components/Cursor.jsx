

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SIZE_DEFAULT = 12;
const SIZE_HOVER = 80;

export default function Cursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;

    document.body.style.cursor = "none";

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.1,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.1,
      ease: "power2.out",
    });

    function getLabel(target) {
      const tagged = target.closest("[data-label]");
      if (tagged) return tagged.dataset.label;

      if (target.closest('a, [role="link"]')) return "OPEN";
      if (target.closest('button, [role="button"]')) return "CLICK";
      if (target.closest("video")) return "PLAY";
      if (target.closest("img, picture, figure")) return "VIEW";
      if (target.closest("h1,h2,h3,h4,h5,p,li,span")) return "READ";

      return null;
    }

    function expand(labelText) {
      label.textContent = labelText;
      gsap.to(cursor, {
        width: SIZE_HOVER,
        height: SIZE_HOVER,
        background: "rgba(255, 255, 255, 0.12)",
        duration: 0.4,
        ease: "power3.out",
      });
    }

    function contract() {
      label.textContent = "";
      gsap.to(cursor, {
        width: SIZE_DEFAULT,
        height: SIZE_DEFAULT,
        background: "rgba(255, 255, 255, 0.25)",
        duration: 0.4,
        ease: "power3.out",
      });
    }

    function onMouseMove(e) {
      xTo(e.clientX - SIZE_DEFAULT / 2);
      yTo(e.clientY - SIZE_DEFAULT / 2);
    }

    function onMouseOver(e) {
      const labelText = getLabel(e.target);
      if (labelText) expand(labelText);
      else contract();
    }

    function onMouseLeave() {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    }

    function onMouseEnter() {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE_DEFAULT,
        height: SIZE_DEFAULT,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.08)",
        pointerEvents: "none",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
      }}
    >
      <span
        ref={labelRef}
        style={{
          color: "rgba(255,255,255,0.9)",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.9px",
          whiteSpace: "nowrap",
          userSelect: "none",
          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}
