// components/RedirectButton.jsx
import { useNavigate } from "react-router-dom";

const RedirectButton = ({
  to,
  href,
  target,
  rel,
  type,
  disabled,
  children = "View All Projects",
  className = "",
  onClick,
  ariaLabel,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick();
    if (href) {
      window.open(href, target || "_blank", rel || "noopener noreferrer");
      return;
    }
    if (to) navigate(to);
  };

  const letters = String(children).split("");

  return (
    <button
      type={type || "button"}
      disabled={disabled}
      aria-label={ariaLabel || String(children)}
      onClick={handleClick}
      className={`group flex items-center rounded-4xl gap-3 text-[#ff3c00] hover:bg-white hover:text-black text-xs font-bold tracking-widest uppercase px-8 sm:px-10 py-4 transition-all duration-300 ${className} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {/* Letter stagger wrapper */}
      <span className="flex overflow-hidden">
        {letters.map((char, i) => (
          <span
            key={i}
            className="relative inline-flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {/* Original letter */}
            {char === " " ? "\u00A0" : char}

            {/* Ghost letter below — slides into view on hover */}
            <span className="absolute top-full left-0" aria-hidden="true">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
};

export default RedirectButton;
