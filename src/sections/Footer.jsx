// import { socialImgs } from "../constants";
// // import logo from "/images/logos/AEDREALogoWhite2.svg";
// // import logo2 from "../../public/images/logos/WordmarkLogoWhite.svg";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="flex flex-row justify-center">
//           {/* <img src={logo2} alt="" className="md:w-4xl my-[-10] " /> */}
//           <p className=" text-7xl font-bold md:-ml-30">AEDREA</p>
//         </div>
//         <div className="socials">
//           {socialImgs.map((socialImg, index) => (
//             <a href={socialImg.url} key={index} className="icon">
//               <img src={socialImg.imgPath} alt="social icon" />
//             </a>
//           ))}
//         </div>
//         <div className="flex flex-col justify-center">
//           <p className="text-center md:text-end">
//             © {new Date().getFullYear()} AEDREA_STUDIO || All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="flex justify-center">
          <a href="#hero" className="text-7xl font-bold tracking-tight">
            AEDREA
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-6 flex flex-col items-center gap-3 text-sm md:flex-row md:justify-center md:gap-8">
          {/* WhatsApp */}
          <a
            href="https://wa.me/9172899873340"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            📱 WhatsApp: +91 7289873340
          </a>

          {/* Email */}
          <a
            href="mailto:aedrea.studio@gmail.com"
            className="hover:opacity-80 transition-opacity"
          >
            ✉️aedrea.studio@gmail.com
          </a>
        </div>

        {/* Social Icons */}
        <div className="socials mt-6">
          {socialImgs.map((socialImg, index) => (
            <a
              href={socialImg.url}
              key={index}
              className="icon hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={socialImg.imgPath} alt="social icon" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Aedrea Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
