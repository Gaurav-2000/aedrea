import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { gsap } from "gsap";

export default function TalkButton() {
  const vapiRef = useRef(null);
  const [active, setActive] = useState(false);
  const glowRef = useRef(null);

  // Glow animation
  useEffect(() => {
    if (!glowRef.current) return;

    gsap.to(glowRef.current, {
      backgroundPosition: "400% 0%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  // Vapi setup
  useEffect(() => {
    const vapi = new Vapi("c8b36349-057e-47b7-9366-33c8af8ee378");
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      console.log("Call started");
      setActive(true);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setActive(false);
    });

    vapi.on("error", (e) => {
      console.error("Vapi error:", e);
    });
  }, []);

  const start = () => {
    if (!vapiRef.current) return;
    console.log("Starting assistant...");
    vapiRef.current.start("c94f6989-cd5d-4370-a5eb-f7831b85e53d");
  };

  const stop = () => {
    vapiRef.current?.stop();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Glow Layer */}
        <div
          ref={glowRef}
          className={`absolute -inset-[3px] rounded-xl blur-md transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)",
            backgroundSize: "400%",
          }}
        />

        {/* Button */}
        <button
          onClick={active ? stop : start}
          className="relative px-6 py-3 rounded-xl bg-[#111] text-white z-10 shadow-lg"
        >
          {active ? "❌ End Call" : "📞 Support"}
        </button>
      </div>
    </div>
  );
}
