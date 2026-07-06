import { useEffect, useRef, useState, useCallback } from "react";

const CHILDREN = [
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/react/61DAFB",
    bg: "#e8f9ff",
    name: "React.js",
    tag: "Frontend UI",
    cost: "open",
    costLabel: "Open Source",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/n8n/EA4B71",
    text: "n8n Automation",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/openai/000000",
    bg: "#f0f0f0",
    name: "OpenAI API",
    tag: "AI Engine",
    cost: "usage",
    costLabel: "Pay-per-use",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/vite/646CFF",
    text: "Vite Bundler",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    bg: "#e8fbff",
    name: "Tailwind CSS",
    tag: "Styling",
    cost: "open",
    costLabel: "Open Source",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/whatsapp/25D366",
    text: "WhatsApp AI",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/threedotjs/000000",
    bg: "#f5f5f5",
    name: "Three.js",
    tag: "3D / WebGL",
    cost: "open",
    costLabel: "Open Source",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/framer/0055FF",
    text: "Framer Motion",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/vercel/000000",
    bg: "#f5f5f5",
    name: "Vercel",
    tag: "Deployment",
    cost: "free",
    costLabel: "Free Tier",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/nodedotjs/339933",
    text: "Node.js + Express",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/claude/D97757",
    bg: "#fdf0e8",
    name: "Claude AI",
    tag: "AI Assistant",
    cost: "usage",
    costLabel: "API Usage",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/greensock/88CE02",
    text: "GSAP Animation",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/figma/F24E1E",
    bg: "#fff0ee",
    name: "Figma",
    tag: "Design",
    cost: "free",
    costLabel: "Free Tier",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/googleanalytics/E37400",
    text: "Google Analytics",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/make/6D00CC",
    bg: "#f5eeff",
    name: "Make.com",
    tag: "Automation",
    cost: "paid",
    costLabel: "₹1,500/mo",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/reactnative/61DAFB",
    text: "React Native",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/vapi/000000",
    bg: "#f5f5f5",
    name: "Vapi.ai",
    tag: "Voice AI",
    cost: "usage",
    costLabel: "Pay-per-use",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/googlegemini/8E75B2",
    text: "Gemini API",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/supabase/3ECF8E",
    bg: "#edfdf5",
    name: "Supabase",
    tag: "Database",
    cost: "free",
    costLabel: "Free Tier",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/wordpress/21759B",
    text: "WordPress CMS",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/langchain/1C3C3C",
    bg: "#f0f5f5",
    name: "LangChain",
    tag: "AI Orchestration",
    cost: "open",
    costLabel: "Open Source",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/mongodb/47A248",
    text: "MongoDB",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/googlesearchconsole/458CF5",
    bg: "#eef3ff",
    name: "Search Console",
    tag: "SEO",
    cost: "free",
    costLabel: "Free",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/adobephotoshop/31A8FF",
    text: "Photoshop",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/stripe/635BFF",
    bg: "#f0eeff",
    name: "Stripe",
    tag: "Payments",
    cost: "usage",
    costLabel: "2% per txn",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/railway/0B0D0E",
    text: "Railway Deploy",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/github/181717",
    bg: "#f5f5f5",
    name: "GitHub",
    tag: "Version Control",
    cost: "free",
    costLabel: "Free Tier",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/zapier/FF4A00",
    text: "Zapier Flows",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/elevenlabs/000000",
    bg: "#f5f5f5",
    name: "ElevenLabs",
    tag: "Voice Synthesis",
    cost: "usage",
    costLabel: "Pay-per-use",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/airtable/18BFFF",
    text: "Airtable CRM",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/notion/000000",
    bg: "#f5f5f5",
    name: "Notion",
    tag: "Docs & CMS",
    cost: "free",
    costLabel: "Free Tier",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/wati/25D366",
    text: "WATI WhatsApp",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
    bg: "#eef5ff",
    name: "TypeScript",
    tag: "Language",
    cost: "open",
    costLabel: "Open Source",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/prisma/2D3748",
    text: "Prisma ORM",
  },
  {
    type: "card",
    logo: "https://cdn.simpleicons.org/nextdotjs/000000",
    bg: "#f5f5f5",
    name: "Next.js",
    tag: "SSR Framework",
    cost: "open",
    costLabel: "Open Source",
  },
  {
    type: "pill",
    logo: "https://cdn.simpleicons.org/cloudflare/F38020",
    text: "Cloudflare CDN",
  },
];

function costClass(cost) {
  return (
    {
      free: "cost-free",
      paid: "cost-paid",
      open: "cost-open",
      usage: "cost-usage",
    }[cost] || "cost-open"
  );
}

function buildChild(def, wrapper) {
  if (def.type === "card") {
    wrapper.className = "trail-item";
    const card = document.createElement("div");
    card.className = "trail-card";
    const cc = costClass(def.cost);
    card.innerHTML = `
      <div class="trail-card-header" style="background:${def.bg}">
        <img src="${def.logo}" alt="${def.name}" loading="lazy" onerror="this.style.display='none'"/>
      </div>
      <div class="trail-card-body">
        <div class="trail-card-name">${def.name}</div>
        <div class="trail-card-tag">${def.tag}</div>
        <span class="trail-card-cost ${cc}">${def.costLabel}</span>
      </div>`;
    wrapper.appendChild(card);
  } else {
    wrapper.className = "trail-item";
    const pill = document.createElement("div");
    pill.className = "trail-pill";
    pill.innerHTML = `<img src="${def.logo}" alt="" loading="lazy" onerror="this.style.display='none'"/><span class="trail-pill-text">${def.text}</span>`;
    wrapper.appendChild(pill);
  }
}

const ROTATION_RANGE = 14;
const INTERVAL = 105;

export default function TechStack() {
  const containerRef = useRef(null);
  const layerRef = useRef(null);
  const currentIndex = useRef(0);
  const lastAddedTime = useRef(0);
  const zCounter = useRef(10);
  const prevPos = useRef({ x: -1, y: -1 });
  const pointer = useRef({ x: 0, y: 0 });
  const [hintHidden, setHintHidden] = useState(false);
  const rafRef = useRef(null);
  // keep a stable ref to hintHidden for use inside touch handlers
  const hintHiddenRef = useRef(false);

  const addToTrail = useCallback((pos) => {
    const layer = layerRef.current;
    if (!layer) return;
    const def = CHILDREN[currentIndex.current];
    currentIndex.current = (currentIndex.current + 1) % CHILDREN.length;
    const rotation = (Math.random() - 0.5) * ROTATION_RANGE * 2;
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `position:absolute;left:${pos.x}px;top:${pos.y}px;z-index:${++zCounter.current};transform:translate(-50%,-50%) rotate(${rotation}deg) scale(0);pointer-events:none;transform-origin:center center;will-change:transform;`;
    buildChild(def, wrapper);
    layer.appendChild(wrapper);

    const a1 = wrapper.animate(
      [
        { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(0)` },
        { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(1.1)` },
      ],
      {
        duration: 120,
        easing: "cubic-bezier(0,0.55,0.45,1)",
        fill: "forwards",
      },
    );

    a1.onfinish = () => {
      const a2 = wrapper.animate(
        [
          {
            transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(1.1)`,
          },
          { transform: `translate(-50%,-50%) rotate(${rotation}deg) scale(0)` },
        ],
        {
          duration: 600,
          easing: "cubic-bezier(0.55,0,1,0.45)",
          fill: "forwards",
        },
      );
      a2.onfinish = () => wrapper.remove();
    };
  }, []);

  useEffect(() => {
    function loop(time) {
      const p = pointer.current;
      const prev = prevPos.current;
      if (p.x !== prev.x || p.y !== prev.y) {
        prevPos.current = { ...p };
        if (time - lastAddedTime.current >= INTERVAL) {
          lastAddedTime.current = time;
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            if (p.x >= 0 && p.x <= rect.width && p.y >= 0 && p.y <= rect.height) {
              addToTrail({ x: p.x, y: p.y });
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const el = containerRef.current;
    if (!el) return;

    // ── Non-passive touch handlers ──────────────────────────
    const handleTouchStart = (e) => {
      e.preventDefault();
      if (!hintHiddenRef.current) {
        hintHiddenRef.current = true;
        setHintHidden(true);
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const t = e.touches[0];
      pointer.current = {
        x: t.clientX - rect.left,
        y: t.clientY - rect.top,
      };
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [addToTrail]);

  return (
    <>
      <style>{`
        .trail-card { background:#fff; border-radius:16px; overflow:hidden; width:148px; box-shadow:0 10px 32px rgba(0,0,0,0.14),0 2px 8px rgba(0,0,0,0.06); font-family:'DM Sans',sans-serif; }
        .trail-card-header { width:100%; height:76px; display:flex; align-items:center; justify-content:center; }
        .trail-card-header img { width:44px; height:44px; object-fit:contain; }
        .trail-card-body { padding:10px 12px 12px; border-top:1px solid #f0f0f0; }
        .trail-card-name { font-size:0.74rem; font-weight:700; color:#111; }
        .trail-card-tag { font-size:0.58rem; font-weight:600; color:#999; text-transform:uppercase; letter-spacing:1px; margin-top:2px; }
        .trail-card-cost { display:inline-block; margin-top:6px; font-size:0.58rem; font-weight:700; padding:2px 8px; border-radius:20px; text-transform:uppercase; }
        .cost-free { background:#d1fae5; color:#065f46; }
        .cost-paid { background:#fee2e2; color:#991b1b; }
        .cost-open { background:#e0f2fe; color:#0369a1; }
        .cost-usage { background:#fef3c7; color:#92400e; }
        .trail-pill { background:#fff; border-radius:50px; padding:9px 18px; display:flex; align-items:center; gap:8px; box-shadow:0 6px 20px rgba(0,0,0,0.11); white-space:nowrap; }
        .trail-pill img { width:18px; height:18px; object-fit:contain; }
        .trail-pill-text { font-size:0.72rem; font-weight:700; color:#111; letter-spacing:0.4px; }
        .hint-dot { width:5px; height:5px; border-radius:50%; background:#e07a3a; animation:blink 1.4s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
      `}</style>

      <section
        style={{
          background: "white",
          position: "relative",
          overflow: "hidden",
          padding: 0,
          minHeight: "540px",
          display: "flex",
          alignItems: "center",
          // ✅ removed touchAction from here
        }}
      >
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "80px 6% 90px",
            minHeight: "540px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "none", // ✅ scoped here on the actual interaction element
          }}
          onMouseMove={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            pointer.current = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            };
            if (!hintHidden) {
              hintHiddenRef.current = true;
              setHintHidden(true);
            }
          }}
          // ✅ onTouchStart and onTouchMove removed from JSX — handled in useEffect
        >
          <div
            ref={layerRef}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          {/* Hint */}
          <div
            style={{
              position: "absolute",
              bottom: "1.8rem",
              left: "6%",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "black",
              zIndex: 10,
              pointerEvents: "none",
              opacity: hintHidden ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          >
            <span className="hint-dot" />
            Move cursor to explore
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(3.8rem,12vw,10.5rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              color: "black",
              opacity: 0.88,
              userSelect: "none",
              position: "relative",
              textTransform: "uppercase",
              zIndex: 1,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(0.65rem,1.6vw,0.9rem)",
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "#e07a3a",
                marginBottom: "1.1rem",
              }}
            >
              Our Core
            </span>
            Tech Stack
          </div>
        </div>
      </section>
    </>
  );
}
