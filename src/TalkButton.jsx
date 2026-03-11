import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export default function TalkButton() {
  const vapiRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    vapiRef.current = new Vapi("c8b36349-057e-47b7-9366-33c8af8ee378");

    vapiRef.current.on("call-start", () => setActive(true));
    vapiRef.current.on("call-end", () => setActive(false));

    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  const start = () => vapiRef.current.start("c94f6989-cd5d-4370-a5eb-f7831b85e53d");
  const stop = () => vapiRef.current.stop();

  return (
    <button
      onClick={active ? stop : start}
      style={{
        padding: "15px 25px",
        fontSize: "16px",
        background: active ? "red" : "green",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        position: "relative",
        zIndex: 9999
      }}
    >
      {active ? "End Call" : "Talk to AI"}
    </button>
  );
}
