const navLinks = [
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Services",
    link: "#services",
  },
  {
    name: "Tools",
    link: "#tools",
  },
  // {
  //   name: "Testimonials",
  //   link: "#testimonials",
  // },
];

const words = [
  { text: "Perform", imgPath: "/images/ideas.svg" },
  { text: "Convert", imgPath: "/images/concepts.svg" },
  { text: "Scale", imgPath: "/images/designs.svg" },
  { text: "Last", imgPath: "/images/code.svg" },
  { text: "Perform", imgPath: "/images/ideas.svg" },
  { text: "Convert", imgPath: "/images/concepts.svg" },
  { text: "Scale", imgPath: "/images/designs.svg" },
  { text: "Last", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 1, suffix: "+", label: "Years of Experience" },
  { value: 14, suffix: "+", label: "Satisfied Clients" },
  { value: 22, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "Frontend Development",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend & API Development",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Scalable System Architecture",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive & Animated Experiences",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Planning & Delivery",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    reviewTitle: "Why Work With Us",
    review: [
      "1. We focus on clarity, performance, and usability — not unnecessary complexity.",
      "2. Every project is built with real users and real business goals in mind.",
      "3. We work closely with clients to deliver clean, scalable, and maintainable solutions.",
    ],
    // imgPath: "/images/exp1.png",
    logoPath: "/images/logos/programming.png",
    title: "Web Design & Development Services",
    date: "Custom Websites • Modern UI • Performance-Focused Builds",
    responsibilities: [
      "Design and develop custom websites tailored to your brand, goals, and audience.",
      "Build modern, responsive UIs that look sharp on mobile, tablet, and desktop.",
      "Develop websites using React, modern JavaScript, and animation tools for engaging user experiences",
      // "Performance optimization for better load times and smoother interactions.",
      // "Clear communication, transparent workflow, and on-time delivery.",
    ],
  },
  {
    reviewTitle: "Our Approach",
    review: [
      "1. Understand your business, audience, and goals before writing a single line of code.",
      "2. Design with purpose — every element has a reason.",
      "3. Build fast, reliable websites that are easy to scale and maintain.",
    ],
    // imgPath: "/images/exp2.png",
    logoPath: "/images/logos/social-media.png",
    title: "Social Media Management",
    date: "Building presence, not just posting",
    responsibilities: [
      "Create and manage consistent, on-brand content that reflects your business voice.",
      "Plan and schedule posts to maintain regular engagement across platforms.",
      "Monitor performance and refine content to grow reach and audience trust.",
    ],
  },
  {
    reviewTitle: "What You Can Expect",
    review: [
      "1. Clear communication and transparent workflow.",
      "2. Modern design paired with solid technical execution.",
      "3. Solutions that balance aesthetics, performance, and usability.",
    ],
    // imgPath: "/images/exp3.png",
    logoPath: "/images/logos/performance.png",
    title: "Basic SEO Services",
    date: "Helping your website get found",
    responsibilities: [
      "Optimize website structure, content, and metadata for search engine visibility.",
      "Improve page speed, mobile usability, and SEO fundamentals for better rankings.",
      "Set up essential SEO tools and best practices for long-term organic growth.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    url: "https://www.instagram.com/aedrea.studio/",
  },

  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://www.instagram.com/aedrea.studio/",
  },
  {
    name: "Whatsapp",
    imgPath: "/images/whatsapp2.png",
    url: "https://wa.me/917289873340",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
