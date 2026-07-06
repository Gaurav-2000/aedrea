
export default function SupportButton({ children = "Get Support", onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="sparkle-btn group relative inline-flex items-center gap-1.5 px-6 py-3 text-[13px] font-medium rounded-full border-0 cursor-pointer whitespace-nowrap transition-all duration-300 focus:outline-none"
        style={{
          "--active": "0",
          background: `radial-gradient(40% 50% at center 100%, hsl(270 calc(var(--active)*97%) 72% / var(--active)), transparent),
                       radial-gradient(80% 100% at center 120%, hsl(260 calc(var(--active)*97%) 70% / var(--active)), transparent),
                       hsl(260 calc(var(--active)*97%) calc((var(--active)*44%) + 12%))`,
        }}
      >
        {/* Spark sweep */}
        <span
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            mask: "linear-gradient(white, transparent 50%)",
            animation: "spin-flip 3.6s infinite steps(2, end)",
          }}
        >
          <span
            className="absolute w-[200%] top-0 left-1/2 -translate-x-1/2 -translate-y-[15%]"
            style={{
              aspectRatio: "1",
              transform: "rotate(-90deg)",
              background:
                "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
              animation: "spin-cw 1.8s linear infinite",
            }}
          />
        </span>

        {/* Backdrop */}
        <span
          className="absolute rounded-full transition-all duration-300"
          style={{ inset: "0.1em", background: "inherit" }}
        />

        {/* Icon */}
        <svg
          className="relative z-10 w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.187 8.096L15 5.25L15.813 8.096C16.023 8.831 16.417 9.501 16.958 10.041C17.498 10.582 18.168 10.976 18.903 11.186L21.75 12L18.904 12.813C18.169 13.023 17.499 13.417 16.959 13.958C16.418 14.498 16.024 15.168 15.814 15.903L15 18.75L14.187 15.904C13.977 15.169 13.583 14.499 13.042 13.959C12.502 13.418 11.832 13.024 11.097 12.814L8.25 12L11.096 11.187C11.831 10.977 12.501 10.583 13.041 10.042C13.582 9.502 13.976 8.832 14.186 8.097L14.187 8.096Z"
            fill="currentColor"
            className="transition-colors duration-300"
            style={{ color: "hsl(0 0% 40%)" }}
          />
          <path
            d="M6 14.25L5.741 15.285C5.593 15.879 5.286 16.421 4.853 16.853C4.421 17.286 3.879 17.593 3.285 17.741L2.25 18L3.285 18.259C3.879 18.407 4.421 18.714 4.853 19.147C5.286 19.579 5.593 20.122 5.741 20.715L6 21.75L6.259 20.715C6.407 20.122 6.714 19.58 7.146 19.147C7.579 18.714 8.121 18.408 8.714 18.259L9.75 18L8.714 17.741C8.121 17.593 7.579 17.286 7.146 16.853C6.714 16.42 6.407 15.878 6.259 15.285L6 14.25Z"
            fill="currentColor"
            className="transition-colors duration-300"
            style={{ color: "hsl(0 0% 20%)" }}
          />
          <path
            d="M6.5 4L6.303 4.592C6.248 4.757 6.155 4.908 6.031 5.031C5.908 5.155 5.757 5.248 5.592 5.303L5 5.5L5.592 5.697C5.757 5.752 5.908 5.845 6.031 5.969C6.155 6.092 6.248 6.243 6.303 6.409L6.5 7L6.697 6.409C6.752 6.243 6.845 6.092 6.969 5.969C7.092 5.845 7.243 5.752 7.409 5.697L8 5.5L7.409 5.303C7.243 5.248 7.092 5.155 6.969 5.031C6.845 4.908 6.752 4.757 6.697 4.592L6.5 4Z"
            fill="currentColor"
            className="transition-colors duration-300"
            style={{ color: "hsl(0 0% 30%)" }}
          />
        </svg>

        {/* Text */}
        <span
          className="relative z-10 transition-all duration-300"
          style={{
            background: "linear-gradient(90deg, hsl(0 0% 65%), hsl(0 0% 26%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {children}
        </span>
      </button>

      <style>{`
        @keyframes spin-flip { to { rotate: 360deg; } }
        @keyframes spin-cw   { to { transform: rotate(90deg); } }

        .sparkle-btn:hover,
        .sparkle-btn:focus-visible {
          --active: 1;
          scale: 1.05;
          box-shadow:
            0 0 1.5em 0.5em hsl(260 97% 61% / 0.65),
            0 0 0 0 hsl(260 97% 80%) inset;
        }
        .sparkle-btn:hover span:last-of-type,
        .sparkle-btn:focus-visible span:last-of-type {
          background: linear-gradient(90deg, hsl(0 0% 100%), hsl(0 0% 80%));
          -webkit-background-clip: text;
          background-clip: text;
        }
        .sparkle-btn:hover svg path,
        .sparkle-btn:focus-visible svg path {
          color: hsl(0 0% 90%) !important;
        }
        .sparkle-btn:active { scale: 0.97; }
        .sparkle-btn::before {
          content: "";
          position: absolute;
          inset: -0.15em;
          z-index: -1;
          border: 0.2em solid hsl(260 97% 50% / 0.5);
          border-radius: 100px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sparkle-btn:hover::before,
        .sparkle-btn:focus-visible::before {
          opacity: 1;
        }
        /* Mobile: tighter padding */
        @media (max-width: 640px) {
          .sparkle-btn { padding: 6px 8px; font-size: 12px; margin-right:2.5rem }

        }
      `}</style>
    </div>
  );
}
