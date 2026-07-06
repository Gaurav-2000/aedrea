import { useState, useEffect, useRef } from "react";
import Footer from "@/sections/Footer";
import {
  Globe,
  Zap,
  Monitor,
  Smartphone,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Activity,
  Shield,
  Eye,
  TrendingUp,
  BarChart3,
  Download,
  Copy,
  Lock,
  Unlock,
  Target,
  Gauge,
  Search,
  FileSearch,
  BarChart2,
  Cpu,
  Link,
  Star,
  Clock,
  Users,
  ChevronRight,
  Info,
  BookOpen,
  Layers,
} from "lucide-react";
import SEO from "@/components/SEO";
import WavePath from "@/components/Elastic";

// ─── Brand tokens ──────────────────────────────────────────────────────────
const C = {
  bg: "#000",
  orange: "#ee9445ff",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
};

const glass = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 10px 40px rgba(0,0,0,0.5)",
};

// ─── Utils ─────────────────────────────────────────────────────────────────
const scoreColor = (s) => (s >= 90 ? C.green : s >= 50 ? C.amber : C.red);
const scoreLabel = (s) => (s >= 90 ? "Good" : s >= 50 ? "Needs Work" : "Poor");
const getScore = (r) => Math.round((r || 0) * 100);
const stripMd = (s = "") =>
  s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 200);
const getDomain = (u) => {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
};
const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
const fmtMs = (ms) =>
  ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${Math.round(ms)}ms`;

const scoreDesc = (cat, s) => {
  if (cat === "Performance")
    return s >= 90
      ? "Excellent load speed — great for rankings."
      : s >= 50
        ? "Moderate speed — some optimizations needed."
        : "Slow — likely hurting your Google rankings.";
  if (cat === "SEO")
    return s >= 90
      ? "Follows most Google SEO best practices."
      : s >= 50
        ? "Some SEO fundamentals are missing."
        : "Critical SEO issues — indexing may be affected.";
  if (cat === "Accessibility")
    return s >= 90
      ? "Content is accessible to all visitors."
      : s >= 50
        ? "Some accessibility barriers detected."
        : "Significant accessibility issues found.";
  return s >= 90
    ? "Follows modern web best practices."
    : s >= 50
      ? "Some best practices need attention."
      : "Multiple best-practice violations found.";
};

// ─── Animation Hooks & Components ──────────────────────────────────────────

function Reveal(props) {
  const {
    children,
    delay = 0,
    y = 22,
    duration = 0.65,
    style,
    className,
    as: Tag = "div",
    ...rest
  } = props;
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.07 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function StaggerGrid({
  children,
  stagger = 75,
  y = 18,
  duration = 0.55,
  style,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const items = Array.isArray(children)
    ? children.flat().filter(Boolean)
    : children
      ? [children]
      : [];

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : `translateY(${y}px)`,
            transition: `opacity ${duration}s cubic-bezier(.22,1,.36,1) ${i * stagger}ms, transform ${duration}s cubic-bezier(.22,1,.36,1) ${i * stagger}ms`,
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

function useCountUp(target, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start || !target) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

// ─── Shared useReveal hook (used by new sections) ──────────────────────────
function useReveal(threshold = 0.07) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ─── Shared AnimBar (used by new sections) ────────────────────────────────
function AnimBar({ pct, color, delay = 0 }) {
  const [ref, vis] = useReveal(0.05);
  return (
    <div
      ref={ref}
      style={{
        height: 4,
        background: "rgba(255,255,255,0.05)",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          height: "100%",
          width: vis ? `${Math.min(pct, 100)}%` : "0%",
          background: color,
          borderRadius: 2,
          transition: `width 1.3s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        }}
      />
    </div>
  );
}

// ─── Tooltip (used by new sections) ──────────────────────────────────────
function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <AlertTriangle size={12} color="#444" style={{ cursor: "help" }} />
      {show && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 11,
            color: "#888",
            zIndex: 99,
            maxWidth: 220,
            whiteSpace: "normal",
            lineHeight: 1.5,
            boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

// ─── Animated Circle Score ──────────────────────────────────────────────────
function CircleScore({ score, label }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [v, setV] = useState(0);
  const r = 52,
    circ = 2 * Math.PI * r;
  const col = scoreColor(v);
  const offset = circ - (v / 100) * circ;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!vis || !score) return;
    let cur = 0;
    const step = score / 55;
    const t = setInterval(() => {
      cur = Math.min(cur + step, score);
      setV(Math.round(cur));
      if (cur >= score) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [score, vis]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        padding: "28px 16px",
        borderRadius: 20,
        ...glass,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px) scale(0.96)",
        transition:
          "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s",
        willChange: "opacity, transform",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = col + "55";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${col}25, 0 10px 40px rgba(0,0,0,.6)`;
        e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = glass.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <div style={{ position: "relative", width: 130, height: 130 }}>
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke="#181818"
            strokeWidth="10"
          />
          <circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke={col}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform="rotate(-90 65 65)"
            style={{ transition: "stroke-dashoffset .06s linear, stroke .4s" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {v}
          </span>
          <span
            style={{ fontSize: 11, color: col, marginTop: 4, fontWeight: 600 }}
          >
            {score > 0 ? scoreLabel(v) : "—"}
          </span>
        </div>
      </div>
      <span
        style={{
          color: "#aaa",
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          textAlign: "center",
        }}
      >
        {label}
      </span>
      {score > 0 && (
        <p
          style={{
            color: "#444",
            fontSize: 11,
            lineHeight: 1.5,
            textAlign: "center",
            margin: 0,
            maxWidth: 140,
          }}
        >
          {scoreDesc(label, v)}
        </p>
      )}
    </div>
  );
}

function VBadge({ score }) {
  const col = score >= 0.9 ? C.green : score >= 0.5 ? C.amber : C.red;
  return (
    <span
      style={{
        background: col + "22",
        color: col,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 40,
        border: `1px solid ${col}44`,
        whiteSpace: "nowrap",
      }}
    >
      {score >= 0.9 ? "Good" : score >= 0.5 ? "Average" : "Poor"}
    </span>
  );
}

function MetricCard({ audit, description }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!audit) return null;
  const score = audit.score ?? 1;
  const col = scoreColor(Math.round(score * 100));

  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        ...glass,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(16px)",
        transition:
          "opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1), box-shadow .3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${col}35, 0 10px 40px rgba(0,0,0,.6)`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = glass.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <span style={{ color: "#999", fontSize: 13, fontWeight: 500 }}>
          {audit.title}
        </span>
        <VBadge score={score} />
      </div>
      <div
        style={{ color: "#fff", fontSize: 26, fontWeight: 900, lineHeight: 1 }}
      >
        {audit.displayValue || "—"}
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            height: "100%",
            width: vis ? `${Math.round(score * 100)}%` : "0%",
            background: col,
            borderRadius: 2,
            transition: "width 1.3s cubic-bezier(.4,0,.2,1) 200ms",
          }}
        />
      </div>
      <p style={{ color: "#555", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

function OppCard({ audit }) {
  const [open, setOpen] = useState(false);
  if (!audit || audit.score === null || audit.score >= 0.9) return null;
  const col = audit.score >= 0.5 ? C.amber : C.red;
  const savings = audit.details?.overallSavingsMs
    ? `~${Math.round(audit.details.overallSavingsMs)}ms`
    : audit.displayValue || null;
  const items = audit.details?.items?.slice(0, 4) || [];
  return (
    <div
      style={{
        ...glass,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 8,
        transition: "border-color .2s, transform .2s, box-shadow .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: col,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#e0e0e0", fontSize: 14, fontWeight: 500 }}>
            {audit.title}
          </span>
          {savings && (
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                background: C.orange + "18",
                padding: "2px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              {savings}
            </span>
          )}
        </div>
        {open ? (
          <ChevronUp size={15} color="#444" />
        ) : (
          <ChevronDown size={15} color="#444" />
        )}
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height .4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div
          style={{
            padding: "0 20px 18px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {audit.description && (
            <p
              style={{
                color: "#777",
                fontSize: 13,
                lineHeight: 1.7,
                margin: "12px 0 14px",
              }}
            >
              {stripMd(audit.description)}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: items.length ? 14 : 0,
            }}
          >
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 4,
                background: col + "18",
                color: col,
                fontWeight: 600,
              }}
            >
              {audit.score < 0.5 ? "High Impact" : "Medium Impact"}
            </span>
            {savings && (
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 4,
                  background: C.orange + "18",
                  color: C.orange,
                  fontWeight: 600,
                }}
              >
                ⚡ Save {savings}
              </span>
            )}
          </div>
          {items.length > 0 && (
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 12px",
                    borderBottom:
                      i < items.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                    fontSize: 12,
                    color: "#555",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {item.url || item.label || item.source || "Resource"}
                  </span>
                  {item.wastedBytes && (
                    <span style={{ color: C.amber, flexShrink: 0 }}>
                      {Math.round(item.wastedBytes / 1024)}KB
                    </span>
                  )}
                  {item.wastedMs && (
                    <span style={{ color: C.amber, flexShrink: 0 }}>
                      {Math.round(item.wastedMs)}ms
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SEORow({ pass, title, desc }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        alignItems: "flex-start",
        transition: "background .2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ flexShrink: 0, paddingTop: 1 }}>
        {pass === true ? (
          <CheckCircle size={16} color={C.green} />
        ) : pass === false ? (
          <XCircle size={16} color={C.red} />
        ) : (
          <AlertTriangle size={16} color={C.amber} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#ddd", fontSize: 14, fontWeight: 500 }}>
          {title}
        </div>
        {desc && (
          <div
            style={{
              color: "#555",
              fontSize: 12,
              marginTop: 3,
              lineHeight: 1.5,
            }}
          >
            {desc}
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          padding: "2px 9px",
          borderRadius: 4,
          flexShrink: 0,
          background:
            pass === true
              ? C.green + "18"
              : pass === false
                ? C.red + "18"
                : C.amber + "18",
          color: pass === true ? C.green : pass === false ? C.red : C.amber,
        }}
      >
        {pass === true ? "Pass" : pass === false ? "Fail" : "Warn"}
      </span>
    </div>
  );
}

function AICard({ rec, index }) {
  const priorities = ["Critical", "High", "Medium", "Suggested", "Tip"];
  const colors = [C.red, C.orange, C.amber, "#60a5fa", "#a78bfa"];
  const impacts = ["Very High", "High", "Medium", "Low", "Minimal"];
  const difficulties = ["Easy", "Easy", "Medium", "Medium", "Hard"];
  const speeds = ["25–40%", "15–30%", "10–20%", "5–15%", "1–10%"];
  const p = Math.min(index, 4);
  return (
    <div
      style={{
        padding: "20px",
        ...glass,
        borderLeft: `3px solid ${colors[p]}`,
        borderRadius: "0 14px 14px 0",
        marginBottom: 10,
        transition: "transform .2s, box-shadow .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(5px)";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${colors[p]}28, 0 10px 40px rgba(0,0,0,.6)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = glass.boxShadow;
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            background: colors[p] + "22",
            color: colors[p],
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 4,
            textTransform: "uppercase",
            letterSpacing: ".06em",
          }}
        >
          {priorities[p]}
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "#888",
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 4,
          }}
        >
          SEO Impact: {impacts[p]}
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.05)",
            color: C.green,
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 4,
          }}
        >
          ⚡ Speed +{speeds[p]}
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "#888",
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 4,
          }}
        >
          {difficulties[p]}
        </span>
      </div>
      <p style={{ color: "#d0d0d0", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
        {typeof rec === "string" ? rec : rec.text || rec}
      </p>
    </div>
  );
}

function SecHead({ id, icon, title, subtitle }) {
  return (
    <Reveal id={id} style={{ marginBottom: 20, scrollMarginTop: 80 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {icon && <span style={{ color: C.orange }}>{icon}</span>}
        <h2
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-.01em",
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p style={{ color: "#444", fontSize: 13, margin: "4px 0 0" }}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

function Skel({ h = 200, r = 20 }) {
  return (
    <div
      style={{
        height: h,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: r,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="shimmer-sweep"
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}

function BarChart({ data }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const W = 560,
    H = 200,
    pL = 28,
    pB = 28,
    pT = 14,
    pR = 12;
  const iW = W - pL - pR,
    iH = H - pT - pB;
  const cW = iW / data.length,
    bW = Math.min(52, cW - 20);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
    >
      {[0, 25, 50, 75, 100].map((v) => {
        const y = pT + iH - (v / 100) * iH;
        return (
          <g key={v}>
            <line
              x1={pL}
              x2={W - pR}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={pL - 5}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#333"
            >
              {v}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const cx = pL + i * cW + cW / 2;
        const bh = vis ? (d.score / 100) * iH : 0;
        const by = pT + iH - bh;
        const bx = cx - bW / 2;
        const isH = hov === i;
        return (
          <g
            key={i}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: "default" }}
          >
            <rect
              x={bx}
              y={pT}
              width={bW}
              height={iH}
              rx="6"
              fill={isH ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)"}
            />
            <rect
              x={bx}
              y={by}
              width={bW}
              height={bh}
              rx="6"
              fill={d.fill}
              opacity={isH ? 1 : 0.82}
              style={{
                transition:
                  "height 1.1s cubic-bezier(.22,1,.36,1), y 1.1s cubic-bezier(.22,1,.36,1)",
              }}
            />
            {isH && (
              <g>
                <rect
                  x={cx - 22}
                  y={by - 32}
                  width={44}
                  height={24}
                  rx="6"
                  fill="#111"
                  stroke="#2a2a2a"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={by - 15}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#fff"
                >
                  {d.score}
                </text>
              </g>
            )}
            <text
              x={cx}
              y={H - 6}
              textAnchor="middle"
              fontSize="10"
              fill="#555"
            >
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FloatNav({ visible }) {
  const nav = [
    { id: "sec-scores", label: "Scores", icon: <Gauge size={12} /> },
    { id: "sec-page", label: "Page", icon: <FileSearch size={12} /> },
    { id: "sec-vitals", label: "Vitals", icon: <Activity size={12} /> },
    { id: "sec-speed", label: "Speed", icon: <Zap size={12} /> },
    { id: "sec-authority", label: "Authority", icon: <TrendingUp size={12} /> },
    { id: "sec-resources", label: "Resources", icon: <BarChart2 size={12} /> },
    { id: "sec-opps", label: "Speed", icon: <Zap size={12} /> },
    { id: "sec-seo", label: "SEO", icon: <Shield size={12} /> },
    { id: "sec-access", label: "Access", icon: <Eye size={12} /> },
    { id: "sec-ai", label: "AI Recs", icon: <Sparkles size={12} /> },
  ];
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .4s cubic-bezier(.22,1,.36,1)",
      }}
      className="no-print float-nav"
    >
      {nav.map((s) => (
        <button
          key={s.id}
          onClick={() =>
            document
              .getElementById(s.id)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 12px",
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 40,
            color: "#777",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = C.orange + "66";
            e.currentTarget.style.transform = "translateX(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#777";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "none";
          }}
        >
          {s.icon}
          {s.label}
        </button>
      ))}
    </div>
  );
}

const STEPS = [
  "Initializing Aedrea Analysis…",
  "Running Lighthouse analysis…",
  "Auditing Core Web Vitals…",
  "Checking Technical SEO…",
  "Analyzing Performance…",
  "Generating report…",
];

function ScanLoader({ url }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
      900,
    );
    return () => clearInterval(t);
  }, []);
  const pct = ((step + 1) / STEPS.length) * 100;
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 60px" }}>
      <div
        style={{
          ...glass,
          borderRadius: 20,
          padding: "36px 32px",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        <RefreshCw
          size={28}
          color={C.orange}
          style={{
            animation: "spin 1s linear infinite",
            display: "inline-block",
            marginBottom: 16,
          }}
        />
        <div
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Running Aedrea Analysis…
        </div>
        {url && (
          <div style={{ color: "#444", fontSize: 13, marginBottom: 24 }}>
            {url}
          </div>
        )}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 12,
            justifyContent: "center",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: i <= step ? C.orange : "rgba(255,255,255,0.07)",
                boxShadow: i === step ? `0 0 8px ${C.orange}` : "none",
                transition: "background .5s ease, box-shadow .5s ease",
              }}
            />
          ))}
        </div>
        <div
          style={{
            color: C.orange,
            fontSize: 13,
            fontWeight: 500,
            animation: "scanPulse 1.4s ease-in-out infinite",
          }}
        >
          {STEPS[step]}
        </div>
        <div style={{ color: "#333", fontSize: 12, marginTop: 6 }}>
          {Math.round(pct)}% complete
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              ...glass,
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              animation: `skeletonFadeIn .4s ease ${i * 120}ms both`,
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="shimmer-sweep" />
            </div>
            <div
              style={{
                width: "80%",
                height: 10,
                borderRadius: 5,
                background: "rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="shimmer-sweep" />
            </div>
            <div
              style={{
                width: "60%",
                height: 8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.03)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="shimmer-sweep" />
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Skel h={220} />
        <div
          className="shimmer-sweep"
          style={{ position: "absolute", inset: 0 }}
        />
      </div>
      <div style={{ height: 14 }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 12,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              animation: `skeletonFadeIn .4s ease ${i * 100 + 300}ms both`,
            }}
          >
            <Skel h={130} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            color: open ? "#fff" : "#ccc",
            fontSize: 15,
            fontWeight: 600,
            lineHeight: 1.4,
            transition: "color .2s",
          }}
        >
          {q}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? C.orange + "22" : "rgba(255,255,255,0.05)",
            border: `1px solid ${open ? C.orange + "44" : "rgba(255,255,255,0.1)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .3s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDown size={13} color={open ? C.orange : "#555"} />
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height .45s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <p
          style={{
            color: "#666",
            fontSize: 14,
            lineHeight: 1.8,
            paddingBottom: 20,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

function StatBadge({ value, label, icon, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "24px 16px",
        ...glass,
        borderRadius: 16,
        textAlign: "center",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px) scale(0.95)",
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .55s cubic-bezier(.22,1,.36,1) ${delay}ms, box-shadow .2s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${C.orange}33, 0 10px 40px rgba(0,0,0,.6), 0 0 30px ${C.orange}10`;
        e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = glass.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <div style={{ color: C.orange, marginBottom: 4 }}>{icon}</div>
      <div
        style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#555",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, checks }) {
  return (
    <div
      style={{
        padding: "28px 24px",
        ...glass,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all .3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.orange + "33";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${C.orange}18, 0 20px 60px rgba(0,0,0,.6)`;
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = glass.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: C.orange + "16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: C.orange,
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: 800,
            margin: "0 0 8px",
          }}
        >
          {title}
        </h3>
        <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {checks.map((c, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              fontSize: 12,
              color: "#666",
            }}
          >
            <CheckCircle size={12} color={C.orange} style={{ flexShrink: 0 }} />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page Details Section ──────────────────────────────────────────────────
function PageDetailsSection({ audits, lh }) {
  const checks = [
    {
      key: "document-title",
      label: "Title Tag",
      icon: <FileSearch size={14} />,
      tip: (a) =>
        a.score === 1
          ? "Title tag found — good for rankings"
          : "Missing or invalid title tag",
    },
    {
      key: "meta-description",
      label: "Meta Description",
      icon: <BookOpen size={14} />,
      tip: (a) =>
        a.score === 1
          ? "Meta description present"
          : a.displayValue || "Missing meta description",
    },
    {
      key: "canonical",
      label: "Canonical URL",
      icon: <Link size={14} />,
      tip: (a) =>
        a.score === 1
          ? "Canonical tag correctly set"
          : a.displayValue || "Canonical issues detected",
    },
    {
      key: "html-has-lang",
      label: "HTML Language",
      icon: <Globe size={14} />,
      tip: (a) =>
        a.score === 1
          ? "HTML lang attribute present"
          : "Missing HTML lang attribute",
    },
    {
      key: "viewport",
      label: "Viewport Meta",
      icon: <Smartphone size={14} />,
      tip: (a) =>
        a.score === 1
          ? "Viewport configured for mobile"
          : "Viewport meta tag missing",
    },
    {
      key: "is-crawlable",
      label: "Crawlability",
      icon: <Search size={14} />,
      tip: (a) =>
        a.score === 1
          ? "Page is indexable by Google"
          : "Page may be blocked from indexing",
    },
    {
      key: "robots-txt",
      label: "robots.txt",
      icon: <Shield size={14} />,
      tip: (a) =>
        a.score === 1
          ? "robots.txt valid and accessible"
          : a.displayValue || "robots.txt issues",
    },
    {
      key: "http-status-code",
      label: "HTTP Status",
      icon: <Activity size={14} />,
      tip: (a) =>
        a.score === 1 ? "Page returns 200 OK" : "Non-200 HTTP status detected",
    },
  ].filter((c) => audits[c.key]);

  const pageUrl = lh?.finalUrl || lh?.requestedUrl || "";
  const fetchTime = lh?.timing?.total
    ? `${(lh.timing.total / 1000).toFixed(2)}s`
    : null;

  const passCount = checks.filter((c) => audits[c.key]?.score === 1).length;
  const failCount = checks.filter((c) => audits[c.key]?.score === 0).length;

  return (
    <Reveal delay={80} style={{ marginBottom: 48 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          {
            label: "Checks Passed",
            value: passCount,
            col: C.green,
            icon: <CheckCircle size={14} />,
          },
          {
            label: "Checks Failed",
            value: failCount,
            col: C.red,
            icon: <XCircle size={14} />,
          },
          {
            label: "Audit Duration",
            value: fetchTime || "—",
            col: C.orange,
            icon: <Clock size={14} />,
          },
          {
            label: "Warnings",
            value: checks.length - passCount - failCount,
            col: C.amber,
            icon: <AlertTriangle size={14} />,
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              ...glass,
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ color: s.col }}>{s.icon}</span>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  color: "#555",
                  fontSize: 11,
                  marginTop: 3,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {pageUrl && (
        <div
          style={{
            ...glass,
            borderRadius: 12,
            padding: "10px 16px",
            marginBottom: 14,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Globe size={13} color={C.orange} style={{ flexShrink: 0 }} />
          <span style={{ color: "#555", fontSize: 12, fontWeight: 600 }}>
            Analyzed URL:
          </span>
          <span
            style={{
              color: "#888",
              fontSize: 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {pageUrl}
          </span>
        </div>
      )}
      <div style={{ ...glass, borderRadius: 20, padding: "4px 22px 8px" }}>
        {checks.map(({ key, label, icon, tip }) => {
          const a = audits[key];
          if (!a) return null;
          const pass = a.score === 1 ? true : a.score === 0 ? false : null;
          const desc = tip(a);
          return (
            <div
              key={key}
              style={{
                display: "flex",
                gap: 12,
                padding: "13px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                alignItems: "flex-start",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div style={{ flexShrink: 0, paddingTop: 1 }}>
                {pass === true ? (
                  <CheckCircle size={16} color={C.green} />
                ) : pass === false ? (
                  <XCircle size={16} color={C.red} />
                ) : (
                  <AlertTriangle size={16} color={C.amber} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span style={{ color: "#666" }}>{icon}</span>
                <span style={{ color: "#ccc", fontSize: 14, fontWeight: 500 }}>
                  {label}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "#444",
                    fontSize: 11,
                    maxWidth: 220,
                    textAlign: "right",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {desc}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 4,
                    background:
                      pass === true
                        ? C.green + "18"
                        : pass === false
                          ? C.red + "18"
                          : C.amber + "18",
                    color:
                      pass === true
                        ? C.green
                        : pass === false
                          ? C.red
                          : C.amber,
                  }}
                >
                  {pass === true ? "Pass" : pass === false ? "Fail" : "Warn"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

// ─── Resource Breakdown ────────────────────────────────────────────────────
function ResourceBreakdown({ audits }) {
  const resourceSummary = audits["resource-summary"];
  const domSize = audits["dom-size"];
  const diag = audits["diagnostics"];

  if (!resourceSummary) return null;

  const items = resourceSummary?.details?.items || [];
  const totalItem = items.find((i) => i.resourceType === "total") || {};
  const typeItems = items.filter(
    (i) => i.resourceType !== "total" && i.requestCount > 0,
  );
  const d = diag?.details?.items?.[0] || {};

  const typeConfig = {
    script: { icon: <Cpu size={13} />, color: "#f59e0b", label: "JavaScript" },
    stylesheet: { icon: <Layers size={13} />, color: "#60a5fa", label: "CSS" },
    image: { icon: <Eye size={13} />, color: "#22c55e", label: "Images" },
    font: { icon: <BookOpen size={13} />, color: "#a78bfa", label: "Fonts" },
    document: {
      icon: <FileSearch size={13} />,
      color: C.orange,
      label: "HTML Docs",
    },
    "third-party": {
      icon: <Link size={13} />,
      color: "#ec4899",
      label: "3rd Party",
    },
    other: { icon: <BarChart2 size={13} />, color: "#6b7280", label: "Other" },
  };

  const summaryStats = [
    {
      label: "Total Requests",
      value: totalItem.requestCount || d.numRequests || "—",
      icon: <Globe size={13} />,
      col: C.orange,
    },
    {
      label: "Total Page Size",
      value: formatBytes(totalItem.transferSize),
      icon: <BarChart3 size={13} />,
      col: "#60a5fa",
    },
    {
      label: "DOM Nodes",
      value: domSize?.numericValue
        ? Math.round(domSize.numericValue).toLocaleString()
        : "—",
      icon: <Layers size={13} />,
      col:
        domSize?.numericValue > 1500
          ? C.red
          : domSize?.numericValue > 800
            ? C.amber
            : C.green,
    },
    {
      label: "JS Files",
      value: d.numScripts || "—",
      icon: <Cpu size={13} />,
      col: "#f59e0b",
    },
    {
      label: "CSS Files",
      value: d.numStylesheets || "—",
      icon: <Layers size={13} />,
      col: "#60a5fa",
    },
    {
      label: "Font Files",
      value: d.numFonts || "—",
      icon: <BookOpen size={13} />,
      col: "#a78bfa",
    },
    {
      label: "Total CPU Tasks",
      value: d.numTasks || "—",
      icon: <Activity size={13} />,
      col: "#555",
    },
    {
      label: "Slow Tasks >50ms",
      value: d.numTasksOver50ms !== undefined ? d.numTasksOver50ms : "—",
      icon: <AlertTriangle size={13} />,
      col:
        d.numTasksOver50ms > 5
          ? C.red
          : d.numTasksOver50ms > 2
            ? C.amber
            : C.green,
    },
  ].filter((s) => s.value !== "—" && s.value !== undefined && s.value !== null);

  return (
    <Reveal delay={60} style={{ marginBottom: 48 }}>
      {summaryStats.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {summaryStats.map((s, i) => (
            <div
              key={i}
              style={{
                ...glass,
                borderRadius: 14,
                padding: "14px 16px",
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 0 0 1px ${s.col}30, 0 10px 30px rgba(0,0,0,.5)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = glass.boxShadow;
              }}
            >
              <span style={{ color: s.col, marginTop: 2, flexShrink: 0 }}>
                {s.icon}
              </span>
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    color: "#555",
                    fontSize: 11,
                    marginTop: 4,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {typeItems.length > 0 && (
        <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
          <div
            style={{
              color: "#888",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: 18,
            }}
          >
            Page Weight by Resource Type
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {typeItems.map((item, i) => {
              const cfg = typeConfig[item.resourceType] || {
                icon: <BarChart2 size={13} />,
                color: "#6b7280",
                label: item.resourceType,
              };
              const totalSize = totalItem.transferSize || 1;
              const pct = Math.round((item.transferSize / totalSize) * 100);
              return (
                <div
                  key={i}
                  style={{ display: "flex", gap: 12, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: cfg.color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: cfg.color,
                      flexShrink: 0,
                    }}
                  >
                    {cfg.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}
                      >
                        {cfg.label}
                      </span>
                      <div style={{ display: "flex", gap: 14 }}>
                        <span style={{ color: "#555", fontSize: 12 }}>
                          {item.requestCount}{" "}
                          {item.requestCount === 1 ? "file" : "files"}
                        </span>
                        <span style={{ color: "#666", fontSize: 12 }}>
                          {formatBytes(item.transferSize)}
                        </span>
                        <span
                          style={{
                            color: cfg.color,
                            fontSize: 12,
                            fontWeight: 700,
                            minWidth: 36,
                            textAlign: "right",
                          }}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: cfg.color,
                          borderRadius: 2,
                          transition: "width 1.2s cubic-bezier(.22,1,.36,1)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Reveal>
  );
}

// ─── Main Thread Breakdown ─────────────────────────────────────────────────
function MainThreadBreakdown({ audits }) {
  const audit = audits["mainthread-work-breakdown"];
  const items = audit?.details?.items || [];
  if (items.length === 0) return null;

  const mtTotal = items.reduce((sum, i) => sum + (i.duration || 0), 0);
  const mtColors = {
    "Script Evaluation": "#f59e0b",
    "Style & Layout": "#60a5fa",
    Rendering: "#a78bfa",
    "Script Parsing & Compilation": "#ec4899",
    "Parse HTML & CSS": C.orange,
    "Garbage Collection": "#6b7280",
    Other: "#374151",
  };

  return (
    <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Cpu size={14} color={C.orange} />
        <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
          Main Thread Work Breakdown
        </span>
        {audit.displayValue && (
          <span
            style={{
              color: C.amber,
              fontSize: 12,
              fontWeight: 600,
              marginLeft: 4,
            }}
          >
            {audit.displayValue}
          </span>
        )}
      </div>
      <p style={{ color: "#555", fontSize: 12, margin: "0 0 18px" }}>
        Total CPU time spent processing your page. High values block user
        interaction.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.slice(0, 8).map((item, i) => {
          const pct =
            mtTotal > 0 ? Math.round((item.duration / mtTotal) * 100) : 0;
          const col = mtColors[item.groupLabel] || "#6b7280";
          return (
            <div
              key={i}
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: col,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ color: "#bbb", fontSize: 12 }}>
                    {item.groupLabel}
                  </span>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "#555", fontSize: 12 }}>
                      {fmtMs(item.duration || 0)}
                    </span>
                    <span
                      style={{
                        color: col,
                        fontSize: 12,
                        fontWeight: 700,
                        minWidth: 36,
                        textAlign: "right",
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 3,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: col,
                      borderRadius: 2,
                      transition: "width 1.2s cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Vitals Elements ───────────────────────────────────────────────────────
function VitalsElements({ audits }) {
  const lcpEl = audits["largest-contentful-paint-element"];
  const clsEls = audits["layout-shift-elements"];
  const longTasks = audits["long-tasks"];
  const critReq = audits["critical-request-chains"];

  const lcpItems = lcpEl?.details?.items || [];
  const clsItems = clsEls?.details?.items || [];
  const ltItems = longTasks?.details?.items?.slice(0, 6) || [];
  const crDepth = critReq?.details?.longestChain?.duration;

  if (!lcpItems.length && !clsItems.length && !ltItems.length && !crDepth)
    return null;

  return (
    <Reveal delay={60} style={{ marginBottom: 14 }}>
      <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <Target size={14} color={C.orange} />
          <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
            Core Web Vitals Elements
          </span>
        </div>

        {crDepth && (
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              padding: "10px 14px",
              background: C.amber + "10",
              border: `1px solid ${C.amber}25`,
              borderRadius: 10,
              marginBottom: 16,
            }}
          >
            <AlertTriangle size={13} color={C.amber} />
            <span style={{ color: "#888", fontSize: 13 }}>
              Critical request chain found — longest chain duration:{" "}
              <strong style={{ color: C.amber }}>{fmtMs(crDepth)}</strong>. This
              delays initial render.
            </span>
          </div>
        )}

        {lcpItems.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                color: "#555",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".07em",
                marginBottom: 8,
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.orange,
                }}
              />
              LCP Element
            </div>
            {lcpItems.slice(0, 2).map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "9px 12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#777",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  border: `1px solid ${C.orange}18`,
                }}
              >
                {item.node?.snippet || item.node?.nodeLabel || "—"}
              </div>
            ))}
          </div>
        )}

        {clsItems.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                color: "#555",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".07em",
                marginBottom: 8,
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.red,
                }}
              />
              Layout Shift Elements ({clsItems.length})
            </div>
            {clsItems.slice(0, 4).map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  marginBottom: 4,
                  fontSize: 12,
                  color: "#666",
                  gap: 8,
                  border: `1px solid ${C.red}14`,
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    fontFamily: "monospace",
                  }}
                >
                  {item.node?.snippet ||
                    item.node?.nodeLabel ||
                    "Unknown element"}
                </span>
                {item.score !== undefined && (
                  <span
                    style={{ color: C.red, fontWeight: 700, flexShrink: 0 }}
                  >
                    CLS: {Number(item.score).toFixed(4)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {ltItems.length > 0 && (
          <div>
            <div
              style={{
                color: "#555",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".07em",
                marginBottom: 8,
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: C.amber,
                }}
              />
              Long Tasks (blocking &gt;50ms) —{" "}
              {longTasks?.details?.items?.length} total
            </div>
            {ltItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  marginBottom: 4,
                  fontSize: 12,
                  color: "#666",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {item.url || "Main Thread Task"}
                </span>
                <span
                  style={{
                    color: (item.duration || 0) > 200 ? C.red : C.amber,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {fmtMs(item.duration || 0)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ─── Server Latency ────────────────────────────────────────────────────────
function ServerLatencySection({ audits }) {
  const audit = audits["network-server-latency"];
  const items = audit?.details?.items?.slice(0, 8) || [];
  if (items.length === 0) return null;

  return (
    <Reveal delay={80} style={{ marginBottom: 14 }}>
      <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Activity size={14} color={C.orange} />
          <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
            Server Response Times by Origin
          </span>
        </div>
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
          Time To First Byte (TTFB) per origin. Under 200ms is ideal; over 600ms
          impacts rankings.
        </p>
        <div>
          {items.map((item, i) => {
            const lat = item.serverResponseTime || 0;
            const col = lat > 600 ? C.red : lat > 200 ? C.amber : C.green;
            const pct = Math.min((lat / 1200) * 100, 100);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom:
                    i < items.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        color: "#777",
                        fontSize: 12,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {item.origin || "—"}
                    </span>
                    <span
                      style={{
                        color: col,
                        fontSize: 13,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginLeft: 12,
                      }}
                    >
                      {Math.round(lat)}ms
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: col,
                        borderRadius: 2,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 4,
                    background: col + "18",
                    color: col,
                    flexShrink: 0,
                  }}
                >
                  {lat > 600 ? "Slow" : lat > 200 ? "OK" : "Fast"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Third Party Impact ────────────────────────────────────────────────────
function ThirdPartySection({ audits }) {
  const audit = audits["third-party-summary"];
  const items = audit?.details?.items?.slice(0, 10) || [];
  if (items.length === 0) return null;

  const totalBlocking = items.reduce((s, i) => s + (i.blockingTime || 0), 0);
  const totalSize = items.reduce((s, i) => s + (i.transferSize || 0), 0);

  return (
    <Reveal delay={60} style={{ marginBottom: 14 }}>
      <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Link size={14} color={C.orange} />
          <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
            Third-Party Resources
          </span>
          {audit?.displayValue && (
            <span style={{ color: C.amber, fontSize: 12, fontWeight: 600 }}>
              {audit.displayValue}
            </span>
          )}
        </div>
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 14px" }}>
          External scripts, fonts & trackers loaded by your page. Reduce
          third-party blocking time to improve TBT and TTI.
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "Total 3P Size",
              value: formatBytes(totalSize),
              col: "#60a5fa",
            },
            {
              label: "Total Blocking",
              value: `${Math.round(totalBlocking)}ms`,
              col:
                totalBlocking > 250
                  ? C.red
                  : totalBlocking > 50
                    ? C.amber
                    : C.green,
            },
            { label: "Services", value: items.length, col: C.orange },
          ].map((b, i) => (
            <div
              key={i}
              style={{
                padding: "8px 14px",
                background: b.col + "12",
                border: `1px solid ${b.col}25`,
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  color: b.col,
                  fontSize: 18,
                  fontWeight: 900,
                  marginRight: 6,
                }}
              >
                {b.value}
              </span>
              <span style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {["Service", "Blocking Time", "CPU Time", "Transfer Size"].map(
              (h) => (
                <span
                  key={h}
                  style={{
                    color: "#333",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                  }}
                >
                  {h}
                </span>
              ),
            )}
          </div>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderBottom:
                  i < items.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: "#888",
                  fontSize: 12,
                  flex: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.entity}
              </span>
              <span
                style={{
                  color: (item.blockingTime || 0) > 0 ? C.red : "#444",
                  fontSize: 12,
                  fontWeight: 600,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.blockingTime
                  ? `${Math.round(item.blockingTime)}ms`
                  : "0ms"}
              </span>
              <span
                style={{
                  color: "#555",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {item.mainThreadTime
                  ? `${Math.round(item.mainThreadTime)}ms`
                  : "—"}
              </span>
              <span
                style={{
                  color: "#444",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {formatBytes(item.transferSize)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── JS Execution Bootup ───────────────────────────────────────────────────
function JSBootupSection({ audits }) {
  const audit = audits["bootup-time"];
  const items = audit?.details?.items?.slice(0, 10) || [];
  if (items.length === 0 || audit?.score === 1) return null;

  return (
    <Reveal delay={80} style={{ marginBottom: 14 }}>
      <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Cpu size={14} color={C.orange} />
          <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
            JavaScript Execution Time
          </span>
          {audit?.displayValue && (
            <span style={{ color: C.amber, fontSize: 12, fontWeight: 600 }}>
              {audit.displayValue}
            </span>
          )}
        </div>
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
          Scripts that take the most CPU time to execute. Reduce or defer heavy
          JS to improve TBT and interactivity.
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 1fr 1fr",
              padding: "8px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              gap: 8,
            }}
          >
            {["Script URL", "Total", "Evaluation", "Parse/Compile"].map((h) => (
              <span
                key={h}
                style={{
                  color: "#333",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                {h}
              </span>
            ))}
          </div>
          {items.map((item, i) => {
            const total = item.total || 0;
            const col = total > 1000 ? C.red : total > 300 ? C.amber : "#666";
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1fr 1fr 1fr",
                  alignItems: "center",
                  padding: "9px 14px",
                  borderBottom:
                    i < items.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: "#666",
                    fontSize: 11,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily: "monospace",
                  }}
                >
                  {item.url || "—"}
                </span>
                <span style={{ color: col, fontSize: 12, fontWeight: 700 }}>
                  {total ? fmtMs(total) : "—"}
                </span>
                <span style={{ color: "#555", fontSize: 12 }}>
                  {item.scripting ? fmtMs(item.scripting) : "—"}
                </span>
                <span style={{ color: "#444", fontSize: 12 }}>
                  {item.scriptParseCompile
                    ? fmtMs(item.scriptParseCompile)
                    : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

// ─── DOM Size Details ──────────────────────────────────────────────────────
function DOMSizeDetails({ audits }) {
  const audit = audits["dom-size"];
  if (!audit) return null;
  const items = audit?.details?.items || [];
  const total = audit.numericValue ? Math.round(audit.numericValue) : null;
  const col = total > 1500 ? C.red : total > 800 ? C.amber : C.green;

  return (
    <div style={{ ...glass, borderRadius: 16, padding: "18px 22px" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Layers size={13} color={C.orange} />
        <span style={{ color: "#ccc", fontSize: 13, fontWeight: 700 }}>
          DOM Size
        </span>
        {total && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              background: col + "18",
              color: col,
            }}
          >
            {total.toLocaleString()} nodes — {audit.displayValue}
          </span>
        )}
      </div>
      {items.slice(0, 3).map((item, i) => (
        <div
          key={i}
          style={{
            fontSize: 12,
            color: "#555",
            padding: "6px 0",
            borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
        >
          <span style={{ color: "#666", marginRight: 8 }}>
            {item.type === "node" ? "Node:" : item.statLabel || "Stat"}
          </span>
          <span style={{ fontFamily: "monospace", color: "#888" }}>
            {item.snippet || item.statValue || "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Cache Analysis ────────────────────────────────────────────────────────
function CacheAnalysis({ audits }) {
  const audit = audits["uses-long-cache-ttl"];
  const items = audit?.details?.items?.slice(0, 8) || [];
  if (items.length === 0 || audit?.score === 1) return null;

  return (
    <Reveal delay={70} style={{ marginBottom: 14 }}>
      <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Clock size={14} color={C.orange} />
          <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
            Cache Policy Issues
          </span>
          {audit?.displayValue && (
            <span style={{ color: C.amber, fontSize: 12, fontWeight: 600 }}>
              {audit.displayValue}
            </span>
          )}
        </div>
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 14px" }}>
          Resources without proper caching must be re-downloaded on every visit
          — slowing repeat visits and wasting bandwidth.
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "9px 14px",
                borderBottom:
                  i < items.length - 1
                    ? "1px solid rgba(255,255,255,0.04)"
                    : "none",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: "#666",
                  fontSize: 11,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 3,
                  fontFamily: "monospace",
                }}
              >
                {item.url || "—"}
              </span>
              <span
                style={{
                  color: "#555",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "right",
                  whiteSpace: "nowrap",
                }}
              >
                TTL:{" "}
                {item.cacheLifetimeMs
                  ? `${Math.round(item.cacheLifetimeMs / 1000)}s`
                  : "None"}
              </span>
              <span
                style={{
                  color: C.amber,
                  fontSize: 12,
                  fontWeight: 600,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {formatBytes(item.totalBytes)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Images Analysis ───────────────────────────────────────────────────────
function ImagesAnalysis({ audits }) {
  const altAudit = audits["image-alt"];
  const webpAudit = audits["uses-webp-images"];
  const optimizeAudit = audits["uses-optimized-images"];
  const sizeAudit = audits["uses-responsive-images"];
  const aspectAudit = audits["image-aspect-ratio"];
  const lazyAudit = audits["offscreen-images"];

  const missingAlt = altAudit?.details?.items || [];
  const webpItems = webpAudit?.details?.items?.slice(0, 6) || [];
  const optItems = optimizeAudit?.details?.items?.slice(0, 6) || [];
  const sizeItems = sizeAudit?.details?.items?.slice(0, 6) || [];
  const aspectItems = aspectAudit?.details?.items?.slice(0, 6) || [];
  const lazyItems = lazyAudit?.details?.items?.slice(0, 6) || [];

  const badges = [
    {
      label: "Missing Alt Text",
      count: missingAlt.length,
      col: missingAlt.length > 0 ? C.red : C.green,
    },
    {
      label: "Not WebP Format",
      count: webpItems.length,
      col: webpItems.length > 0 ? C.amber : C.green,
    },
    {
      label: "Not Compressed",
      count: optItems.length,
      col: optItems.length > 0 ? C.amber : C.green,
    },
    {
      label: "Wrong Size",
      count: sizeItems.length,
      col: sizeItems.length > 0 ? C.amber : C.green,
    },
    {
      label: "Bad Aspect Ratio",
      count: aspectItems.length,
      col: aspectItems.length > 0 ? C.red : C.green,
    },
    {
      label: "Offscreen/Lazy",
      count: lazyItems.length,
      col: lazyItems.length > 0 ? C.amber : C.green,
    },
  ];

  const hasAnyIssue = badges.some((b) => b.count > 0);

  return (
    <Reveal
      delay={60}
      style={{
        ...glass,
        borderRadius: 18,
        padding: "20px 24px",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Eye size={14} color={C.orange} />
        <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
          Images Analysis
        </span>
      </div>
      <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
        Image issues are the #1 cause of slow LCP scores and wasted bandwidth.
      </p>

      <div
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}
      >
        {badges.map((b, i) => (
          <div
            key={i}
            style={{
              padding: "8px 14px",
              background: b.col + "14",
              border: `1px solid ${b.col}33`,
              borderRadius: 10,
              display: "flex",
              gap: 6,
              alignItems: "center",
              transition: "transform .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <span
              style={{
                color: b.col,
                fontSize: 20,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              {b.count}
            </span>
            <span style={{ color: "#666", fontSize: 11, fontWeight: 600 }}>
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {!hasAnyIssue && (
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            color: C.green,
            fontSize: 13,
            padding: "12px",
            background: C.green + "10",
            borderRadius: 10,
          }}
        >
          <CheckCircle size={14} /> All image checks passed — great image
          optimization!
        </div>
      )}

      {missingAlt.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              color: "#555",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".07em",
              marginBottom: 8,
            }}
          >
            Images Missing Alt Text ({missingAlt.length})
          </div>
          {missingAlt.slice(0, 5).map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "7px 10px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: 6,
                marginBottom: 4,
                fontSize: 12,
              }}
            >
              <XCircle size={11} color={C.red} style={{ flexShrink: 0 }} />
              <span
                style={{
                  color: "#666",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "monospace",
                }}
              >
                {item.src || item.url || "—"}
              </span>
            </div>
          ))}
          {missingAlt.length > 5 && (
            <div style={{ color: "#333", fontSize: 11, paddingLeft: 10 }}>
              +{missingAlt.length - 5} more images missing alt text
            </div>
          )}
        </div>
      )}

      {webpItems.length > 0 && (
        <div>
          <div
            style={{
              color: "#555",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".07em",
              marginBottom: 8,
            }}
          >
            Not Using WebP — Potential savings: {webpAudit?.displayValue}
          </div>
          {webpItems.slice(0, 4).map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 10px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: 6,
                marginBottom: 4,
                fontSize: 12,
              }}
            >
              <span
                style={{
                  color: "#666",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  fontFamily: "monospace",
                }}
              >
                {item.url || "—"}
              </span>
              {item.wastedBytes && (
                <span
                  style={{
                    color: C.amber,
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  Save {formatBytes(item.wastedBytes)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </Reveal>
  );
}

// ─── Accessibility Details ─────────────────────────────────────────────────
function AccessibilityDetails({ audits }) {
  const accChecks = [
    {
      key: "color-contrast",
      title: "Sufficient Color Contrast",
      tip: "Text must have a contrast ratio ≥ 4.5:1 against its background.",
    },
    {
      key: "label",
      title: "Form Input Labels",
      tip: "Every form input needs an associated <label> element.",
    },
    {
      key: "button-name",
      title: "Button Accessible Names",
      tip: "Buttons must have visible text or an aria-label.",
    },
    {
      key: "link-name",
      title: "Link Descriptive Text",
      tip: "Links need descriptive text — 'Click here' is not accessible.",
    },
    {
      key: "aria-allowed-attr",
      title: "Valid ARIA Attributes",
      tip: "ARIA attributes must be valid for their element's role.",
    },
    {
      key: "aria-required-attr",
      title: "Required ARIA Attributes",
      tip: "Elements with ARIA roles must include all required attributes.",
    },
    {
      key: "aria-roles",
      title: "Valid ARIA Roles",
      tip: "ARIA roles must be valid values.",
    },
    {
      key: "aria-valid-attr",
      title: "Valid ARIA Attribute Values",
      tip: "ARIA attributes must have valid values.",
    },
    {
      key: "frame-title",
      title: "iFrame Title Attributes",
      tip: "iFrames need title attributes for screen reader users.",
    },
    {
      key: "heading-order",
      title: "Heading Hierarchy Order",
      tip: "Headings must increase sequentially — don't skip H1 → H3.",
    },
    {
      key: "html-lang-valid",
      title: "Valid HTML lang Code",
      tip: "The lang attribute must be a valid BCP 47 language tag.",
    },
    {
      key: "skip-link",
      title: "Skip Navigation Link",
      tip: "Keyboard users need a skip link to bypass repeated navigation.",
    },
    {
      key: "tabindex",
      title: "No tabindex > 0",
      tip: "tabindex values greater than 0 disrupt natural tab order.",
    },
    {
      key: "valid-lang",
      title: "Valid Element lang Codes",
      tip: "Elements with lang attribute must use valid BCP 47 tags.",
    },
    {
      key: "object-alt",
      title: "Object Element Alt Text",
      tip: "<object> elements need text alternatives.",
    },
    {
      key: "input-image-alt",
      title: "Image Input Alt Text",
      tip: "<input type='image'> elements need alt attributes.",
    },
    {
      key: "duplicate-id-active",
      title: "No Duplicate Active IDs",
      tip: "Active elements must have unique IDs for ARIA.",
    },
    {
      key: "list",
      title: "Proper List Structure",
      tip: "List items must be contained within <ul>, <ol>, or <menu>.",
    },
    {
      key: "listitem",
      title: "List Items in Lists",
      tip: "<li> elements must be inside proper list containers.",
    },
  ].filter((c) => audits[c.key]);

  if (accChecks.length === 0) return null;
  const passing = accChecks.filter((c) => audits[c.key]?.score === 1).length;
  const failing = accChecks.filter((c) => audits[c.key]?.score === 0).length;

  return (
    <Reveal delay={80} style={{ marginBottom: 48 }}>
      <div
        style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}
      >
        <div
          style={{
            padding: "8px 14px",
            background: C.green + "12",
            border: `1px solid ${C.green}25`,
            borderRadius: 10,
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <span style={{ color: C.green, fontSize: 18, fontWeight: 900 }}>
            {passing}
          </span>
          <span style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>
            Checks Passed
          </span>
        </div>
        <div
          style={{
            padding: "8px 14px",
            background: C.red + "12",
            border: `1px solid ${C.red}25`,
            borderRadius: 10,
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <span style={{ color: C.red, fontSize: 18, fontWeight: 900 }}>
            {failing}
          </span>
          <span style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>
            Checks Failed
          </span>
        </div>
      </div>
      <div style={{ ...glass, borderRadius: 20, padding: "4px 22px 8px" }}>
        {accChecks.map(({ key, title, tip }) => {
          const a = audits[key];
          if (!a) return null;
          const pass = a.score === 1 ? true : a.score === 0 ? false : null;
          const desc =
            pass === false
              ? a.displayValue || stripMd(a.description) || tip
              : tip;
          return <SEORow key={key} pass={pass} title={title} desc={desc} />;
        })}
      </div>
    </Reveal>
  );
}

// ─── Network Requests Viewer ───────────────────────────────────────────────
function NetworkRequestsSection({ audits }) {
  const audit = audits["network-requests"];
  const [showAll, setShowAll] = useState(false);
  if (!audit?.details?.items?.length) return null;

  const items = audit.details.items.filter(
    (i) => i.resourceType !== "other" || i.transferSize > 0,
  );
  const displayed = showAll ? items : items.slice(0, 12);

  const typeColors = {
    Script: "#f59e0b",
    Stylesheet: "#60a5fa",
    Image: "#22c55e",
    Font: "#a78bfa",
    Document: C.orange,
    XHR: "#ec4899",
    Fetch: "#ec4899",
    Other: "#6b7280",
  };

  return (
    <Reveal delay={70} style={{ marginBottom: 14 }}>
      <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 4,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Globe size={14} color={C.orange} />
            <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
              Network Requests ({items.length})
            </span>
          </div>
        </div>
        <p style={{ color: "#555", fontSize: 12, margin: "0 0 14px" }}>
          All resources loaded by the page. Reduce requests and sizes to improve
          load performance.
        </p>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
              padding: "7px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              gap: 8,
            }}
          >
            {["URL", "Type", "Size", "Status"].map((h) => (
              <span
                key={h}
                style={{
                  color: "#333",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                {h}
              </span>
            ))}
          </div>
          {displayed.map((item, i) => {
            const col = typeColors[item.resourceType] || "#6b7280";
            const statusCol =
              item.statusCode === 200
                ? C.green
                : item.statusCode >= 300 && item.statusCode < 400
                  ? C.amber
                  : item.statusCode >= 400
                    ? C.red
                    : "#555";
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderBottom:
                    i < displayed.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: "#666",
                    fontSize: 10,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontFamily: "monospace",
                  }}
                >
                  {item.url || "—"}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: col + "18",
                    color: col,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    width: "fit-content",
                  }}
                >
                  {item.resourceType || "other"}
                </span>
                <span style={{ color: "#555", fontSize: 11 }}>
                  {item.transferSize ? formatBytes(item.transferSize) : "—"}
                </span>
                <span
                  style={{ color: statusCol, fontSize: 11, fontWeight: 600 }}
                >
                  {item.statusCode || "—"}
                </span>
              </div>
            );
          })}
        </div>
        {items.length > 12 && (
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              marginTop: 10,
              background: "none",
              border: `1px solid rgba(255,255,255,0.1)`,
              color: "#666",
              fontSize: 12,
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: 8,
              cursor: "pointer",
              width: "100%",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.orange + "55";
              e.currentTarget.style.color = C.orange;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#666";
            }}
          >
            {showAll ? `▲ Show Less` : `▼ Show All ${items.length} Requests`}
          </button>
        )}
      </div>
    </Reveal>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  NEW SECTION 1 — WEBSITE SPEED ANALYSIS
// ══════════════════════════════════════════════════════════════════════════

function SpeedMetricCard({ audit, description, hint, index = 0 }) {
  const [ref, vis] = useReveal(0.08);
  const score = audit?.score ?? 1;
  const col = scoreColor(Math.round((score ?? 1) * 100));

  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        ...glass,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${index * 70}ms, transform .55s cubic-bezier(.22,1,.36,1) ${index * 70}ms, box-shadow .3s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${col}35, 0 10px 40px rgba(0,0,0,.6)`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = glass.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#777",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".08em",
          }}
        >
          {audit?.title || "—"}
        </span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span
            style={{
              background: col + "22",
              color: col,
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 9px",
              borderRadius: 4,
              border: `1px solid ${col}33`,
            }}
          >
            {score >= 0.9 ? "Fast" : score >= 0.5 ? "Moderate" : "Slow"}
          </span>
          <Tooltip text={hint || description || "No additional info"} />
        </div>
      </div>
      <div
        style={{ color: "#fff", fontSize: 28, fontWeight: 900, lineHeight: 1 }}
      >
        {audit?.displayValue || "—"}
      </div>
      <AnimBar pct={Math.round((score ?? 1) * 100)} color={col} />
      <p style={{ color: "#444", fontSize: 11, lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>
      {hint && (
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "flex-start",
            padding: "8px 10px",
            background: C.orange + "0c",
            border: `1px solid ${C.orange}18`,
            borderRadius: 8,
          }}
        >
          <Zap
            size={11}
            color={C.orange}
            style={{ flexShrink: 0, marginTop: 2 }}
          />
          <span style={{ color: "#555", fontSize: 11, lineHeight: 1.5 }}>
            {hint}
          </span>
        </div>
      )}
    </div>
  );
}

function ResourceDonut({ items, total }) {
  const [ref, vis] = useReveal(0.1);
  const size = 140,
    cx = 70,
    cy = 70,
    r = 52,
    circ = 2 * Math.PI * r;
  const typeConfig = {
    script: { color: "#f59e0b", label: "JavaScript" },
    stylesheet: { color: "#60a5fa", label: "CSS" },
    image: { color: "#22c55e", label: "Images" },
    font: { color: "#a78bfa", label: "Fonts" },
    document: { color: C.orange, label: "HTML" },
    other: { color: "#6b7280", label: "Other" },
  };

  const slices = [];
  let currentOffset = 0;
  for (const item of items) {
    const cfg = typeConfig[item.resourceType] || typeConfig.other;
    const pct = total > 0 ? item.transferSize / total : 0;
    slices.push({
      ...item,
      ...cfg,
      pct,
      dashLen: pct * circ,
      dashOffset: circ - pct * circ,
      rotation: currentOffset,
    });
    currentOffset += pct * 360;
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ opacity: vis ? 1 : 0, transition: "opacity .6s" }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#181818"
          strokeWidth="14"
        />
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="14"
            strokeLinecap="butt"
            strokeDasharray={`${vis ? s.dashLen : 0} ${circ}`}
            strokeDashoffset={(-s.rotation / 360) * circ}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{
              transition: `stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1) ${i * 80}ms`,
            }}
          />
        ))}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize="11"
          fill="#777"
          fontWeight="700"
        >
          TOTAL
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize="13"
          fill="#fff"
          fontWeight="900"
        >
          {formatBytes(total)}
        </text>
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
          minWidth: 160,
        }}
      >
        {slices
          .filter((s) => s.transferSize > 0)
          .map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: s.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#888", fontSize: 12 }}>{s.label}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#555", fontSize: 11 }}>
                  {formatBytes(s.transferSize)}
                </span>
                <span
                  style={{
                    color: s.color,
                    fontSize: 11,
                    fontWeight: 700,
                    minWidth: 34,
                    textAlign: "right",
                  }}
                >
                  {Math.round(s.pct * 100)}%
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function PerformanceTimeline({ audits }) {
  const [ref, vis] = useReveal(0.08);

  const milestones = [
    {
      key: "server-response-time",
      label: "Server Response",
      icon: <Globe size={13} />,
      color: "#60a5fa",
    },
    {
      key: "first-contentful-paint",
      label: "First Paint",
      icon: <Eye size={13} />,
      color: C.orange,
    },
    {
      key: "largest-contentful-paint",
      label: "Largest Content",
      icon: <TrendingUp size={13} />,
      color: C.amber,
    },
    {
      key: "interactive",
      label: "Interactive",
      icon: <Target size={13} />,
      color: "#a78bfa",
    },
    {
      key: "total-blocking-time",
      label: "Blocking Time",
      icon: <Cpu size={13} />,
      color: C.red,
    },
  ].filter((m) => audits[m.key]?.numericValue != null);

  const maxMs = Math.max(
    ...milestones.map((m) => audits[m.key].numericValue || 0),
    1,
  );

  return (
    <div ref={ref} style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Clock size={14} color={C.orange} />
        <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
          Performance Timeline
        </span>
      </div>
      <p style={{ color: "#555", fontSize: 12, margin: "0 0 20px" }}>
        Key milestones from first byte to fully interactive — left to right
        shows relative timing.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {milestones.map((m, i) => {
          const ms = audits[m.key]?.numericValue || 0;
          const pct = (ms / maxMs) * 100;
          const score = audits[m.key]?.score ?? 1;
          const col = score >= 0.9 ? C.green : score >= 0.5 ? C.amber : C.red;
          return (
            <div
              key={i}
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "none" : "translateX(-16px)",
                transition: `opacity .5s cubic-bezier(.22,1,.36,1) ${i * 90}ms, transform .5s cubic-bezier(.22,1,.36,1) ${i * 90}ms`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      background: m.color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: m.color,
                    }}
                  >
                    {m.icon}
                  </div>
                  <span
                    style={{ color: "#bbb", fontSize: 13, fontWeight: 500 }}
                  >
                    {m.label}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: col, fontSize: 13, fontWeight: 700 }}>
                    {fmtMs(ms)}
                  </span>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: col,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  height: 5,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 3,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: vis ? `${pct}%` : "0%",
                    background: `linear-gradient(90deg,${m.color}88,${m.color})`,
                    borderRadius: 3,
                    transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${i * 90}ms`,
                    boxShadow: `0 0 8px ${m.color}55`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpeedGradeCard({ pScore }) {
  const [ref, vis] = useReveal(0.1);
  const grade =
    pScore >= 90
      ? "A"
      : pScore >= 70
        ? "B"
        : pScore >= 50
          ? "C"
          : pScore >= 30
            ? "D"
            : "F";
  const col = scoreColor(pScore);
  const message =
    pScore >= 90
      ? "Fast loading website with optimized assets and strong Core Web Vitals. You're in the top tier."
      : pScore >= 70
        ? "Good foundation with room for improvement. Optimize images and reduce unused JS for better mobile rankings."
        : pScore >= 50
          ? "Moderate performance is holding back your SEO. Heavy JavaScript and unoptimized assets are the likely culprits."
          : "Critical speed issues detected. Your site loads too slowly for users and Google's mobile-first ranking. Urgent action needed.";

  return (
    <div
      ref={ref}
      style={{
        ...glass,
        borderRadius: 20,
        padding: "28px 28px",
        background: `linear-gradient(135deg,${col}0a,transparent 60%)`,
        border: `1px solid ${col}25`,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition:
          "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1), box-shadow .3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${col}35, 0 16px 48px rgba(0,0,0,.7)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = glass.boxShadow;
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: col,
              lineHeight: 1,
              filter: `drop-shadow(0 0 18px ${col}55)`,
            }}
          >
            {grade}
          </div>
          <div
            style={{
              color: col,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginTop: 4,
            }}
          >
            Speed Grade
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Website Speed Grade
          </div>
          <p
            style={{
              color: "#666",
              fontSize: 13,
              lineHeight: 1.7,
              margin: "0 0 14px",
            }}
          >
            {message}
          </p>
          <div style={{ flex: 1, minWidth: 80 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span style={{ color: "#555", fontSize: 11 }}>Performance</span>
              <span style={{ color: col, fontSize: 11, fontWeight: 700 }}>
                {pScore}/100
              </span>
            </div>
            <AnimBar pct={pScore} color={col} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SlowIssueCard({
  title,
  severity,
  explanation,
  impact,
  recommendation,
}) {
  const [open, setOpen] = useState(false);
  const sevColor =
    severity === "High" ? C.red : severity === "Medium" ? C.amber : C.orange;
  return (
    <div
      style={{
        ...glass,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 8,
        transition: "border-color .2s, transform .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.transform = "translateX(3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
          gap: 12,
        }}
      >
        <div
          style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: sevColor,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#e0e0e0", fontSize: 14, fontWeight: 500 }}>
            {title}
          </span>
          <span
            style={{
              color: sevColor,
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              background: sevColor + "18",
              border: `1px solid ${sevColor}33`,
            }}
          >
            {severity}
          </span>
        </div>
        {open ? (
          <ChevronUp size={14} color="#444" />
        ) : (
          <ChevronDown size={14} color="#444" />
        )}
      </button>
      <div
        style={{
          maxHeight: open ? "320px" : "0",
          overflow: "hidden",
          transition: "max-height .4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div
          style={{
            padding: "0 20px 18px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p
            style={{
              color: "#777",
              fontSize: 13,
              lineHeight: 1.7,
              margin: "12px 0 10px",
            }}
          >
            {explanation}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 4,
                background: C.orange + "18",
                color: C.orange,
                fontWeight: 600,
              }}
            >
              ⚡ {impact}
            </span>
            <span
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 4,
                background: C.green + "14",
                color: C.green,
                fontWeight: 600,
              }}
            >
              Fix: {recommendation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeedRecCard({ title, gain, priority, difficulty, detail, index }) {
  const [ref, vis] = useReveal(0.05);
  const priColor =
    priority === "High" ? C.red : priority === "Medium" ? C.amber : C.green;
  return (
    <div
      ref={ref}
      style={{
        padding: "18px 20px",
        ...glass,
        borderLeft: `3px solid ${priColor}`,
        borderRadius: "0 14px 14px 0",
        marginBottom: 10,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateX(-12px)",
        transition: `opacity .5s cubic-bezier(.22,1,.36,1) ${index * 80}ms, transform .5s cubic-bezier(.22,1,.36,1) ${index * 80}ms, box-shadow .2s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${priColor}28, 0 10px 40px rgba(0,0,0,.6)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = glass.boxShadow;
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            background: priColor + "22",
            color: priColor,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 4,
            textTransform: "uppercase",
          }}
        >
          {priority} Priority
        </span>
        <span
          style={{
            background: C.green + "14",
            color: C.green,
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 4,
          }}
        >
          ⚡ {gain}
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "#777",
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 4,
          }}
        >
          {difficulty}
        </span>
      </div>
      <div
        style={{
          color: "#e0e0e0",
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <p style={{ color: "#555", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
        {detail}
      </p>
    </div>
  );
}

function SpeedEducationBlock() {
  const [ref, vis] = useReveal(0.07);
  const stats = [
    {
      stat: "53%",
      text: "of mobile visits are abandoned if a page takes over 3 seconds to load",
    },
    {
      stat: "7%",
      text: "drop in conversions for every 1 second delay in website load time",
    },
    {
      stat: "#1",
      text: "factor in user bounce rate is website performance, above content relevance",
    },
  ];
  return (
    <div
      ref={ref}
      style={{
        ...glass,
        borderRadius: 20,
        padding: "24px 28px",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition:
          "opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <BookOpen size={14} color={C.orange} />
        <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
          Why Website Speed Matters for SEO
        </span>
      </div>
      <p
        style={{
          color: "#555",
          fontSize: 13,
          lineHeight: 1.8,
          margin: "0 0 18px",
        }}
      >
        Website speed and page performance directly impact your Google search
        rankings. Since 2021, Core Web Vitals — Google's page experience signals
        measuring real-world loading, interactivity, and visual stability — are
        an official ranking factor. Slow websites don't just frustrate users;
        they lose organic search positions to faster competitors.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "14px 16px",
              background: C.orange + "08",
              border: `1px solid ${C.orange}18`,
              borderRadius: 12,
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(12px)",
              transition: `opacity .5s cubic-bezier(.22,1,.36,1) ${i * 100 + 300}ms, transform .5s cubic-bezier(.22,1,.36,1) ${i * 100 + 300}ms`,
            }}
          >
            <div
              style={{
                color: C.orange,
                fontSize: 22,
                fontWeight: 900,
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {s.stat}
            </div>
            <div style={{ color: "#555", fontSize: 11, lineHeight: 1.5 }}>
              {s.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebsiteSpeedSection({ audits, pScore }) {
  const resourceSummary = audits["resource-summary"];
  const items = resourceSummary?.details?.items || [];
  const totalItem = items.find((i) => i.resourceType === "total") || {};
  const typeItems = items.filter(
    (i) => i.resourceType !== "total" && i.transferSize > 0,
  );

  const speedMetrics = [
    {
      key: "first-contentful-paint",
      description:
        "Time until the browser renders the first piece of content. Critical for perceived load speed.",
      hint: "Reduce server response time, eliminate render-blocking resources, and use CDN delivery.",
    },
    {
      key: "largest-contentful-paint",
      description:
        "Time until the largest visible content element loads. Core Web Vital — Google ranks you on this.",
      hint: "Preload your hero image, use WebP format, and host on fast CDN infrastructure.",
    },
    {
      key: "interactive",
      description:
        "Time until the page becomes fully usable. High values mean users click buttons that don't respond.",
      hint: "Minimize main-thread blocking work. Defer non-critical JavaScript and code-split large bundles.",
    },
    {
      key: "total-blocking-time",
      description:
        "Total time the main thread was blocked preventing interaction. Directly impacts user frustration.",
      hint: "Break up long JavaScript tasks. Each task should complete in under 50ms.",
    },
    {
      key: "speed-index",
      description:
        "How quickly contents are visually populated during page load. Lower is better.",
      hint: "Critical CSS inline loading and progressive image rendering will reduce this score significantly.",
    },
    {
      key: "cumulative-layout-shift",
      description:
        "Measures visual stability — unexpected layout jumps during load. Core Web Vital.",
      hint: "Set explicit width and height on images and video embeds. Reserve space for ads and embeds.",
    },
  ].filter((m) => audits[m.key]);

  const slowIssues = [
    {
      title: "Large Unoptimized Images",
      severity:
        (audits["uses-webp-images"]?.score ?? 1) < 0.9 ||
          (audits["uses-optimized-images"]?.score ?? 1) < 0.9
          ? "High"
          : "Low",
      explanation:
        "Images are typically the largest assets on a webpage. Un-compressed images and non-WebP formats significantly increase transfer size and hurt LCP scores.",
      impact: "Up to 40% faster LCP",
      recommendation:
        "Convert to WebP, compress images, and lazy-load offscreen images",
    },
    {
      title: "Unused JavaScript",
      severity:
        (audits["unused-javascript"]?.score ?? 1) < 0.9 ? "High" : "Low",
      explanation:
        "JavaScript shipped to the browser but never executed still takes network bandwidth, parse time, and memory. This directly increases Total Blocking Time.",
      impact: "Reduce TBT by 200–600ms",
      recommendation:
        "Code-split bundles, tree-shake unused code, defer non-critical scripts",
    },
    {
      title: "Render-Blocking Resources",
      severity:
        (audits["render-blocking-resources"]?.score ?? 1) < 0.9
          ? "High"
          : "Medium",
      explanation:
        "CSS and JS in the <head> block the browser from painting the page until they fully download and parse. This directly delays First Contentful Paint.",
      impact: "Save 300–1200ms on FCP",
      recommendation:
        "Move CSS to preload, add async/defer to scripts, inline critical CSS",
    },
    {
      title: "Excessive DOM Size",
      severity:
        (audits["dom-size"]?.numericValue ?? 0) > 1500
          ? "High"
          : (audits["dom-size"]?.numericValue ?? 0) > 800
            ? "Medium"
            : "Low",
      explanation:
        "A large DOM tree (over 1,500 nodes) increases memory usage, causes longer style calculations, and slows layout reflows. Google recommends under 1,400 nodes.",
      impact: "Faster layout + less memory",
      recommendation:
        "Simplify HTML structure, use virtual lists for long content",
    },
    {
      title: "Slow Server Response (TTFB)",
      severity:
        (audits["server-response-time"]?.score ?? 1) < 0.9 ? "High" : "Low",
      explanation:
        "Time to First Byte measures how fast your server responds. Slow servers delay every other metric. Google considers under 200ms acceptable.",
      impact: "Affects all page metrics",
      recommendation:
        "Use CDN, enable caching, upgrade hosting, optimize database queries",
    },
    {
      title: "Third-Party Script Impact",
      severity:
        (audits["third-party-summary"]?.details?.items?.length ?? 0) > 5
          ? "Medium"
          : "Low",
      explanation:
        "Analytics, ads, chat widgets, and social scripts from external domains add network round-trips, CPU time, and can block your page from loading.",
      impact: "Often 20–40% of TBT",
      recommendation:
        "Audit third-party scripts, load them async, consider self-hosting critical ones",
    },
  ];

  const speedRecs = [
    {
      title: "Convert hero images to WebP format",
      gain: "~1.2s faster LCP",
      priority: "High",
      difficulty: "Easy",
      detail:
        "WebP images are 25–35% smaller than JPEG and PNG at equivalent visual quality. Converting your above-the-fold hero images to WebP is typically the single biggest LCP improvement available.",
    },
    {
      title: "Defer non-critical JavaScript",
      gain: "~800ms less TBT",
      priority: "High",
      difficulty: "Medium",
      detail:
        "Adding defer or async attributes to scripts that aren't needed for initial render frees up the main thread immediately. Use dynamic imports for large feature modules.",
    },
    {
      title: "Enable text compression (Brotli/GZIP)",
      gain: "~60% smaller assets",
      priority: "Medium",
      difficulty: "Easy",
      detail:
        "Text-based assets (HTML, CSS, JS) compress by 60–80% with Brotli. This is usually a single server configuration line with dramatic impact on transfer size.",
    },
    {
      title: "Implement efficient cache policies",
      gain: "~50% faster repeat visits",
      priority: "Medium",
      difficulty: "Easy",
      detail:
        "Setting long cache TTLs (1 year) on static assets means returning visitors load from local disk, not the network. Use content-hash filenames to bust cache on updates.",
    },
    {
      title: "Eliminate unused CSS",
      gain: "~300ms faster FCP",
      priority: "Medium",
      difficulty: "Medium",
      detail:
        "CSS is render-blocking. Large CSS files with unused rules increase parse time and delay the critical rendering path. Use PurgeCSS or CSS-in-JS to ship only what's needed.",
    },
  ];

  return (
    <div style={{ marginBottom: 64 }}>
      <SecHead
        id="sec-speed"
        icon={<Zap size={16} />}
        title="Website Speed Analysis"
        subtitle="Analyze website speed, loading performance, Core Web Vitals, and page optimization metrics powered by Google Lighthouse."
      />

      <div style={{ marginBottom: 20 }}>
        <SpeedGradeCard pScore={pScore} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {speedMetrics.map((m, i) => (
          <SpeedMetricCard
            key={m.key}
            audit={audits[m.key]}
            description={m.description}
            hint={m.hint}
            index={i}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {typeItems.length > 0 && (
          <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <BarChart2 size={14} color={C.orange} />
              <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
                Resource Size Breakdown
              </span>
            </div>
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 18px" }}>
              What's eating your page weight budget.
            </p>
            <ResourceDonut
              items={typeItems}
              total={totalItem.transferSize || 0}
            />
          </div>
        )}
        <PerformanceTimeline audits={audits} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            color: "#777",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            marginBottom: 12,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <AlertTriangle size={12} color={C.orange} />
          What Slows Your Website?
        </div>
        {slowIssues.map((issue, i) => (
          <SlowIssueCard key={i} {...issue} />
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            color: "#777",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            marginBottom: 12,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Zap size={12} color={C.orange} />
          AI Speed Recommendations
        </div>
        {speedRecs.map((rec, i) => (
          <SpeedRecCard key={i} {...rec} index={i} />
        ))}
      </div>

      <SpeedEducationBlock />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  NEW SECTION 2 — SEO AUTHORITY OVERVIEW
// ══════════════════════════════════════════════════════════════════════════

function AuthorityCard({
  title,
  score,
  icon,
  color,
  explanation,
  tooltip,
  index,
}) {
  const [ref, vis] = useReveal(0.08);
  const animated = useCountUp(score, 1100, vis);
  const col = color || scoreColor(score);
  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        ...glass,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${index * 80}ms, transform .55s cubic-bezier(.22,1,.36,1) ${index * 80}ms, box-shadow .3s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = col + "44";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${col}28, 0 10px 40px rgba(0,0,0,.6)`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = glass.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: col + "16",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: col,
            }}
          >
            {icon}
          </div>
          <span style={{ color: "#888", fontSize: 12, fontWeight: 600 }}>
            {title}
          </span>
        </div>
        <Tooltip text={tooltip} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {animated}
        </span>
        <span style={{ color: "#444", fontSize: 14 }}>/100</span>
      </div>
      <AnimBar pct={score} color={col} />
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          padding: "3px 9px",
          borderRadius: 4,
          background: col + "18",
          color: col,
          border: `1px solid ${col}33`,
          width: "fit-content",
        }}
      >
        {score >= 80 ? "Strong" : score >= 55 ? "Moderate" : "Weak"}
      </span>
      <p style={{ color: "#444", fontSize: 11, lineHeight: 1.6, margin: 0 }}>
        {explanation}
      </p>
    </div>
  );
}

function LinkHealthRow({ pass, title, desc }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "13px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        alignItems: "flex-start",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ flexShrink: 0, paddingTop: 1 }}>
        {pass === true ? (
          <CheckCircle size={15} color={C.green} />
        ) : pass === false ? (
          <XCircle size={15} color={C.red} />
        ) : (
          <AlertTriangle size={15} color={C.amber} />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}>
          {title}
        </div>
        {desc && (
          <div
            style={{
              color: "#444",
              fontSize: 11,
              marginTop: 3,
              lineHeight: 1.5,
            }}
          >
            {desc}
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 4,
          flexShrink: 0,
          background:
            pass === true
              ? C.green + "18"
              : pass === false
                ? C.red + "18"
                : C.amber + "18",
          color: pass === true ? C.green : pass === false ? C.red : C.amber,
        }}
      >
        {pass === true ? "Good" : pass === false ? "Issue" : "Review"}
      </span>
    </div>
  );
}

function SEOInsightCard({ icon, title, text, priority, index }) {
  const [ref, vis] = useReveal(0.05);
  const priColor =
    priority === "High" ? C.red : priority === "Medium" ? C.amber : C.green;
  return (
    <div
      ref={ref}
      style={{
        padding: "16px 18px",
        ...glass,
        borderLeft: `3px solid ${priColor}`,
        borderRadius: "0 12px 12px 0",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateX(-10px)",
        transition: `opacity .5s cubic-bezier(.22,1,.36,1) ${index * 70}ms, transform .5s cubic-bezier(.22,1,.36,1) ${index * 70}ms, box-shadow .2s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(4px)";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${priColor}25, 0 8px 30px rgba(0,0,0,.5)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = glass.boxShadow;
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: priColor + "16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: priColor,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <span style={{ color: "#ddd", fontSize: 13, fontWeight: 600 }}>
            {title}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 4,
              background: priColor + "18",
              color: priColor,
            }}
          >
            {priority}
          </span>
        </div>
        <p style={{ color: "#555", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function CrawlHealthGauge({ audits }) {
  const [ref, vis] = useReveal(0.1);

  const checks = [
    { key: "is-crawlable", label: "Google can crawl page", weight: 25 },
    { key: "robots-txt", label: "Valid robots.txt", weight: 20 },
    { key: "canonical", label: "Canonical URL correct", weight: 15 },
    { key: "http-status-code", label: "Page returns 200 OK", weight: 20 },
    { key: "document-title", label: "Title tag present", weight: 10 },
    { key: "meta-description", label: "Meta description present", weight: 10 },
  ].filter((c) => audits[c.key]);

  const earned = checks.reduce(
    (sum, c) => sum + (audits[c.key]?.score === 1 ? c.weight : 0),
    0,
  );
  const total = checks.reduce((sum, c) => sum + c.weight, 0) || 1;
  const crawlScore = Math.round((earned / total) * 100);
  const col = scoreColor(crawlScore);

  const r = 48,
    circ = 2 * Math.PI * r;
  const offset = circ - (crawlScore / 100) * circ;

  return (
    <div ref={ref} style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Search size={14} color={C.orange} />
        <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
          Crawlability & Indexation
        </span>
      </div>
      <p style={{ color: "#555", fontSize: 12, margin: "0 0 18px" }}>
        How well Google can find, crawl, and index your pages.
      </p>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width={110} height={110} viewBox="0 0 110 110">
            <circle
              cx={55}
              cy={55}
              r={r}
              fill="none"
              stroke="#181818"
              strokeWidth={10}
            />
            <circle
              cx={55}
              cy={55}
              r={r}
              fill="none"
              stroke={col}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={vis ? offset : circ}
              transform="rotate(-90 55 55)"
              style={{
                transition:
                  "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) 200ms",
              }}
            />
            <text
              x={55}
              y={52}
              textAnchor="middle"
              fontSize="22"
              fontWeight="900"
              fill="#fff"
            >
              {crawlScore}
            </text>
            <text
              x={55}
              y={68}
              textAnchor="middle"
              fontSize="10"
              fill={col}
              fontWeight="700"
            >
              CRAWL SCORE
            </text>
          </svg>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 160,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {checks.map((c, i) => {
            const pass = audits[c.key]?.score === 1;
            return (
              <div
                key={i}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                {pass ? (
                  <CheckCircle size={12} color={C.green} />
                ) : (
                  <XCircle size={12} color={C.red} />
                )}
                <span style={{ color: "#666", fontSize: 11, flex: 1 }}>
                  {c.label}
                </span>
                <span
                  style={{
                    color: pass ? C.green : C.red,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {c.weight}pt
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SEOAuthoritySection({ audits, lh }) {
  const pScore = Math.round((lh?.categories?.performance?.score ?? 0) * 100);
  const sScore = Math.round((lh?.categories?.seo?.score ?? 0) * 100);
  const aScore = Math.round((lh?.categories?.accessibility?.score ?? 0) * 100);
  const bScore = Math.round(
    (lh?.categories?.["best-practices"]?.score ?? 0) * 100,
  );

  const networkRequests = audits["network-requests"]?.details?.items || [];
  const finalUrl = lh?.finalUrl || "";
  let baseDomain = "";
  try {
    baseDomain = new URL(finalUrl).hostname;
  } catch { /* ignore invalid URL */ }

  const internalLinks = networkRequests.filter((r) => {
    try {
      return new URL(r.url).hostname === baseDomain;
    } catch {
      return false;
    }
  });
  const externalLinks = networkRequests.filter((r) => {
    try {
      return new URL(r.url).hostname !== baseDomain;
    } catch {
      return false;
    }
  });

  const domainStrength = Math.min(
    100,
    Math.round(sScore * 0.5 + bScore * 0.3 + pScore * 0.2),
  );
  const linkQuality = Math.min(
    100,
    Math.round(
      (audits["crawlable-anchors"]?.score === 1 ? 25 : 0) +
      (audits["link-text"]?.score === 1 ? 25 : 0) +
      (audits["is-crawlable"]?.score === 1 ? 30 : 0) +
      (audits["robots-txt"]?.score === 1 ? 20 : 0),
    ),
  );
  const pageAuthority = Math.min(
    100,
    Math.round(sScore * 0.6 + aScore * 0.2 + bScore * 0.2),
  );
  const linkStructureHealth = Math.min(
    100,
    Math.round(
      (audits["canonical"]?.score === 1 ? 20 : 0) +
      (audits["http-status-code"]?.score === 1 ? 25 : 0) +
      (audits["document-title"]?.score === 1 ? 20 : 0) +
      (audits["meta-description"]?.score === 1 ? 20 : 0) +
      (audits["html-has-lang"]?.score === 1 ? 15 : 0),
    ),
  );
  const contentStructure = Math.min(
    100,
    Math.round(
      (audits["heading-order"]?.score === 1 ? 30 : 0) +
      (audits["structured-data"]?.score === 1 ? 35 : 0) +
      (audits["document-title"]?.score === 1 ? 20 : 0) +
      (audits["meta-description"]?.score === 1 ? 15 : 0),
    ),
  );

  const authorityCards = [
    {
      title: "Estimated Domain Strength",
      score: domainStrength,
      icon: <Star size={14} />,
      color: scoreColor(domainStrength),
      explanation:
        "Estimated based on technical SEO score, best practices compliance, and page performance — signals that correlate with domain authority.",
      tooltip:
        "Derived from your Lighthouse SEO, Best Practices, and Performance scores. Higher scores correlate with stronger domain trust signals.",
    },
    {
      title: "Internal Linking Quality",
      score: linkQuality,
      icon: <Link size={14} />,
      color: scoreColor(linkQuality),
      explanation:
        "Quality of your internal link structure — crawlable anchors, descriptive link text, and proper robots.txt configuration.",
      tooltip:
        "Checks for crawlable anchor tags, descriptive link text (no 'click here'), and unblocked crawl paths.",
    },
    {
      title: "Page Authority Estimate",
      score: pageAuthority,
      icon: <TrendingUp size={14} />,
      color: scoreColor(pageAuthority),
      explanation:
        "Estimated page-level authority based on on-page SEO completeness, accessibility signals, and technical best practices.",
      tooltip:
        "Weighted combination of SEO completeness (60%), accessibility quality (20%), and best practices (20%).",
    },
    {
      title: "Link Structure Health",
      score: linkStructureHealth,
      icon: <Shield size={14} />,
      color: scoreColor(linkStructureHealth),
      explanation:
        "How well your page's canonical tags, HTTP status, titles, and language signals are configured for SEO.",
      tooltip:
        "Checks canonical URL, HTTP 200 status, unique title, meta description, and html lang attribute.",
    },
    {
      title: "Content Structure Score",
      score: contentStructure,
      icon: <Layers size={14} />,
      color: scoreColor(contentStructure),
      explanation:
        "How well your content hierarchy, structured data markup, and on-page SEO elements communicate context to search engines.",
      tooltip:
        "Heading order, structured data/Schema presence, title tag, and meta description completeness.",
    },
    {
      title: "External Resources Detected",
      score: Math.min(
        100,
        Math.round(
          100 -
          (externalLinks.length / Math.max(networkRequests.length, 1)) * 100,
        ),
      ),
      icon: <Globe size={14} />,
      color:
        externalLinks.length < 10
          ? C.green
          : externalLinks.length < 25
            ? C.amber
            : C.red,
      explanation: `${externalLinks.length} external resource${externalLinks.length !== 1 ? "s" : ""} loaded vs ${internalLinks.length} internal. Too many external dependencies can slow load time.`,
      tooltip:
        "Ratio of internal to external network requests. More external dependencies = more third-party risk.",
    },
  ];

  const internalLinkChecks = [
    {
      pass:
        audits["crawlable-anchors"]?.score === 1
          ? true
          : audits["crawlable-anchors"]
            ? false
            : null,
      title: "Crawlable Anchor Tags",
      desc: "All links use proper href attributes that Google can follow to discover your other pages.",
    },
    {
      pass:
        audits["link-text"]?.score === 1
          ? true
          : audits["link-text"]
            ? false
            : null,
      title: "Descriptive Link Text",
      desc: "Anchor text describes the destination page — helps Google understand your site structure and content relationships.",
    },
    {
      pass:
        audits["is-crawlable"]?.score === 1
          ? true
          : audits["is-crawlable"]
            ? false
            : null,
      title: "Page is Indexable",
      desc: "No robots meta tag or X-Robots-Tag header is blocking Google from indexing this page.",
    },
    {
      pass:
        audits["canonical"]?.score === 1
          ? true
          : audits["canonical"]
            ? false
            : null,
      title: "Canonical Tag Set",
      desc: "A canonical URL is defined, preventing duplicate content issues across multiple URL versions of this page.",
    },
    {
      pass:
        audits["hreflang"]?.score === 1
          ? true
          : audits["hreflang"]
            ? null
            : null,
      title: "hreflang Configuration",
      desc: "If you have multilingual pages, hreflang tags direct users and bots to the right language version.",
    },
    {
      pass:
        (audits["dom-size"]?.numericValue ?? 0) < 1500
          ? true
          : (audits["dom-size"]?.numericValue ?? 0) > 2000
            ? false
            : null,
      title: "Navigation Crawl Depth",
      desc: `Page has ${audits["dom-size"]?.numericValue ? Math.round(audits["dom-size"].numericValue).toLocaleString() : "unknown"} DOM nodes. Simpler structure means shallower crawl paths for Googlebot.`,
    },
    {
      pass:
        audits["structured-data"]?.score === 1
          ? true
          : audits["structured-data"]
            ? null
            : null,
      title: "Schema Markup Detected",
      desc: "Structured data helps Google understand content type and can unlock rich results (stars, FAQs, products) in search listings.",
    },
  ].filter((c) => c.pass !== undefined);

  const insights = [
    {
      icon: <Link size={13} />,
      title: "Improve internal linking between key pages",
      text: "Pages with strong internal link networks distribute more PageRank and help Googlebot discover all your important content. Link from high-traffic pages to conversion pages.",
      priority: "High",
    },
    {
      icon: <FileSearch size={13} />,
      title: "Add Schema markup for content types",
      text: "Structured data (Organization, Article, FAQPage, or Product schema) helps Google categorize your content and can unlock rich snippets in search results — increasing click-through rates by 20–30%.",
      priority: "High",
    },
    {
      icon: <Shield size={13} />,
      title: "Ensure canonical tags are consistent",
      text: "Every indexable page should have a self-referencing canonical. If the same content is accessible at multiple URLs (www vs non-www, HTTP vs HTTPS, trailing slash), canonicals prevent duplicate content dilution.",
      priority: "Medium",
    },
    {
      icon: <Layers size={13} />,
      title: "Structure content with clear heading hierarchy",
      text: "One H1 per page, followed by logical H2 → H3 subheadings. This signals content structure to both users and search engines. Skipping heading levels confuses crawlers and reduces topical authority signals.",
      priority: "Medium",
    },
    {
      icon: <Globe size={13} />,
      title: "Audit and reduce third-party dependencies",
      text: "Each external script creates a DNS lookup, TCP connection, and TLS handshake. Removing one analytics pixel or replacing a third-party font with a self-hosted version can meaningfully improve TTFB.",
      priority: "Low",
    },
  ];

  return (
    <div style={{ marginBottom: 64 }}>
      <SecHead
        id="sec-authority"
        icon={<TrendingUp size={16} />}
        title="SEO Authority Overview"
        subtitle="Analyze website authority signals, internal linking structure, and overall SEO strength."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {authorityCards.map((card, i) => (
          <AuthorityCard key={i} {...card} index={i} />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div style={{ ...glass, borderRadius: 18, padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Link size={14} color={C.orange} />
            <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
              Internal Link Structure
            </span>
          </div>
          <p style={{ color: "#555", fontSize: 12, margin: "0 0 4px" }}>
            Crawlability, link quality, and page discoverability health checks.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Internal Requests",
                val: internalLinks.length,
                col: C.orange,
              },
              {
                label: "External Requests",
                val: externalLinks.length,
                col: externalLinks.length > 20 ? C.red : C.amber,
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "7px 12px",
                  background: s.col + "10",
                  border: `1px solid ${s.col}22`,
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    color: s.col,
                    fontSize: 18,
                    fontWeight: 900,
                    marginRight: 6,
                  }}
                >
                  {s.val}
                </span>
                <span style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: "0 0 4px" }}>
            {internalLinkChecks.map((c, i) => (
              <LinkHealthRow
                key={i}
                pass={c.pass}
                title={c.title}
                desc={c.desc}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <CrawlHealthGauge audits={audits} />
          <div
            style={{
              ...glass,
              borderRadius: 16,
              padding: "16px 20px",
              background: `linear-gradient(135deg,${C.orange}08,transparent 60%)`,
              border: `1px solid ${C.orange}18`,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Star size={13} color={C.orange} />
              <span style={{ color: "#ddd", fontSize: 13, fontWeight: 700 }}>
                Authority Summary
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Technical SEO", val: sScore },
                { label: "Page Quality", val: bScore },
                {
                  label: "User Experience",
                  val: Math.round((aScore + pScore) / 2),
                },
              ].map((item, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ color: "#666", fontSize: 12 }}>
                      {item.label}
                    </span>
                    <span
                      style={{
                        color: scoreColor(item.val),
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {item.val}/100
                    </span>
                  </div>
                  <AnimBar
                    pct={item.val}
                    color={scoreColor(item.val)}
                    delay={i * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            color: "#777",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            marginBottom: 12,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <TrendingUp size={12} color={C.orange} />
          SEO Health Insights
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {insights.map((ins, i) => (
            <SEOInsightCard key={i} {...ins} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function SEOChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [strategy, setStrategy] = useState("mobile");
  const [aiRecs, setAiRecs] = useState([]);
  const [aiLoad, setAiLoad] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favicon, setFavicon] = useState(null);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    if (!url) {
      setFavicon(null);
      return;
    }
    try {
      const d = new URL(url.startsWith("http") ? url : "https://" + url)
        .hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${d}&sz=64`);
    } catch {
      setFavicon(null);
    }
  }, [url]);

  const getAIRecs = async (data) => {
    setAiLoad(true);
    try {
      const cats = data.lighthouseResult.categories;
      const sc = {
        p: getScore(cats?.performance?.score),
        s: getScore(cats?.seo?.score),
        a: getScore(cats?.accessibility?.score),
        b: getScore(cats?.["best-practices"]?.score),
      };
      const audits = data.lighthouseResult.audits || {};
      const failed = Object.values(audits)
        .filter((a) => a.score !== null && a.score < 0.9 && a.title)
        .slice(0, 12)
        .map((a) => `${a.title}: ${a.displayValue || "failed"}`)
        .join("\n");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `SEO consultant. Scores: Performance ${sc.p}/100, SEO ${sc.s}/100, Accessibility ${sc.a}/100, Best Practices ${sc.b}/100\nIssues:\n${failed}\nReturn ONLY a valid JSON array of exactly 5 actionable recommendation strings. No markdown.`,
            },
          ],
        }),
      });
      const json = await res.json();
      const raw = json.content?.map((b) => b.text || "").join("") || "[]";
      const recs = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setAiRecs(Array.isArray(recs) ? recs : []);
    } catch {
      setAiRecs([]);
    } finally {
      setAiLoad(false);
    }
  };

  const isValidDomain = (value) => {
    const normalized = value.startsWith("http") ? value : "https://" + value;
    try {
      const { hostname } = new URL(normalized);
      return (
        hostname.includes(".") && hostname.length >= 4 && !/\s/.test(hostname)
      );
    } catch {
      return false;
    }
  };

  const analyze = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError("Please enter a domain name.");
      return;
    }
    if (!isValidDomain(trimmed)) {
      setUrlError("Please enter a valid domain name (e.g. yoursite.com).");
      return;
    }
    setUrlError("");
    const normalized = trimmed.startsWith("http")
      ? trimmed
      : "https://" + trimmed;
    setLoading(true);
    setError("");
    setReport(null);
    setAiRecs([]);
    try {
      const ep = `/api/seo?url=${encodeURIComponent(normalized)}&strategy=${strategy}`;
      const res = await fetch(ep);
      const data = await res.json();
      if (data.error) {
        setError(data.error.message);
        return;
      }
      if (data.lighthouseResult?.runtimeError) {
        setError(data.lighthouseResult.runtimeError.message);
        return;
      }
      setReport(data);
      getAIRecs(data);
    } catch {
      setError("Failed to analyze. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const fixedEls = [...document.querySelectorAll("*")].filter(
      (el) => getComputedStyle(el).position === "fixed",
    );
    fixedEls.forEach((el) =>
      el.style.setProperty("display", "none", "important"),
    );
    const s = document.createElement("style");
    s.innerHTML =
      "@media print{.no-print{display:none!important}body{background:#fff!important;color:#000!important}*{opacity:1!important;transform:none!important;animation:none!important;transition:none!important;will-change:auto!important}}";
    document.head.appendChild(s);
    window.print();
    setTimeout(() => {
      document.head.removeChild(s);
      fixedEls.forEach((el) => el.style.removeProperty("display"));
    }, 500);
  };

  const share = () => {
    navigator.clipboard
      .writeText(`${window.location.href}?url=${encodeURIComponent(url)}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const lh = report?.lighthouseResult;
  const cats = lh?.categories;
  const audits = lh?.audits || {};
  const pScore = getScore(cats?.performance?.score);
  const sScore = getScore(cats?.seo?.score);
  const aScore = getScore(cats?.accessibility?.score);
  const bScore = getScore(cats?.["best-practices"]?.score);
  const grade = lh ? Math.round((pScore + sScore + aScore + bScore) / 4) : 0;
  const domain = url
    ? getDomain(url.startsWith("http") ? url : "https://" + url)
    : "";
  const isHttps = (url.startsWith("http") ? url : "https://" + url)
    .toLowerCase()
    .startsWith("https");
  const shot = audits["final-screenshot"]?.details?.data;

  const chartData = lh
    ? [
      { name: "Performance", score: pScore, fill: scoreColor(pScore) },
      { name: "SEO", score: sScore, fill: scoreColor(sScore) },
      { name: "Accessibility", score: aScore, fill: scoreColor(aScore) },
      { name: "Best Practices", score: bScore, fill: scoreColor(bScore) },
    ]
    : [];

  const seoChecks = [
    {
      key: "document-title",
      title: "Page Title",
      tip: "A unique, descriptive title tag helps Google understand your page content.",
    },
    {
      key: "meta-description",
      title: "Meta Description",
      tip: "Meta descriptions improve click-through rate in Google search results.",
    },
    {
      key: "viewport",
      title: "Viewport Meta Tag",
      tip: "Required for mobile rendering and Google's mobile-first indexing.",
    },
    {
      key: "is-crawlable",
      title: "Crawlable by Google",
      tip: "Pages blocked from crawling won't appear in Google search results.",
    },
    {
      key: "robots-txt",
      title: "Valid robots.txt",
      tip: "robots.txt controls which pages search engines crawl.",
    },
    {
      key: "image-alt",
      title: "Image Alt Tags",
      tip: "Alt text helps Google index images and improves accessibility.",
    },
    {
      key: "link-text",
      title: "Descriptive Link Text",
      tip: "Descriptive anchor text helps Google understand your page structure.",
    },
    {
      key: "hreflang",
      title: "hreflang Tags",
      tip: "Required for multilingual sites to target the right audience.",
    },
    {
      key: "canonical",
      title: "Canonical URL",
      tip: "Canonical tags prevent duplicate content issues affecting rankings.",
    },
    {
      key: "structured-data",
      title: "Structured Data / Schema",
      tip: "Schema markup can enable rich results in Google search.",
    },
    {
      key: "crawlable-anchors",
      title: "Crawlable Anchors",
      tip: "Links must be crawlable for Google to follow them to your pages.",
    },
    {
      key: "tap-targets",
      title: "Mobile Tap Targets",
      tip: "Properly-sized tap targets improve mobile usability and rankings.",
    },
    {
      key: "http-status-code",
      title: "HTTP Status Code",
      tip: "Pages must return 200 OK status to be indexed by Google.",
    },
    {
      key: "font-size",
      title: "Legible Font Size",
      tip: "Text must be readable on mobile without zooming.",
    },
    {
      key: "html-has-lang",
      title: "HTML Language Attribute",
      tip: "The HTML lang attribute helps search engines serve the right language.",
    },
    {
      key: "heading-order",
      title: "Heading Hierarchy",
      tip: "Proper H1 → H2 → H3 order helps Google understand content structure.",
    },
    {
      key: "plugins",
      title: "No Deprecated Plugins",
      tip: "Flash, Java & other deprecated plugins can block indexing.",
    },
  ];

  const opps = [
    "render-blocking-resources",
    "unused-css-rules",
    "unused-javascript",
    "uses-optimized-images",
    "uses-webp-images",
    "uses-text-compression",
    "uses-responsive-images",
    "efficient-animated-content",
    "uses-long-cache-ttl",
    "dom-size",
    "font-display",
    "server-response-time",
    "redirects",
    "uses-rel-preload",
    "unminified-javascript",
    "unminified-css",
  ];

  const faqData = [
    {
      q: "What is a website SEO checker?",
      a: "An SEO checker is a full analysis of your website's technical health, on-page optimization, and performance. It identifies issues that prevent your site from ranking well — like missing meta tags, slow page speed, broken links, or poor mobile experience. Think of it as a health checkup for your website.",
    },
    {
      q: "How does this free SEO checker tool work?",
      a: "Our tool runs a deep multi-layer analysis of your URL across four key categories: Performance, SEO, Accessibility, and Best Practices. You get scores, detailed findings, and AI-generated recommendations in seconds.",
    },
    {
      q: "What are Core Web Vitals and why do they matter?",
      a: "Core Web Vitals are Google's official set of user experience metrics — Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Since 2021, they are a confirmed Google ranking factor. Poor Core Web Vitals scores can directly lower your position in search results, especially on mobile.",
    },
    {
      q: "How often should I run an SEO checker?",
      a: "We recommend running a full SEO checker at least once a month. Additionally, audit after major site changes like redesigns, platform migrations, or adding new pages. Regular audits help you catch regressions early before they impact rankings. Ongoing monitoring gives you a competitive advantage over sites that audit only once.",
    },
    {
      q: "Mobile vs Desktop — which audit should I choose?",
      a: "Google uses mobile-first indexing, which means your mobile site is what Google primarily evaluates for ranking. We recommend starting with a Mobile audit. However, if most of your traffic is desktop (like for SaaS tools or B2B products), a Desktop audit is also valuable. Running both gives the most complete picture.",
    },
    {
      q: "What is the difference between this free tool and paid SEO tools?",
      a: "This free tool gives you a comprehensive Lighthouse-based audit including Core Web Vitals, technical SEO checks, and AI recommendations — perfect for most websites. Paid SEO platforms additionally offer crawling thousands of pages, keyword tracking, backlink analysis, and ongoing monitoring dashboards. For a single-page audit, this tool is fully capable.",
    },
    {
      q: "Why is my Performance score low on mobile?",
      a: "Mobile Performance scores are typically 20–40 points lower than Desktop. This is because Lighthouse simulates a mid-range Android device on a 4G network — a realistic benchmark for your real users. Common causes: unoptimized images (not WebP), unused JavaScript, render-blocking resources, and slow server response times.",
    },
  ];

  const howItWorksSteps = [
    {
      num: "01",
      icon: <Globe size={20} />,
      title: "Enter Your URL",
      desc: "Type or paste any website URL — just the domain is fine (e.g. yoursite.com). We normalize it automatically.",
    },
    {
      num: "02",
      icon: <Search size={20} />,
      title: "We Run the Seo Checker",
      desc: "Our engine runs a deep Lighthouse-based analysis across 4 categories and 50+ individual checks — giving you a complete picture of your site's health.",
    },
    {
      num: "03",
      icon: <Sparkles size={20} />,
      title: "Get AI-Powered Insights",
      desc: "Claude analyzes your results and generates a prioritized list of actionable recommendations ranked by impact and difficulty.",
    },
  ];

  const featureCards = [
    {
      icon: <Zap size={20} />,
      title: "Performance Analysis",
      desc: "Measure real-world speed using the same signals Google uses to rank your site.",
      checks: [
        "First Contentful Paint (FCP)",
        "Largest Contentful Paint (LCP)",
        "Total Blocking Time (TBT)",
        "Cumulative Layout Shift (CLS)",
        "Time to Interactive (TTI)",
      ],
    },
    {
      icon: <Search size={20} />,
      title: "Technical SEO Checker",
      desc: "Check every on-page SEO element that affects your ability to be found and indexed.",
      checks: [
        "Title tag & meta description",
        "Crawlability & robots.txt",
        "Canonical URL setup",
        "Structured data / Schema",
        "Image alt tags & link text",
      ],
    },
    {
      icon: <Shield size={20} />,
      title: "Accessibility Check",
      desc: "Identify barriers that prevent users with disabilities from accessing your content.",
      checks: [
        "Color contrast ratios",
        "ARIA labels & roles",
        "Keyboard navigation",
        "Image alt attributes",
        "Tap target sizing",
      ],
    },
    {
      icon: <Star size={20} />,
      title: "Best Practices",
      desc: "Ensure your site follows modern web standards for security, reliability and trust.",
      checks: [
        "HTTPS & SSL validation",
        "Console errors check",
        "Modern JavaScript APIs",
        "Image aspect ratios",
        "Browser compatibility",
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: "#fff",
        fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
      }}
    >
      <SEO
        title="SEO Checker – Analyze Website SEO, Speed & Performance | AEDREA"
        description="Check your website's SEO score, PageSpeed performance, Core Web Vitals, accessibility, and optimization insights instantly with AEDREA's free SEO & PageSpeed Checker tool."
        keywords="SEO checker, PageSpeed checker, website SEO audit, Core Web Vitals checker, website performance test, SEO analysis tool, AEDREA SEO tool, free SEO checker, Google PageSpeed checker, technical SEO audit"
        canonical="https://aedrea.com/seo-checker"
        image="https://aedrea.com/images/logos/favicon.png"
      />
      <style>{`
        @keyframes spin         { to { transform: rotate(360deg) } }
        @keyframes pulse        { 0%,100%{opacity:.3} 50%{opacity:.6} }
        @keyframes fadeUp       { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow         { 0%,100%{opacity:.4} 50%{opacity:.75} }
        @keyframes heroFadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes heroPill     { from{opacity:0;transform:translateY(-16px) scale(.92)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes heroInput    { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes heroPills    { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gridDot      { 0%{opacity:0} 100%{opacity:1} }
        @keyframes scanPulse    { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes skeletonFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer      { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes ambientFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.03)} }
        @keyframes borderGlow   { 0%,100%{box-shadow:0 0 0 1px rgba(217,100,0,.15)} 50%{box-shadow:0 0 0 1px rgba(217,100,0,.35),0 0 24px rgba(217,100,0,.08)} }

        .aedrea-pulse  { animation: pulse 1.6s ease-in-out infinite }
        .fade-up       { animation: fadeUp .5s ease both }
        .hero-pill     { animation: heroPill .7s cubic-bezier(.22,1,.36,1) both }
        .hero-h1       { animation: heroFadeUp .8s cubic-bezier(.22,1,.36,1) .15s both }
        .hero-sub1     { animation: heroFadeUp .8s cubic-bezier(.22,1,.36,1) .28s both }
        .hero-sub2     { animation: heroFadeUp .7s cubic-bezier(.22,1,.36,1) .38s both }
        .hero-toggle   { animation: heroFadeUp .7s cubic-bezier(.22,1,.36,1) .48s both }
        .hero-input    { animation: heroInput  .8s cubic-bezier(.22,1,.36,1) .58s both }
        .hero-cats     { animation: heroPills  .7s cubic-bezier(.22,1,.36,1) .72s both }
        .hero-grid-bg  { animation: gridDot 1.2s ease .1s both }

        .shimmer-sweep {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          animation: shimmer 1.8s ease-in-out infinite;
        }

        ::-webkit-scrollbar { width: 4px }
        ::-webkit-scrollbar-track { background: #000 }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px }
        * { box-sizing: border-box }
        @media print { .no-print { display: none !important } }
        @media(max-width:640px) {
          .hero-grid   { flex-direction:column!important }
          .stats-grid  { grid-template-columns:repeat(2,1fr)!important }
          .feature-grid{ grid-template-columns:1fr!important }
          .steps-grid  { flex-direction:column!important }
          .float-nav   { display:none!important }
          .why-grid    { grid-template-columns:1fr!important }
        }
        .input-row   { display:flex; flex-direction:row; gap:8px; align-items:center; padding:10px 10px 10px 6px; border-radius:20px }
        .input-inner { flex:1; position:relative }
        .input-btn   { height:54px; padding:0 28px; flex-shrink:0; width:auto; border-radius:13px }
        @media(max-width:640px) {
          .input-row   { flex-direction:column; background:transparent!important; border:none!important; box-shadow:none!important; padding:0; gap:10px }
          .input-inner { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.15); border-radius:14px; padding:4px 0 }
          .input-btn   { width:100%; justify-content:center; border-radius:14px!important }
        }
      `}</style>

      <FloatNav visible={!!lh} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          padding: "100px 24px 80px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1000,
            height: 700,
            background: `radial-gradient(ellipse,${C.orange}16 0%,transparent 62%)`,
            pointerEvents: "none",
            animation: "ambientFloat 7s ease-in-out infinite",
          }}
        />
        <div
          className="hero-grid-bg"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: "linear-gradient(transparent,#000)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div
            className="hero-pill"
            style={{
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 30,
              padding: "8px 18px",
              background: C.orange + "18",
              border: `1px solid ${C.orange}44`,
              borderRadius: 40,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.orange,
                animation: "glow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".14em",
              }}
            >
              Aedrea Studio — Free SEO Tool
            </span>
          </div>

          <h1
            className="hero-h1"
            style={{
              fontSize: "clamp(40px,7.56vw,70px)",
              fontWeight: 700,
              lineHeight: 0.9,
              margin: "0 0 22px",
              letterSpacing: "-.03em",
            }}
          >
            Website SEO &amp;
            <br />
            <span style={{ color: C.orange }}>Performance Checker</span>
          </h1>

          <p
            className="hero-sub1"
            style={{
              color: "#666",
              fontSize: "clamp(15px,2vw,18px)",
              maxWidth: 560,
              margin: "0 auto 10px",
              lineHeight: 1.7,
            }}
          >
            Get a complete website analysis — performance, Core Web Vitals,
            technical SEO &amp; accessibility — powered by AI.
          </p>
          <p
            className="hero-sub2"
            style={{
              color: "#2e2e2e",
              fontSize: 13,
              maxWidth: 600,
              margin: "0 auto 36px",
              lineHeight: 1.7,
            }}
          >
            This free SEO Checker analyzes website performance, Core Web Vitals,
            technical SEO issues, and accessibility to help improve your search
            engine rankings and site speed.
          </p>

          <div
            className="hero-toggle"
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              ["mobile", "Mobile", Smartphone],
              ["desktop", "Desktop", Monitor],
            ].map((item) => {
              const [val, lbl, Icon] = item;
              return (
                <button
                  key={val}
                  onClick={() => setStrategy(val)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 22px",
                    borderRadius: 40,
                    cursor: "pointer",
                    border: `1px solid ${strategy === val ? C.orange : "rgba(255,255,255,0.1)"}`,
                    background:
                      strategy === val ? C.orange + "18" : "transparent",
                    color: strategy === val ? C.orange : "#555",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "all .25s cubic-bezier(.22,1,.36,1)",
                  }}
                >
                  <Icon size={13} />
                  {lbl}
                </button>
              );
            })}
          </div>

          <div
            className="input-row hero-input"
            style={{
              maxWidth: 700,
              margin: "0 auto 10px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${urlError ? "rgba(0, 0, 0, 0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 20,
              boxShadow: `0 8px 60px rgba(0,0,0,0.7), 0 0 80px ${C.orange}0c`,
              transition: "border-color .2s, box-shadow .3s",
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 60px rgba(0,0,0,0.7), 0 0 100px ${C.orange}18`;
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 60px rgba(0,0,0,0.7), 0 0 80px ${C.orange}0c`;
            }}
          >
            <div className="input-inner">
              {favicon ? (
                <img
                  src={favicon}
                  alt=""
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 22,
                    height: 22,
                    borderRadius: 5,
                    pointerEvents: "none",
                  }}
                  onError={() => setFavicon(null)}
                />
              ) : (
                <Globe
                  size={18}
                  style={{
                    position: "absolute",
                    left: 18,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#555",
                    pointerEvents: "none",
                  }}
                />
              )}
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && analyze()}
                placeholder="yourwebsite.com"
                style={{
                  width: "100%",
                  height: 54,
                  paddingLeft: 52,
                  paddingRight: domain ? 140 : 16,
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 16,
                  outline: "none",
                }}
              />
              {domain && (
                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "#444",
                      maxWidth: 90,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {domain}
                  </span>
                  {isHttps ? (
                    <Lock size={12} color={C.green} />
                  ) : (
                    <Unlock size={12} color={C.amber} />
                  )}
                </div>
              )}
            </div>
            <button
              onClick={analyze}
              disabled={loading}
              className="input-btn"
              style={{
                height: 54,
                padding: "0 28px",
                borderRadius: 13,
                border: "none",
                background: loading ? "#1a1a1a" : C.orange,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                boxShadow: loading ? "none" : `0 0 24px ${C.orange}55`,
                transition: "all .2s",
              }}
              onMouseEnter={(e) =>
                !loading &&
                (e.currentTarget.style.boxShadow = `0 0 36px ${C.orange}88`)
              }
              onMouseLeave={(e) =>
                !loading &&
                (e.currentTarget.style.boxShadow = `0 0 24px ${C.orange}55`)
              }
              onMouseDown={(e) =>
                !loading && (e.currentTarget.style.transform = "scale(0.97)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {loading ? (
                <RefreshCw
                  size={15}
                  style={{ animation: "spin .8s linear infinite" }}
                />
              ) : (
                <Zap size={15} />
              )}
              {loading ? "Analyzing…" : "Check My Site →"}
            </button>
          </div>

          {urlError && (
            <div
              style={{
                maxWidth: 700,
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: C.red,
                fontSize: 13,
                paddingLeft: 4,
                animation: "fadeUp .3s ease both",
              }}
            >
              <AlertTriangle size={14} />
              {urlError}
            </div>
          )}

          <div
            className="hero-cats"
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { icon: "🔍", label: "Core SEO" },
              { icon: "🔒", label: "Security" },
              { icon: "♿", label: "Accessibility" },
              { icon: "⚡", label: "Performance" },
              { icon: "🤖", label: "AI Powered" },
              { icon: "📊", label: "Core Web Vitals" },
            ].map((b) => (
              <span
                key={b.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "5px 14px",
                  borderRadius: 40,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#666",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.color = "#999";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#666";
                }}
              >
                <span style={{ fontSize: 13 }}>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      {!lh && !loading && (
        <div
          style={{ maxWidth: 860, margin: "0 auto 64px", padding: "0 24px" }}
        >
          <StaggerGrid
            className="stats-grid"
            stagger={90}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
            }}
          >
            <StatBadge
              value="50+"
              label="Audit Checks"
              icon={<CheckCircle size={18} />}
            />
            <StatBadge
              value="4"
              label="Score Categories"
              icon={<BarChart2 size={18} />}
            />
            <StatBadge
              value="AI"
              label="Recommendations"
              icon={<Sparkles size={18} />}
            />
            <StatBadge
              value="Free"
              label="No signup needed"
              icon={<Star size={18} />}
            />
          </StaggerGrid>
        </div>
      )}

      {/* ── ERROR ────────────────────────────────────────────────────── */}
      {error && (
        <Reveal
          style={{ maxWidth: 860, margin: "0 auto 32px", padding: "0 24px" }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              background: "#130000",
              border: `1px solid ${C.red}44`,
              borderRadius: 12,
              padding: "14px 18px",
              color: C.red,
              fontSize: 14,
            }}
          >
            <AlertTriangle size={16} />
            {error}
          </div>
        </Reveal>
      )}

      {loading && <ScanLoader url={url} />}

      {/* ── REPORT ───────────────────────────────────────────────────── */}
      {lh && !loading && (
        <div
          style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}
        >
          {/* Action buttons */}
          <Reveal delay={0} style={{ marginBottom: 32 }} className="no-print">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={download}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#ccc",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#ccc";
                }}
              >
                <Download size={14} /> Download Report
              </button>
              <button
                onClick={share}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 18px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: copied ? C.green : "#ccc",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}{" "}
                {copied ? "Copied!" : "Copy Report Link"}
              </button>
            </div>
          </Reveal>

          {/* Score circles */}
          <SecHead
            id="sec-scores"
            icon={<Activity size={16} />}
            title="Overall Scores"
            subtitle={`${strategy.charAt(0).toUpperCase() + strategy.slice(1)} audit via Aedrea`}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))",
              gap: 14,
              marginBottom: 48,
            }}
          >
            <CircleScore score={pScore} label="Performance" />
            <CircleScore score={sScore} label="SEO" />
            <CircleScore score={aScore} label="Accessibility" />
            <CircleScore score={bScore} label="Best Practices" />
          </div>

          {/* Page Details */}
          <SecHead
            id="sec-page"
            icon={<FileSearch size={16} />}
            title="Page Details"
            subtitle="On-page SEO elements, crawlability & indexation status"
          />
          <PageDetailsSection audits={audits} lh={lh} />

          {/* Chart */}
          <Reveal delay={100} style={{ marginBottom: 48 }}>
            <div
              style={{ ...glass, borderRadius: 20, padding: "24px 24px 16px" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <BarChart3 size={15} color={C.orange} />
                <span style={{ color: "#ddd", fontSize: 14, fontWeight: 700 }}>
                  Score Overview
                </span>
              </div>
              <BarChart data={chartData} />
            </div>
          </Reveal>

          {/* Core Web Vitals */}
          <SecHead
            id="sec-vitals"
            icon={<TrendingUp size={16} />}
            title="Core Web Vitals"
            subtitle="Google's real-world performance signals — key ranking factors"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <MetricCard
              audit={audits["first-contentful-paint"]}
              description="Time until first content appears. Under 1.8s is Good."
            />
            <MetricCard
              audit={audits["largest-contentful-paint"]}
              description="Time until main content loads. Google recommends under 2.5s."
            />
            <MetricCard
              audit={audits["total-blocking-time"]}
              description="Time the main thread was blocked. High TBT signals slow JS."
            />
            <MetricCard
              audit={audits["speed-index"]}
              description="How quickly contents are visually populated."
            />
            <MetricCard
              audit={audits["interactive"]}
              description="Time for the page to become fully interactive."
            />
            <MetricCard
              audit={audits["cumulative-layout-shift"]}
              description="Measures visual stability. Unexpected shifts hurt UX and rankings."
            />
          </div>

          <VitalsElements audits={audits} />

          {/* ── NEW: Website Speed Analysis ────────────────────────── */}
          <WebsiteSpeedSection audits={audits} pScore={pScore} />

          {/* ── NEW: SEO Authority Overview ─────────────────────────── */}
          <SEOAuthoritySection audits={audits} lh={lh} />

          {/* Resource Breakdown */}
          <SecHead
            id="sec-resources"
            icon={<BarChart2 size={16} />}
            title="Page Resources & Diagnostics"
            subtitle="Request counts, file sizes, DOM complexity & CPU load breakdown"
          />
          <ResourceBreakdown audits={audits} />

          <Reveal
            delay={70}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 14,
              marginBottom: 48,
            }}
          >
            <MainThreadBreakdown audits={audits} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <DOMSizeDetails audits={audits} />
              <ServerLatencySection audits={audits} />
            </div>
          </Reveal>

          {/* Opportunities */}
          <SecHead
            id="sec-opps"
            icon={<Zap size={16} />}
            title="Performance Opportunities"
            subtitle="Issues impacting your load speed — click to see affected files & savings"
          />
          <Reveal delay={50} style={{ marginBottom: 16 }}>
            <div>
              {opps.map((key) =>
                audits[key] ? <OppCard key={key} audit={audits[key]} /> : null,
              )}
            </div>
          </Reveal>

          <ThirdPartySection audits={audits} />
          <JSBootupSection audits={audits} />
          <CacheAnalysis audits={audits} />
          <NetworkRequestsSection audits={audits} />

          <div style={{ marginBottom: 32 }} />

          {/* Technical SEO */}
          <SecHead
            id="sec-seo"
            icon={<Shield size={16} />}
            title="Technical SEO Checker"
            subtitle="On-page and crawlability health checks"
          />
          <Reveal delay={80} style={{ marginBottom: 16 }}>
            <div
              style={{ ...glass, borderRadius: 20, padding: "4px 22px 8px" }}
            >
              {seoChecks.map(({ key, title, tip }) => {
                const a = audits[key];
                if (!a) return null;
                const pass =
                  a.score === 1 ? true : a.score === 0 ? false : null;
                const desc =
                  a.score < 1 ? a.displayValue || stripMd(a.description) : tip;
                return (
                  <SEORow key={key} pass={pass} title={title} desc={desc} />
                );
              })}
            </div>
          </Reveal>

          <ImagesAnalysis audits={audits} />

          <div style={{ marginBottom: 32 }} />

          {/* Accessibility Details */}
          <SecHead
            id="sec-access"
            icon={<Eye size={16} />}
            title="Accessibility Details"
            subtitle="WCAG compliance, ARIA, color contrast & keyboard navigation checks"
          />
          <AccessibilityDetails audits={audits} />

          {/* Screenshot */}
          {shot && (
            <>
              <SecHead
                icon={<Eye size={16} />}
                title="Page Preview"
                subtitle={`${strategy} screenshot captured by Lighthouse`}
              />
              <Reveal delay={60} style={{ marginBottom: 48 }}>
                <div style={{ ...glass, borderRadius: 20, overflow: "hidden" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      padding: "10px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                      <div
                        key={c}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: c,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                    <div
                      style={{
                        flex: 1,
                        height: 22,
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 6,
                        marginLeft: 8,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 10,
                      }}
                    >
                      <span style={{ color: "#444", fontSize: 11 }}>
                        {domain || "yourwebsite.com"}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: 20, textAlign: "center" }}>
                    <img
                      src={shot}
                      alt="Page screenshot"
                      style={{
                        maxWidth: "100%",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            </>
          )}

          {/* AI Recommendations */}
          <SecHead
            id="sec-ai"
            icon={<Sparkles size={16} />}
            title="AI Recommendations"
            subtitle="Powered by Claude — priority, SEO impact, speed gain & difficulty"
          />
          <div style={{ marginBottom: 48 }}>
            {aiLoad ? (
              <Reveal>
                <div
                  style={{
                    ...glass,
                    borderRadius: 14,
                    padding: "32px 20px",
                    textAlign: "center",
                  }}
                >
                  <Sparkles
                    size={22}
                    style={{
                      marginBottom: 10,
                      color: C.orange,
                      display: "inline-block",
                      animation: "spin 3s linear infinite",
                    }}
                  />
                  <div style={{ fontSize: 14, color: C.orange }}>
                    Generating AI recommendations…
                  </div>
                  <div style={{ fontSize: 12, color: "#444", marginTop: 6 }}>
                    Claude is analyzing your audit results
                  </div>
                  <div
                    style={{
                      marginTop: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[90, 75, 85].map((w, i) => (
                      <div
                        key={i}
                        style={{
                          height: 52,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.03)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div className="shimmer-sweep" />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ) : aiRecs.length > 0 ? (
              <StaggerGrid
                stagger={100}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {aiRecs.map((rec, i) => (
                  <AICard key={i} rec={rec} index={i} />
                ))}
              </StaggerGrid>
            ) : (
              <div style={{ color: "#333", fontSize: 14, padding: "20px 0" }}>
                No recommendations available.
              </div>
            )}
          </div>

          {/* Summary */}
          <Reveal delay={80}>
            <div
              style={{
                background: `linear-gradient(145deg,${C.orange}0e,transparent 60%)`,
                border: `1px solid ${C.orange}28`,
                borderRadius: 24,
                padding: "44px 32px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                marginBottom: 32,
                animation: "borderGlow 3s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 200,
                  height: 200,
                  background: `radial-gradient(circle,${C.orange}10,transparent 70%)`,
                  pointerEvents: "none",
                  animation: "ambientFloat 5s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  color: C.orange,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".12em",
                  marginBottom: 8,
                }}
              >
                Website SEO Health Summary
              </div>
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 900,
                  color: scoreColor(grade),
                  lineHeight: 1,
                  marginBottom: 10,
                  filter: `drop-shadow(0 0 20px ${scoreColor(grade)}55)`,
                }}
              >
                {grade}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: "#666",
                  maxWidth: 480,
                  margin: "0 auto 28px",
                  lineHeight: 1.7,
                }}
              >
                {grade >= 90
                  ? "Your website has excellent SEO fundamentals and fast performance — well-positioned to rank highly in Google."
                  : grade >= 70
                    ? "Your website has strong SEO fundamentals but performance optimization could improve mobile rankings."
                    : grade >= 50
                      ? "Several technical SEO issues need attention. Fixing these could meaningfully improve your Google rankings."
                      : "Critical improvements are required. Your current scores may be preventing competitive rankings."}
              </div>
              <a
                href="https://aedrea.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: C.orange,
                  color: "#fff",
                  padding: "14px 30px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all .2s",
                  boxShadow: `0 0 20px ${C.orange}44`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.04) translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 0 40px ${C.orange}77`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = `0 0 20px ${C.orange}44`;
                }}
              >
                Get Professional SEO Help <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: `radial-gradient(circle,${C.orange}08,transparent 70%)`,
            pointerEvents: "none",
            animation: "ambientFloat 8s ease-in-out infinite",
          }}
        />
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              Simple Process
            </span>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 900,
                margin: "12px 0 14px",
                letterSpacing: "-.02em",
              }}
            >
              How Our SEO Checker Works
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: 15,
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Get a full technical SEO analysis in under 60 seconds — no signup,
              no credit card, no limits.
            </p>
          </Reveal>
          <StaggerGrid
            className="steps-grid"
            stagger={120}
            style={{ display: "flex", gap: 0, position: "relative" }}
          >
            {howItWorksSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 20px",
                  position: "relative",
                }}
              >
                {i < howItWorksSteps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 40,
                      left: "60%",
                      right: "-40%",
                      height: 1,
                      background: `linear-gradient(90deg,${C.orange}44,transparent)`,
                      zIndex: 0,
                    }}
                  />
                )}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: `linear-gradient(145deg,${C.orange}18,${C.orange}08)`,
                    border: `1px solid ${C.orange}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.orange,
                    marginBottom: 20,
                    position: "relative",
                    zIndex: 1,
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "scale(1.1) rotate(-3deg)";
                    e.currentTarget.style.boxShadow = `0 0 24px ${C.orange}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {step.icon}
                  <span
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: C.orange,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 800,
                    margin: "0 0 10px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#555",
                    fontSize: 13,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── WHAT WE ANALYZE ──────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              Comprehensive Coverage
            </span>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 900,
                margin: "12px 0 14px",
                letterSpacing: "-.02em",
              }}
            >
              What Our Tool Analyzes
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: 15,
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              We check 50+ individual technical and on-page factors across four
              core categories — the same signals Google uses to rank your site.
            </p>
          </Reveal>
          <StaggerGrid
            className="feature-grid"
            stagger={80}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 16,
            }}
          >
            {featureCards.map((card, i) => (
              <FeatureCard key={i} {...card} />
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── WHY AUDITS MATTER ────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            background: `radial-gradient(circle,${C.orange}06,transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            className="why-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <Reveal y={30}>
              <span
                style={{
                  color: C.orange,
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".12em",
                }}
              >
                Why It Matters
              </span>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "clamp(22px,3.5vw,36px)",
                  fontWeight: 900,
                  margin: "12px 0 18px",
                  letterSpacing: "-.02em",
                  lineHeight: 1.2,
                }}
              >
                Slow Sites Lose Rankings — and Revenue
              </h2>
              <p
                style={{
                  color: "#555",
                  fontSize: 14,
                  lineHeight: 1.8,
                  margin: "0 0 24px",
                }}
              >
                Google officially uses page speed and Core Web Vitals as ranking
                signals. A poor technical foundation doesn't just hurt your SEO
                — it directly impacts user experience, conversions, and how long
                people stay on your site.
              </p>
              <StaggerGrid
                stagger={110}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {[
                  {
                    stat: "53%",
                    text: "of mobile users abandon pages that take over 3 seconds to load",
                  },
                  {
                    stat: "1s",
                    text: "improvement in load time can lift conversions by up to 7%",
                  },
                  {
                    stat: "2021",
                    text: "— the year Google made Core Web Vitals an official ranking factor",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      padding: "14px 16px",
                      ...glass,
                      borderRadius: 12,
                      transition: "transform .2s, box-shadow .2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(4px)";
                      e.currentTarget.style.boxShadow = `0 0 0 1px ${C.orange}25, 0 8px 30px rgba(0,0,0,.5)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = glass.boxShadow;
                    }}
                  >
                    <span
                      style={{
                        color: C.orange,
                        fontSize: 22,
                        fontWeight: 900,
                        lineHeight: 1,
                        flexShrink: 0,
                        minWidth: 48,
                      }}
                    >
                      {item.stat}
                    </span>
                    <span
                      style={{ color: "#666", fontSize: 13, lineHeight: 1.5 }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </StaggerGrid>
            </Reveal>
            <StaggerGrid
              stagger={100}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {[
                {
                  title: "Performance Score",
                  desc: "Directly affects your Google search ranking position",
                  icon: <TrendingUp size={15} />,
                  col: C.green,
                },
                {
                  title: "Core Web Vitals",
                  desc: "LCP, FID & CLS — Google's Page Experience signals",
                  icon: <Activity size={15} />,
                  col: C.amber,
                },
                {
                  title: "Mobile Speed",
                  desc: "Google mobile-first indexing uses your mobile performance",
                  icon: <Smartphone size={15} />,
                  col: C.orange,
                },
                {
                  title: "Technical SEO",
                  desc: "Missing tags and errors prevent indexing entirely",
                  icon: <Shield size={15} />,
                  col: "#60a5fa",
                },
                {
                  title: "Accessibility",
                  desc: "Opens your content to more users and aids SEO signal quality",
                  icon: <Eye size={15} />,
                  col: "#a78bfa",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    padding: "16px",
                    ...glass,
                    borderRadius: 14,
                    borderLeft: `3px solid ${item.col}`,
                    transition: "all .25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${item.col}30, 0 8px 30px rgba(0,0,0,.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = glass.boxShadow;
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: item.col + "16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.col,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{ color: "#ddd", fontSize: 13, fontWeight: 700 }}
                    >
                      {item.title}
                    </div>
                    <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </section>

      {/* ── HOW TO IMPROVE YOUR SEO ──────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              Action Plan
            </span>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 900,
                margin: "12px 0 14px",
                letterSpacing: "-.02em",
              }}
            >
              How to Improve Your SEO Score
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: 15,
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              After running your audit, here are the highest-impact fixes most
              sites need.
            </p>
          </Reveal>
          <StaggerGrid
            stagger={70}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              {
                title: "Optimize & Convert Images",
                desc: "Switch to WebP format, compress large files, and add descriptive alt tags. Images are typically the #1 cause of slow LCP scores.",
                effort: "Quick Win",
                time: "1–2 hrs",
              },
              {
                title: "Eliminate Unused JavaScript",
                desc: "Remove or defer JS that isn't needed on page load. Large JS bundles block the main thread and directly increase Total Blocking Time.",
                effort: "Medium",
                time: "2–4 hrs",
              },
              {
                title: "Write Unique Meta Tags",
                desc: "Every page needs a unique title (50–60 chars) and meta description (150–160 chars). These directly affect click-through rates from Google.",
                effort: "Quick Win",
                time: "30 min",
              },
              {
                title: "Fix Render-Blocking Resources",
                desc: "CSS and JS files that load in the <head> block your page from painting. Move non-critical scripts to defer or async loading.",
                effort: "Medium",
                time: "2–4 hrs",
              },
              {
                title: "Enable Text Compression",
                desc: "GZIP or Brotli compression can reduce HTML, CSS and JS transfer size by 60–80%. Usually a one-line server config change.",
                effort: "Quick Win",
                time: "30 min",
              },
              {
                title: "Add Schema Markup",
                desc: "Structured data helps Google understand your content and enables rich results — star ratings, FAQs, products — in search listings.",
                effort: "Medium",
                time: "1–3 hrs",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "20px",
                  ...glass,
                  borderRadius: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  transition: "all .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.orange + "33";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${C.orange}20, 0 16px 40px rgba(0,0,0,.6)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = glass.boxShadow;
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      color: C.orange,
                      fontSize: 12,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <CheckCircle size={12} />
                    {item.title}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background:
                        item.effort === "Quick Win"
                          ? C.green + "18"
                          : "rgba(255,255,255,0.05)",
                      color: item.effort === "Quick Win" ? C.green : "#666",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {item.effort}
                  </span>
                </div>
                <p
                  style={{
                    color: "#555",
                    fontSize: 12,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#444",
                    fontSize: 11,
                  }}
                >
                  <Clock size={11} />
                  {item.time} to implement
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <Reveal style={{ textAlign: "center" }}>
        <WavePath />
      </Reveal>
      {/* ── UNDERSTANDING SCORES ─────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              Deep Dive
            </span>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 900,
                margin: "12px 0 14px",
                letterSpacing: "-.02em",
              }}
            >
              Understanding Your SEO Checker Score
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: 15,
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Each score category measures a different dimension of your
              website's health. Here's what each one means for your rankings.
            </p>
          </Reveal>
          <StaggerGrid
            stagger={100}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              {
                label: "Performance (0–100)",
                color: C.orange,
                icon: <Zap size={16} />,
                what: "Measures how fast your pages load and respond for real users — based on a simulated mobile device on a 4G connection.",
                impact:
                  "Page speed is a confirmed Google ranking signal. Scores below 50 can significantly hurt your position, especially on mobile.",
                good: "Score ≥ 90 is Good, 50–89 Needs Work, below 50 is Poor.",
                tips: "Optimize images, eliminate unused CSS/JS, enable caching and compression.",
              },
              {
                label: "SEO (0–100)",
                color: "#60a5fa",
                icon: <Search size={16} />,
                what: "Checks technical on-page SEO factors — title tags, meta descriptions, structured data, crawlability, and mobile-friendliness.",
                impact:
                  "Missing SEO elements prevent Google from understanding, indexing, and ranking your content. A crawl block means zero rankings.",
                good: "Score ≥ 90 means most technical SEO fundamentals are in place.",
                tips: "Add unique titles and descriptions, fix crawl errors, add schema markup, verify robots.txt.",
              },
              {
                label: "Accessibility (0–100)",
                color: C.green,
                icon: <Shield size={16} />,
                what: "Evaluates how accessible your website is to users with disabilities — screen reader support, keyboard nav, color contrast, ARIA.",
                impact:
                  "Accessibility indirectly affects SEO — it signals quality content and improves user experience signals that Google measures.",
                good: "Score ≥ 90 means your content is accessible to virtually all visitors.",
                tips: "Add alt text to images, improve color contrast, label all form fields, ensure keyboard navigation works.",
              },
              {
                label: "Best Practices (0–100)",
                color: "#a78bfa",
                icon: <Star size={16} />,
                what: "Checks modern web standards — HTTPS, browser error handling, image aspect ratios, deprecated APIs, and security basics.",
                impact:
                  "Best practice violations can reduce trust signals, trigger browser security warnings, and harm crawlability.",
                good: "Score ≥ 90 means your site follows current web standards.",
                tips: "Enforce HTTPS everywhere, fix console errors, update deprecated APIs, use correct image dimensions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  ...glass,
                  borderRadius: 18,
                  padding: "24px 28px",
                  borderLeft: `3px solid ${item.color}`,
                  transition: "transform .25s, box-shadow .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${item.color}30, 0 12px 40px rgba(0,0,0,.6)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = glass.boxShadow;
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: item.color + "16",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 800,
                      margin: 0,
                    }}
                  >
                    {item.label}
                  </h3>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                    gap: 16,
                  }}
                >
                  {[
                    { label: "What it measures", text: item.what },
                    { label: "SEO impact", text: item.impact },
                    { label: "Score thresholds", text: item.good },
                    { label: "How to improve", text: item.tips },
                  ].map((col, j) => (
                    <div key={j}>
                      <div
                        style={{
                          color: item.color,
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: ".08em",
                          marginBottom: 6,
                        }}
                      >
                        {col.label}
                      </div>
                      <div
                        style={{ color: "#666", fontSize: 12, lineHeight: 1.6 }}
                      >
                        {col.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              Got Questions?
            </span>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(24px,4vw,40px)",
                fontWeight: 900,
                margin: "12px 0 14px",
                letterSpacing: "-.02em",
              }}
            >
              SEO Checker Frequently Asked Questions
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: 15,
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Everything you need to know about website SEO checkers and how to
              use this tool.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ ...glass, borderRadius: 24, padding: "8px 32px" }}>
              {faqData.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LEAD GEN CTA ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            background: `radial-gradient(ellipse,${C.orange}12 0%,transparent 65%)`,
            pointerEvents: "none",
            animation: "ambientFloat 6s ease-in-out infinite",
          }}
        />
        <Reveal
          delay={0}
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: 7,
              alignItems: "center",
              marginBottom: 20,
              padding: "6px 14px",
              background: C.orange + "13",
              border: `1px solid ${C.orange}32`,
              borderRadius: 40,
            }}
          >
            <Sparkles size={12} color={C.orange} />
            <span
              style={{
                color: C.orange,
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: ".12em",
              }}
            >
              Professional SEO Services
            </span>
          </div>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(26px,4.5vw,48px)",
              fontWeight: 900,
              margin: "0 0 18px",
              letterSpacing: "-.025em",
              lineHeight: 1.1,
            }}
          >
            Ready to Grow Your
            <br />
            <span style={{ color: C.orange }}>Search Rankings?</span>
          </h2>
          <p
            style={{
              color: "#555",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 500,
              margin: "0 auto 32px",
            }}
          >
            Aedrea Studio helps Delhi NCR businesses and brands improve SEO
            rankings, website speed, Core Web Vitals, and technical SEO — with
            transparent strategies and measurable results.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://aedrea.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.orange,
                color: "#fff",
                padding: "15px 32px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: `0 0 24px ${C.orange}44`,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.04) translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 0 40px ${C.orange}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = `0 0 24px ${C.orange}44`;
              }}
            >
              Get Free Consultation <ArrowRight size={15} />
            </a>
            <a
              href="https://wa.me/917289873340"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ccc",
                padding: "15px 28px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.orange + "66";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "#ccc";
                e.currentTarget.style.transform = "none";
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>
          <StaggerGrid
            stagger={80}
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              "No contracts",
              "Free strategy call",
              "Delhi NCR based",
              "Results-focused",
            ].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  color: "#555",
                  fontSize: 13,
                }}
              >
                <CheckCircle size={13} color={C.orange} />
                {t}
              </div>
            ))}
          </StaggerGrid>
        </Reveal>
      </section>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
