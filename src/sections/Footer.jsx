import { socialImgs } from "../constants";
// import logo from "/images/logos/AEDREALogoWhite2.svg";
// import logo2 from "../../public/images/logos/WordmarkLogoWhite.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-row justify-center">
          {/* <img src={logo2} alt="" className="md:w-4xl my-[-10] " /> */}
          <p className=" text-7xl font-bold md:-ml-30">AEDREA</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <img src={socialImg.imgPath} alt="social icon" />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} AEDREA_STUDIO || All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
