// components/MusicPlayer.jsx
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const srcRef = useRef(src);
  srcRef.current = src;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = () => {
    // Lazy-create audio on first click — avoids 4.3MB download on page load
    if (!audioRef.current) {
      audioRef.current = new Audio(srcRef.current);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.05;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying((p) => !p);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause background music" : "Play background music"}
      className="fixed bottom-10 right-6 z-50 w-12 h-12 border rounded-full cursor-pointer border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-[3px] hover:border-white/50 transition-all duration-300"
    >
      {/* Animated bars */}
      {[1, 2, 3, 4].map((bar) => (
        <span
          key={bar}
          className="w-[1px] rounded-full bg-white"
          style={{
            height: playing ? undefined : "5px",
            animation: playing
              ? `musicBar${bar} 0.${bar + 5}s ease-in-out infinite alternate`
              : "none",
          }}
        />
      ))}

      <style>{`
        @keyframes musicBar1 { from { height: 4px  } to { height: 18px } }
        @keyframes musicBar2 { from { height: 8px  } to { height: 24px } }
        @keyframes musicBar3 { from { height: 12px } to { height: 16px } }
        @keyframes musicBar4 { from { height: 6px  } to { height: 20px } }
      `}</style>
    </button>
  );
}
