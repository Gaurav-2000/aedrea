import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// ─── Config ──────────────────────────────────────────────────────
const STORAGE_KEY = "aedrea_cookie_consent";
const GA_ID = "G-YKLHJKWMQZ";

// ─── Script injection helpers ────────────────────────────────────
function injectGA() {
  if (document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

function injectAhrefs() {
  if (document.querySelector('script[data-key="FcdEX/Pq3DAxu3iiABvynA"]'))
    return;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://analytics.ahrefs.com/analytics.js";
  s.dataset.key = "FcdEX/Pq3DAxu3iiABvynA";
  document.head.appendChild(s);
}

function loadAnalyticsScripts() {
  injectGA();
  injectAhrefs();
}

// ─── Component ───────────────────────────────────────────────────
export default function CookieConsent({ loaderComplete, onVisibilityChange }) {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const bannerRef = useRef(null);
  const tlRef = useRef(null);

  // Check stored consent and trigger visibility when loader is complete
  useEffect(() => {
    if (!loaderComplete) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      loadAnalyticsScripts();
      return;
    }
    if (stored === "rejected" || stored === "essential") {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, [loaderComplete]);

  // Notify parent of visibility change
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(visible);
    }
  }, [visible, onVisibilityChange]);

  // GSAP slide-up when visible
  useEffect(() => {
    if (!visible || !bannerRef.current) return;

    const el = bannerRef.current;
    gsap.set(el, { y: 30, opacity: 0 });

    tlRef.current = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => tlRef.current?.kill();
  }, [visible]);

  const dismiss = useCallback(() => {
    if (!bannerRef.current) {
      setVisible(false);
      return;
    }

    gsap.to(bannerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    loadAnalyticsScripts();
    dismiss();
  }, [dismiss]);

  const handleEssentialOnly = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "essential");
    dismiss();
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-label="Cookie consent"
      className="cookie-banner-container"
    >
      <style>{`
        .cookie-banner-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 99998;
          pointer-events: auto;
          max-width: 400px;
          width: calc(100% - 48px);
        }
        .cookie-banner-box {
          background: #E8E4DE;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .cookie-banner-title {
          margin: 0;
          color: #000000;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: 'Geist Variable', sans-serif;
          letter-spacing: 0.2px;
        }
        .cookie-banner-text {
          margin: 0;
          color: rgba(0, 0, 0, 0.75);
          font-size: 0.8rem;
          line-height: 1.5;
          font-family: 'Geist Variable', sans-serif;
        }
        .cookie-banner-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .cookie-banner-manage {
          background: none;
          border: none;
          color: rgba(0, 0, 0, 0.55);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          font-size: 0.75rem;
          padding: 0;
          font-family: 'Geist Variable', sans-serif;
          transition: color 0.2s ease;
        }
        .cookie-banner-manage:hover {
          color: #000000;
        }
        .cookie-banner-buttons {
          display: flex;
          gap: 8px;
        }
        .cookie-banner-btn-essential {
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          background: transparent;
          color: #000000;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Geist Variable', sans-serif;
          transition: all 0.2s ease;
        }
        .cookie-banner-btn-essential:hover {
          background: #000000;
          color: #ffffff;
          border-color: #000000;
        }
        .cookie-banner-btn-accept {
          padding: 8px 20px;
          border-radius: 4px;
          border: 1px solid #000000;
          background: #000000;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Geist Variable', sans-serif;
          transition: all 0.2s ease;
        }
        .cookie-banner-btn-accept:hover {
          background: transparent;
          color: #000000;
          border-color: #000000;
        }

        @media (max-width: 640px) {
          .cookie-banner-container {
            left: 12px !important;
            right: 12px !important;
            bottom: 12px !important;
            width: auto !important;
            max-width: none !important;
          }
          .cookie-banner-box {
            padding: 16px !important;
            gap: 12px !important;
          }
          .cookie-banner-title {
            font-size: 0.85rem !important;
          }
          .cookie-banner-text {
            font-size: 0.72rem !important;
            line-height: 1.4 !important;
          }
          .cookie-banner-footer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .cookie-banner-buttons {
            flex-direction: column-reverse !important;
            gap: 6px !important;
            width: 100% !important;
            order: 1 !important;
          }
          .cookie-banner-btn-accept,
          .cookie-banner-btn-essential {
            width: 100% !important;
            text-align: center !important;
            padding: 8px 12px !important;
            font-size: 0.7rem !important;
          }
          .cookie-banner-manage {
            text-align: center !important;
            margin-top: 2px !important;
            font-size: 0.7rem !important;
            order: 2 !important;
          }
        }
      `}</style>
      <div className="cookie-banner-box">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4 className="cookie-banner-title">Cookie Settings</h4>
          <p className="cookie-banner-text">
            We use cookies to analyze site traffic and optimize your experience. Essential cookies are always active.
          </p>
        </div>

        <div className="cookie-banner-footer">
          <button
            onClick={() => setShowPrefs((p) => !p)}
            className="cookie-banner-manage"
          >
            {showPrefs ? "Hide Preferences" : "Manage Preferences"}
          </button>

          <div className="cookie-banner-buttons">
            <button
              onClick={handleEssentialOnly}
              className="cookie-banner-btn-essential"
            >
              Essential Only
            </button>

            <button
              onClick={handleAccept}
              className="cookie-banner-btn-accept"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Expandable preferences panel */}
        {showPrefs && (
          <div
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.1)",
              paddingTop: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={prefRowStyle}>
              <span style={prefLabelStyle}>🔒 Essential / Functional</span>
              <span style={prefBadgeAlways}>Always Active</span>
            </div>
            <div style={prefRowStyle}>
              <span style={prefLabelStyle}>📊 Analytics (Google, Ahrefs)</span>
              <span style={prefBadgeConsent}>Consent Only</span>
            </div>
            <div style={prefRowStyle}>
              <span style={prefLabelStyle}>📢 Marketing (Meta Ads)</span>
              <span style={prefBadgeConsent}>Consent Only</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Preference panel styles ─────────────────────────────────────
const prefRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px 0",
};

const prefLabelStyle = {
  color: "rgba(0, 0, 0, 0.65)",
  fontSize: "0.75rem",
  fontFamily: "'Geist Variable', sans-serif",
};

const prefBadgeAlways = {
  fontSize: "0.65rem",
  fontWeight: 600,
  color: "#000000",
  background: "rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.15)",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  fontFamily: "'Geist Variable', sans-serif",
};

const prefBadgeConsent = {
  fontSize: "0.65rem",
  fontWeight: 600,
  color: "rgba(0, 0, 0, 0.5)",
  background: "transparent",
  border: "1px solid rgba(0, 0, 0, 0.15)",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  fontFamily: "'Geist Variable', sans-serif",
};
