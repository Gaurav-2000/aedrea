import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ScrollText = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const splitRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    let ctx = null;
    let cancelled = false;

    // Defer SplitText to next frame so React's DOM paint is complete
    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        splitRef.current = new SplitText(textRef.current, {
          type: "chars,words",
        });

        const scrollTween = gsap.to(textRef.current, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            end: "+=5000",
            scrub: true,
          },
        });

        splitRef.current.chars.forEach((char) => {
          gsap.from(char, {
            yPercent: gsap.utils.random(-200, 200),
            rotation: gsap.utils.random(-20, 20),
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 100%",
              end: "left 30%",
              scrub: 1,
            },
          });
        });
      }, wrapperRef);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ctx?.revert();
      splitRef.current?.revert();
    };
  }, []);

  return (
    <div>
      <section className="Horizontal" ref={wrapperRef}>
        <div className="container">
          <h3
            className="Horizontal__text heading-xl"
            ref={textRef}
            style={{ willChange: "transform" }}
          >
            We <span className="spanTextBlue">design</span> websites that earn{" "}
            <span className="spanTextOrange">attention</span>.
            <br />
            Not <span className="spanTextBlue">templates.</span> Not{" "}
            <span className="spanTextOrange">trends.</span>
            <br />
            Built for <span className="spanTextOrange">clarity</span> and{" "}
            <span className="spanTextBlue">conversion</span>.
          </h3>
        </div>
      </section>
    </div>
  );
};

export default ScrollText;
