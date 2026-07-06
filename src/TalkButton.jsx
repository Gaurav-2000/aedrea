import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SupportButton from "./components/SupportButton";

const VAPI_KEY = import.meta.env.VITE_VAPI_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

export default function TalkButton() {
  const vapiRef = useRef(null);
  const [active, setActive] = useState(false);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.to(glowRef.current, {
      backgroundPosition: "400% 0%",
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  // ← No vapi setup on mount. Load only on first click.
  const initVapi = async () => {
    if (vapiRef.current) return; // already loaded

    const { default: Vapi } = await import("@vapi-ai/web"); // ← 299kB loads here
    const vapi = new Vapi(VAPI_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setActive(true));
    vapi.on("call-end", () => setActive(false));
    vapi.on("error", (e) => console.error("Vapi error:", e));
  };

  const start = async () => {
    await initVapi();
    vapiRef.current?.start(ASSISTANT_ID);
  };

  const stop = () => {
    vapiRef.current?.stop();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div
          ref={glowRef}
          className={`absolute -inset-0.75 rounded-xl blur-md transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)",
            backgroundSize: "400%",
          }}
        />
        <SupportButton onClick={active ? stop : start}>
          {active ? "❌ End Call" : "📞 AI Support"}
        </SupportButton>
      </div>
    </div>
  );
}
