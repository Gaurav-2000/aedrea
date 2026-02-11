// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";

// import React from "react";

// const ScrollText = () => {
//   gsap.registerPlugin(SplitText, ScrollTrigger);

//   let wrapper = document.querySelector(".Horizontal");
//   let text = document.querySelector(".Horizontal__text");
//   let split = SplitText.create(".Horizontal__text", { type: "chars, words" });

//   const scrollTween = gsap.to(text, {
//     xPercent: -100,
//     ease: "none",
//     scrollTrigger: {
//       trigger: wrapper,
//       pin: true,
//       end: "+=5000px",
//       scrub: true,
//     },
//   });

//   split.chars.forEach((char) => {
//     gsap.from(char, {
//       yPercent: "random(-200, 200)",
//       rotation: "random(-20, 20)",
//       ease: "back.out(1.2)",
//       scrollTrigger: {
//         trigger: char,
//         containerAnimation: scrollTween,
//         start: "left 100%",
//         end: "left 30%",
//         scrub: 1,
//       },
//     });
//   });

//   return (
//     <section className="Horizontal">
//       <div className="container">
//         <h3 className="Horizontal__text heading-xl">
//           The containerAnimation property allows us to create ScrollTriggered
//         </h3>
//       </div>
//     </section>
//   );
// };

// export default ScrollText;
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ScrollText = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(textRef.current, {
      type: "chars, words",
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

    split.chars.forEach((char) => {
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

    return () => {
      ScrollTrigger.killAll();
      split.revert();
    };
  }, []);

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="container">
        <h3 className="Horizontal__text heading-xl" ref={textRef}>
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
  );
};

export default ScrollText;
