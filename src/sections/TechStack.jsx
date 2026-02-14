// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";

// import TitleHeader from "../components/TitleHeader";
// // import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
// import { techStackIcons, techStackImgs } from "../constants";
// import TechIcon from "../components/Models/TechLogos/TechIcon";
// // import { techStackImgs } from "../constants";

// const TechStack = () => {
//   // Animate the tech cards in the skills section
//   useGSAP(() => {
//     // This animation is triggered when the user scrolls to the #skills wrapper
//     // The animation starts when the top of the wrapper is at the center of the screen
//     // The animation is staggered, meaning each card will animate in sequence
//     // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
//     gsap.fromTo(
//       ".tech-card",
//       {
//         // Initial values
//         y: 50, // Move the cards down by 50px
//         opacity: 0, // Set the opacity to 0
//         // yoyo: true,
//       },
//       {
//         // Final values
//         y: 0, // Move the cards back to the top
//         opacity: 1, // Set the opacity to 1
//         duration: 1, // Duration of the animation
//         ease: "power2.inOut", // Ease of the animation
//         stagger: 0.3, // Stagger the animation by 0.2 second

//         // yoyo: true,
//         scrollTrigger: {
//           // scrub: true,
//           trigger: "#skills",
//           // pin: true, // Trigger the animation when the user scrolls to the #skills wrapper
//           start: "top bottom", // Start the animation when the top of the wrapper is at the center of the screen
//           // end: "bottom bottom"
//         },
//       },
//     );
//   });

//   return (
//     <div id="skills" className="flex-center section-padding">
//       <div className="w-full h-full md:px-10 px-5">
//         <TitleHeader
//           title="Our Capabilities & Core Expertise"
//           sub="🤝 What we Bring to the Table"
//         />
//         <div className="tech-grid">
//           {/* Loop through the techStackIcons array and create a component for each item.
//               The key is set to the name of the tech stack icon, and the classnames are set to
//               card-border, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg
//               classes are only applied on larger screens. */}
//           {techStackIcons.map((icon) => (
//             <div
//               key={icon.name}
//               className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
//             >
//               {/* The tech-card-animated-bg div is used to create a background animation when the
//                   component is hovered. */}
//               <div className="tech-card-animated-bg" />
//               <div className="tech-card-content">
//                 {/* The tech-icon-wrapper div contains the TechIconCardExperience component,
//                     which renders the 3D model of the tech stack icon. */}
//                 <div className="tech-icon-wrapper">
//                   <TechIcon model={icon} />
//                 </div>
//                 {/* The padding-x and w-full classes are used to add horizontal padding to the
//                     text and make it take up the full width of the component. */}
//                 <div className="padding-x w-full">
//                   {/* The p tag contains the name of the tech stack icon. */}
//                   <p className="md:text-xl md:mb-8">{icon.name}</p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* This is for the img part */}
//           {/* {techStackImgs.map((icon, index) => (
//             <div
//               key={index}
//               className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
//             >
//               <div className="tech-card-animated-bg" />
//               <div className="tech-card-content">
//                 <div className="tech-icon-wrapper">
//                   <img src={icon.imgPath} alt="" />
//                 </div>
//                 <div className="padding-x w-full">
//                   <p>{icon.name}</p>
//                 </div>
//               </div>
//             </div>
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TechStack;

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons } from "../constants";
import TechIcon from "../components/Models/TechLogos/TechIcon";

// Register ScrollTrigger ONCE
gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top-=60 top",
        end: "+=120%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.from(".tech-card", {
      y: 60,
      opacity: 0,
      stagger: 0.25,
      ease: "power2.out",
    });
  });

  return (
    <section id="skills" className=" flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Our Capabilities & Core Expertise"
          sub="🤝 What we Bring to the Table"
        />

        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />

              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={icon} />
                </div>

                <div className="padding-x w-full">
                  <p className="md:text-xl md:mb-8">{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
