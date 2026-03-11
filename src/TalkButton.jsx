import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function TalkButton() {
  const vapiRef = useRef(null);
  const [active, setActive] = useState(false);

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
    if (!vapiRef.current) {
      console.log("Vapi not initialized");
      return;
    }

    console.log("Starting assistant...");
    vapiRef.current.start("c94f6989-cd5d-4370-a5eb-f7831b85e53d");
  };

  const stop = () => {
    vapiRef.current?.stop();
  };

  return (
    <button
  onClick={active ? stop : start}
  style={{
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: active ? "red" : "#3BE8B0",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 999999999,
    pointerEvents: "auto"
  }}
>
      {active ? "❌" : "📞"}
    </button>
  );
}
