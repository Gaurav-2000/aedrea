import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import "./animatedtext.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TEXT =
  "In a world overwhelmed by digital chaos, we stand for clarity. We simplify ideas, sharpen messages, and design with intention—so your brand speaks clearly, confidently, and without distraction.";

const ScrollText = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(textRef.current, {
      type: "words",
      wordsClass: "word",
    });

    // Initial state
    gsap.set(split.words, {
      color: "#7d7c7c",
    });

    // Word-by-word color reveal
    gsap.to(split.words, {
      y: -10,
      color: "#ffff",
      ease: "bounce.out",
      stagger: 1, // controls word-by-word timing
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 50%",
        scrub: true,
      },
    });

    return () => {
      split.revert(); // restore original text
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-section">
      <h1 ref={textRef} className="scroll-text">
        {TEXT}
      </h1>
    </section>
  );
};

export default ScrollText;
