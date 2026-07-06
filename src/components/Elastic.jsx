import React, { useRef, useEffect } from "react";

export default function WavePath({ className = "", ...props }) {
  const path = useRef(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  const progress = useRef(0);
  const x = useRef(0.5);
  const time = useRef(Math.PI / 2);
  const reqId = useRef(null);
  const lastY = useRef(null);

  const setPath = (progressValue) => {
    const width = svgRef.current
      ? svgRef.current.getBoundingClientRect().width
      : window.innerWidth;

    if (path.current) {
      path.current.setAttribute(
        "d",
        `M0 100 Q${width * x.current} ${100 + progressValue * 0.6}, ${width} 100`,
      );
    }
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  useEffect(() => {
    setPath(progress.current);
    const handleResize = () => setPath(progress.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const manageMouseEnter = () => {
    if (reqId.current) {
      cancelAnimationFrame(reqId.current);
      resetAnimation();
    }
  };

  const manageMouseMove = (e) => {
    const { movementY, clientX } = e;
    if (path.current) {
      const pathBound = path.current.getBoundingClientRect();
      x.current = (clientX - pathBound.left) / pathBound.width;
      progress.current += movementY * 1.5;
      setPath(progress.current);
    }
  };

  const manageMouseLeave = () => animateOut();

  const manageTouchStart = (e) => {
    if (reqId.current) {
      cancelAnimationFrame(reqId.current);
      resetAnimation();
    }
    lastY.current = e.touches[0].clientY;
  };

  const manageTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    if (path.current) {
      const pathBound = path.current.getBoundingClientRect();
      x.current = (clientX - pathBound.left) / pathBound.width;
      const movementY = lastY.current !== null ? clientY - lastY.current : 0;
      lastY.current = clientY;
      progress.current += movementY * 1.5;
      setPath(progress.current);
    }
  };

  const manageTouchEnd = () => {
    lastY.current = null;
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress.current * Math.sin(time.current);
    progress.current = lerp(progress.current, 0, 0.05);
    time.current += 0.9;
    setPath(newProgress);

    if (Math.abs(progress.current) > 0.75) {
      reqId.current = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time.current = Math.PI / 2;
    progress.current = 0;
  };

  return (
    // 👇 outer wrapper: full width, centers the inner container
    <div className={`w-full flex justify-center ${className}`} {...props}>
      {/* 👇 inner container: 100% on mobile, 80% on md+ screens */}
      <div ref={containerRef} className="relative h-px w-full md:w-[95%]">
        <div
          onMouseEnter={manageMouseEnter}
          onMouseMove={manageMouseMove}
          onMouseLeave={manageMouseLeave}
          onTouchStart={manageTouchStart}
          onTouchMove={manageTouchMove}
          onTouchEnd={manageTouchEnd}
          className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
          style={{ touchAction: "none" }}
        />

        <svg ref={svgRef} className="absolute -top-[100px] h-[300px] w-full">
          <path
            ref={path}
            className="fill-none stroke-current"
            strokeWidth={1}
          />
        </svg>
      </div>
    </div>
  );
}
