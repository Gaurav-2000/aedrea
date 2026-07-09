const navLinks = [
  { name: "Home", link: "/" },
  { name: "AboutUs", link: "/about" },
  { name: "OurWorks", link: "/our-works" },
  { name: "Services", link: "/services" }, // ← full page navigate
  { name: "Pricing", link: "https://leados-kappa.vercel.app/" },
  { name: "Seo-Checker", link: "/seo-checker" }, // ← full page navigate
  { name: "ContactUs", link: "/contact" }, // ← full page navigate
  { name: "LeadOS Login", link: "https://leados-kappa.vercel.app/" },
];
const counterItems = [
  { value: 1, suffix: "+", label: "Years of Experience" },
  { value: 14, suffix: "+", label: "Satisfied Clients" },
  { value: 22, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const heroProjects = [
  {
    id: "project1Ref",
    title: "Puniya Global",
    desc: "Full corporate website for an aluminium manufacturing company — parallax hero, canvas animations, mega navbar, product catalogue, and smooth scroll.",
    image: "/images/projects/puniya-global.webp",
    live: "https://puniyaglobal.com",
  },
  {
    id: "project2Ref",
    title: "Voyara Travels",
    desc: "Plan your dream trip from India — honeymoons, family vacations, solo adventures. Everything managed for you, from flights to experiences.",
    image: "/images/projects/voyara-travels.webp",
    live: "https://voyaratravel.vercel.app/",
  },
  {
    id: "project3Ref",
    title: "Prestige Properties",
    desc: "Browse verified properties across Delhi NCR, Mumbai, Bangalore and more. Expert advisors. Zero hidden charges. Seamless experience.",
    image: "/images/projects/RealEstate.webp",
    live: "https://prestige-propertiess.vercel.app/",
  },
];

const projects = [
  {
    id: "01",
    title: "Puniya Global",
    subtitle: "Aluminium Manufacturer — Corporate Website",
    category: "Web Development",
    tags: ["React", "Vite", "GSAP", "Parallax", "Canvas"],
    year: "2025",
    client: "Puniya Global Pvt. Ltd.",
    location: "Delhi NCR",
    industry: "Manufacturing",
    description:
      "Full corporate website for an aluminium manufacturing company. Feature-rich build with parallax hero, canvas animations, mega navbar, product catalogue, and smooth scroll — 3000+ lines of production code.",
    highlights: [
      "Parallax hero with canvas particle animation",
      "Mega navbar with dropdown product categories",
      "GSAP scroll-triggered section reveals",
      "Vercel deployment with custom domain",
      "Mobile-first responsive across all breakpoints",
    ],

    image: "/images/projects/puniya-global.webp", // replace with actual
    live: "https://puniyaglobal.com",
    featured: true,
  },
  {
    id: "02",
    title: "Pixel Purity",

    subtitle: "Award-Inspired Creative Portfolio Experience",

    category: "Creative Development",

    tags: [
      "React",
      "GSAP",
      "Three.js",
      "Framer Motion",
      "UI/UX"
    ],

    year: "2026",

    client: "Concept Project",

    location: "Global",

    industry: "Creative Portfolio",

    description:
      "A premium portfolio experience inspired by modern award-winning digital agencies. Designed to showcase creative work through immersive interactions, smooth animations, refined typography, and a highly polished user experience.",

    highlights: [
      "Immersive scroll-based storytelling",
      "Smooth GSAP-powered page transitions",
      "Minimal and premium visual direction",
      "Responsive experience across all devices",
      "Performance-focused frontend architecture",
      "Creative interaction and motion design"
    ],

    image: "/images/projects/pixelpurity.webp",

    live: "https://pixelpurity.vercel.app",

    featured: true
  }
  , {
    id: "03",
    title: "Sarave Perfumes",

    subtitle: "Luxury Fragrance E-Commerce Experience",

    category: "E-Commerce Development",

    tags: [
      "NextJs",
      "Supabase",
      "Razorpay",
      "Shiprocket",
      "E-Commerce",
      "PostGres"

    ],

    year: "2026",

    client: "Sarave Perfumes",

    location: "India",

    industry: "Luxury Fragrances",

    description:
      "An upcoming premium e-commerce platform designed for Sarave Perfumes, focused on delivering a luxurious digital shopping experience. The website combines elegant visual storytelling, immersive product presentation, and seamless user journeys to reflect the sophistication of the brand.",

    highlights: [
      "Luxury-inspired visual design",
      "Immersive product showcase experience",
      "Conversion-focused e-commerce journey",
      "Smooth animations and micro-interactions",
      "Mobile-first responsive design",
      "Optimized performance and scalability"
    ],

    image: "/images/projects/sarave.webp",

    live: "https://saraveperfume.vercel.app/",

    status: "In Development",

    featured: true
  }

  ,
  {
    id: "04",
    title: "Voyara Travels",

    subtitle: "Modern Travel & Tour Booking Website",

    category: "Web Development",

    tags: [
      "React",
      "Travel Booking",
      "Responsive Design",
      "Modern UI/UX",
      "Interactive Animations",
      "Performance Optimized",
    ],

    year: "2025",

    client: "Voyara Travels",

    location: "India",

    industry: "Travel & Tourism",

    description:
      "A modern travel platform designed to help users plan unforgettable journeys with curated vacation packages, smooth browsing experiences, and visually immersive destination showcases.",

    highlights: [
      "Destination-focused landing sections",
      "Smooth animated scrolling experience",
      "Interactive travel package showcases",
      "Mobile-first responsive design",
      "Lead-focused booking and inquiry flow",
    ],

    image: "/images/projects/voyara-travels.webp",

    live: "https://voyaratravel.vercel.app/",

    featured: true,
  },
  {
    id: "05",
    title: "Prestige Properties",
    subtitle: "Luxury Real Estate Company Website",
    category: "Web Development",
    tags: [
      "React",
      "Property Listings",
      "Modern UI/UX",
      "Responsive Design",
      "Interactive Animations",
      "Performance Optimized",
    ],
    year: "2025",
    client: "Prestige Properties",
    location: "Delhi, India",
    industry: "Real Estate",
    description:
      "A modern real estate platform designed for showcasing premium residential and commercial properties with immersive visuals, smooth interactions, and a high-conversion user experience.",
    highlights: [
      "Dynamic property showcase sections",
      "Interactive property gallery experience",
      "Smooth GSAP-powered animations",
      "Responsive design across all devices",
      "Lead-focused contact and inquiry forms",
    ],

    image: "/images/projects/RealEstate.webp",
    live: "https://prestige-propertiess.vercel.app/",
    featured: true,
  },
  {
    id: "06",
    title: "WhatsApp AI Agent",
    subtitle: "Auto-reply & Lead Capture System",
    category: "AI Automation",
    tags: ["WATI", "OpenAI", "GPT-4", "WhatsApp Business", "Webhook"],
    year: "2025",
    client: "Delhi Manufacturing Client",
    location: "Bawana Industrial Area, Delhi",
    industry: "B2B Manufacturing",

    image: "/images/whatsapp-Chatbot.webp",
    live: null,
    featured: false,
  },
  {
    id: "07",
    title: "Voice AI Receptionist",
    subtitle: "24/7 Hindi/English Call Handler",
    category: "AI Automation",
    tags: ["Vapi.ai", "Twilio", "OpenAI", "Hindi NLP", "Webhooks"],
    year: "2025",
    client: "Delhi NCR Service Business",
    location: "Delhi NCR",
    industry: "Service Industry",

    image: "/images/AI-calling.jpg",
    live: null,
    featured: false,
  },
  {
    id: "08",
    title: "E-Commerce Brand Launch",
    subtitle: "Amazon & Flipkart Resale with Custom Branding",
    category: "E-Commerce",
    tags: ["Amazon Seller", "Flipkart", "Product Branding", "Catalogue Design"],
    year: "2025",
    client: "AEDREA Internal Venture",
    location: "Sadar Bazar, Delhi",
    industry: "Retail / E-Commerce",

    image: "/images/ecommerce.jpg",
    live: null,
    featured: false,
  },
  {
    id: "09",
    title: "AI Ad Creative System",
    subtitle: "GPT + DALL·E Powered Ad Generator",
    category: "AI Automation",
    tags: ["GPT-4", "DALL·E", "Meta Ads", "Google Ads", "Automation"],
    year: "2025",
    client: "AEDREA Internal Tool",
    location: "Remote",
    industry: "Digital Marketing",

    image: "/images/ad-creative.jpg",
    live: null,
    featured: false,
  },
];

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "3", label: "AI Products Built" },
  { value: "2025", label: "Year Founded" },
];

const categories = ["All", "Web Development", "AI Automation", "E-Commerce"];

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
    name: "Claude",
    imgPath: "https://cdn.simpleicons.org/claude/white",
  },
  {
    name: "n8n",
    imgPath: "https://cdn.simpleicons.org/n8n/white",
  },
  { name: "Make", imgPath: "https://cdn.simpleicons.org/make/white" },
  // {
  //   name: "Hugging Face",
  //   imgPath: "https://cdn.simpleicons.org/huggingface/white",
  // },
  { name: "LangChain", imgPath: "https://cdn.simpleicons.org/langchain/white" },
  {
    name: "Cursor",
    imgPath: "https://cdn.simpleicons.org/cursor/white",
  },
];

const expCards = [
  // ─── FOUNDATION TIER ───────────────────────────────────────────────────────────

  {
    reviewTitle: "Why Work With Us",
    review: [
      "1. We focus on clarity, performance, and usability — not unnecessary complexity.",
      "2. Every project is built with real users and real business goals in mind.",
      "3. We work closely with clients to deliver clean, scalable, and maintainable solutions.",
    ],
    logoPath: "/images/logos/programming.png",
    title: "Web Design & Development",
    date: "Custom Websites • Modern UI • Performance-Focused Builds",
    responsibilities: [
      "Design and develop custom websites tailored to your brand, goals, and audience.",
      "Build modern, responsive UIs that look sharp on mobile, tablet, and desktop.",
      "Develop websites using React, modern JavaScript, and animation tools for engaging user experiences.",
    ],
  },

  {
    reviewTitle: "What You Can Expect",
    review: [
      "1. A brand identity that feels intentional — not templated.",
      "2. Every visual decision backed by strategy and audience understanding.",
      "3. Consistent assets delivered across all formats, ready to use immediately.",
    ],
    logoPath: "/images/logos/branding.png",
    title: "Brand Identity & Design",
    date: "Logo • Visual Language • Brand Guidelines",
    responsibilities: [
      "Design a complete visual identity — logo, colour palette, typography, and brand voice.",
      "Create brand guidelines so every touchpoint looks and feels consistent.",
      "Deliver all assets in formats ready for web, print, social, and beyond.",
    ],
  },

  // ─── FLAGSHIP RETAINER ─────────────────────────────────────────────────────────
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

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/logos/instagram.png",
    url: "https://www.instagram.com/aedrea.studio/",
  },

  {
    name: "linkedin",
    imgPath: "/images/logos/linkedin.png",
    url: "https://www.linkedin.com/in/aedrea-studio-479a033b0",
  },
  {
    name: "Whatsapp",
    imgPath: "/images/logos/whatsappL.png",
    url: "https://wa.me/917289873340",
  },
  {
    name: "Facebook",
    imgPath: "/images/logos/facebook.png",
    url: "https://www.facebook.com/aedrea.studio",
  },
];

const values = [
  {
    num: "01",
    title: "Clarity Over Complexity",
    desc: "We strip away the unnecessary. Every design decision, every line of code has a purpose — your business outcome.",
  },
  {
    num: "02",
    title: "Local Roots, Global Standards",
    desc: "Delhi NCR mein hain, but we build to international quality. Manufacturing clients, B2B companies — real businesses, real results.",
  },
  {
    num: "03",
    title: "AI-First Thinking",
    desc: "We don't bolt on AI as an afterthought. Every solution we build considers how automation and intelligence can give you an unfair advantage.",
  },
  {
    num: "04",
    title: "Long-Term Partnership",
    desc: "Ek project deliver karke bhag nahi jaate. We stay, iterate, and grow with you — that's why clients come back.",
  },
];

const timeline = [
  {
    year: "Nov 2025",
    title: "AEDREA Founded",
    desc: "Started as a freelance web design studio in Delhi, building websites for local businesses.",
  },
  {
    year: "Dec 2025",
    title: "First Client Projects",
    desc: "Shifted to production-grade React builds. Delivered first corporate website with GSAP animations and Three.js.",
  },
  {
    year: "Feb 2026",
    title: "AI Services Launched",
    desc: "Integrated OpenAI, WATI, Vapi.ai , and N8N.io into client solutions. WhatsApp AI and Voice Receptionist products launched.",
  },
  {
    year: "Mar 2026",
    title: "AI-Powered Growth Studio",
    desc: "Full repositioning — AEDREA becomes a complete AI-powered digital growth studio targeting Delhi NCR's belt.",
  },
];

const team = [
  {
    name: "Deepak Lakwal",
    role: "Founder & Developer",
    initial: "D",
    color: "#FF6B35",
    photo: "/images/deepak-lakwal.webp", // or a full URL
  },
  {
    name: "Gaurav Kumar",
    role: "Co-Founder & AI Specialist",
    initial: "G",
    color: "#4ECDC4",
    photo: "./images/gaurav.jpeg", // shows initials fallback
  },
];
const stack = [
  { name: "React / Vite", category: "Frontend" },
  { name: "GSAP + Lenis", category: "Animation" },
  { name: "Three.js", category: "3D / WebGL" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "OpenAI GPT-4", category: "AI" },
  { name: "Vapi.ai", category: "Voice AI" },
  { name: "WATI", category: "WhatsApp AI" },
  { name: "Hostinger", category: "Deployment" },
  { name: "N8N.io", category: "AI Automation" },
  { name: "Figma", category: "Design" },
  { name: "EmailJS", category: "Communication" },
  { name: "Twilio", category: "Telephony" },
  { name: "Node.js", category: "Backend" },
];

const marqueeItems = [
  "Founded in Delhi",
  "AI-Powered Studio",
  "React Specialists",
  "Manufacturing Clients",
  "B2B Digital Growth",
  "GSAP Animations",
  "WhatsApp Automation",
  "Voice AI",
  "Honest Work",
  "Nangloi Delhi",
  "No Fluff",
  "Real Results",
];

const steps = [
  {
    num: "01",
    title: "Discovery & Audit (Free)",
    desc: "We map your current workflow, find the biggest time-drains, and identify exactly which automations will give you the highest ROI first.",
  },
  {
    num: "02",
    title: "Automation Blueprint",
    desc: "You get a detailed flowchart showing every trigger, action, and integration — approved by you before we build anything.",
  },
  {
    num: "03",
    title: "Build & Integrate",
    desc: "We connect your tools (WhatsApp, CRM, website, ads) and configure each automation with proper testing on real data.",
  },
  {
    num: "04",
    title: "Test & Harden",
    desc: "Every flow is stress-tested with edge cases. We ensure error handling, fallbacks, and alerts are properly set up.",
  },
  {
    num: "05",
    title: "Go Live + Train",
    desc: "We launch, hand over full access, and train your team. Documentation included — you're never dependent on us.",
  },
];

const techStack = [
  {
    badge: "MAKE / N8N",
    desc: "Visual automation builders — connect any app with powerful logic, filters, and error handling. No-code and pro-code.",
  },
  {
    badge: "VAPI.AI",
    desc: "Production-grade voice AI for inbound/outbound call automation. Natural conversations, custom scripts.",
  },
  {
    badge: "WATI / 360DIALOG",
    desc: "Official WhatsApp Business API providers for broadcast, chatbot, and two-way messaging at scale.",
  },
  {
    badge: "OPENAI / CLAUDE",
    desc: "LLM backbone for intelligent chatbots, lead qualification, and dynamic response generation.",
  },
  {
    badge: "ZAPIER / PABBLY",
    desc: "Lightweight integrations for CRM sync, email triggers, Google Sheets, and 5,000+ app connections.",
  },
];

const deliverables = [
  "Full automation flowchart (documented)",
  "All integrations configured & tested",
  "Error handling + fallback logic",
  "Admin dashboard / monitoring access",
  "WhatsApp / call script copy included",
  "1 month free support post-launch",
  "Team training + handoff documentation",
  "Ongoing retainer available (optional)",
];

const plans = [
  {
    name: "Starter Automation",
    price: "₹8,000",
    priceSuffix: "– ₹18,000",
    billing: "one-time setup",
    timeline: "Best for solo founders & local shops",
    popular: false,
    features: [
      "1–2 automation flows",
      "WhatsApp auto-reply setup",
      "Basic lead capture → notify",
      "Google Sheets / form integration",
      "7-day setup & testing",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth Automation",
    price: "₹20,000",
    priceSuffix: "– ₹45,000",
    billing: "one-time setup",
    timeline: "Ideal for growing SMEs & agencies",
    popular: true,
    features: [
      "4–6 automation flows",
      "WhatsApp + Email drip sequences",
      "AI chatbot (website or Instagram)",
      "CRM pipeline automation",
      "Lead scoring + routing",
      "1 month post-launch support",
    ],
    cta: "Book a Call →",
  },
  {
    name: "Full-Stack Automation",
    price: "₹60,000",
    priceSuffix: "+ custom",
    billing: "one-time + optional retainer",
    timeline: "Best for scaling businesses",
    popular: false,
    features: [
      "Unlimited automation flows",
      "AI Voice Call Assistant (Vapi.ai)",
      "Full CRM + payment integration",
      "Review & referral automation",
      "Internal workflow automation",
      "Priority support + retainer option",
    ],
    cta: "Let's Talk",
  },
];

const services = [
  "Web Design & Development",
  "AI Chatbot",
  "WhatsApp AI Agent",
  "Voice AI Receptionist",
  "AI Optimized SEO",
  "Monthly Growth Retainer",
  "Other",
];

const infoCards = [
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+91 7289873340",
    sub: "Usually replies within 2 hours",
    href: "https://wa.me/917289873340",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "support@aedrea.com",
    sub: "For detailed project briefs",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=support@aedrea.com&su=Project%20Discussion&body=Hi%20Aedrea%20Team,%0A%0AProject:%0ABudget:%0ATimeline:",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Pitampura, New Delhi",
    sub: "Serving Delhi NCR & beyond",
    href: null,
  },
  {
    icon: "⚡",
    label: "Response Time",
    value: "Within 2 Hours",
    sub: "Mon – Sat, 10am – 8pm IST",
    href: null,
  },
];

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "A simple landing page usually takes 5–7 days, while a full corporate website with custom design and advanced features can take 2–4 weeks depending on the project scope.",
  },
  {
    q: "Do you only work with clients in Delhi NCR?",
    a: "No — we work with businesses across India and internationally. Most projects are handled remotely through calls, WhatsApp, and email, with in-person meetings available when needed.",
  },
  {
    q: "What do I need to get started with an AI system?",
    a: "We just need basic business information like your services, products, FAQs, and workflow details. We handle the setup, automation, integration, and deployment.",
  },
  {
    q: "What is the minimum project budget?",
    a: "Website projects usually start from ₹15,000 depending on scope, while AI automation solutions vary based on complexity. We provide custom quotes based on your actual business needs.",
  },
  {
    q: "Do you provide support after project delivery?",
    a: "Yes — we offer ongoing maintenance, updates, AI system management, and priority support to ensure your business keeps running smoothly after launch.",
  },
];

const SeoSteps = [
  {
    num: "01",
    title: "Free SEO Audit",
    desc: "We crawl your site, analyze keyword positions, check backlink profile, and identify the top 3 quick-win opportunities within 48 hours.",
  },
  {
    num: "02",
    title: "Keyword & Competitor Research",
    desc: "We map your full keyword universe — high intent, local, long-tail — and reverse-engineer what your top competitors are ranking for.",
  },
  {
    num: "03",
    title: "On-Page & Technical Fixes",
    desc: "Month 1 is fixing the foundation: site speed, indexation, metadata, internal links, and schema markup. This unlocks rankings fast.",
  },
  {
    num: "04",
    title: "Content & Link Building",
    desc: "Month 2+ we build authority — targeted blog content, guest posts, digital PR, and high-DA backlinks from relevant sources.",
  },
  {
    num: "05",
    title: "Monthly Reports & Iteration",
    desc: "Every month you get a clear rank tracking report, traffic analysis, and a plan for the next 30 days. No vague dashboards.",
  },
];

const SeoTechStack = [
  {
    badge: "AHREFS",
    desc: "Backlink analysis, keyword research, rank tracking, and site audit — the gold standard of SEO tooling.",
  },
  {
    badge: "SEMRUSH",
    desc: "Competitor analysis, keyword gap discovery, on-page SEO checker, and content optimization workflow.",
  },
  {
    badge: "SCREAMING FROG",
    desc: "Full technical site crawl — broken links, redirect chains, duplicate content, missing tags, and schema validation.",
  },
  {
    badge: "GSC + GA4",
    desc: "Google Search Console and Analytics 4 for real-time organic traffic, CTR, impressions, and indexation data.",
  },
  {
    badge: "SURFER SEO",
    desc: "AI-powered content optimization — NLP analysis, SERP benchmarking, and content score against top-ranking pages.",
  },
];

const SeoDeliverables = [
  "Full technical SEO audit (PDF report)",
  "Keyword research & content gap analysis",
  "On-page optimization — all target pages",
  "Schema markup (FAQ, Local, Product, Article)",
  "Google Search Console + GA4 setup",
  "Monthly rank tracking report",
  "Backlink report & new link placements",
  "Competitor ranking movement alerts",
];

const SeoPlans = [
  {
    name: "SEO Starter",
    price: "₹8,000",
    priceSuffix: "– ₹15,000",
    billing: "per month",
    timeline: "Best for small local businesses",
    popular: false,
    features: [
      "Up to 10 keywords tracked",
      "On-page SEO (5 pages)",
      "Google Business optimization",
      "Monthly rank report",
      "Basic technical audit",
    ],
    cta: "Get Started",
  },
  {
    name: "SEO Growth",
    price: "₹18,000",
    priceSuffix: "– ₹35,000",
    billing: "per month",
    timeline: "Ideal for growing businesses",
    popular: true,
    features: [
      "Up to 30 keywords tracked",
      "On-page SEO (15 pages)",
      "2 SEO blog posts/month",
      "Link building (5–8 backlinks)",
      "Technical fixes included",
      "Competitor tracking + reports",
    ],
    cta: "Book a Call ",
  },
  {
    name: "SEO Authority",
    price: "₹40,000",
    priceSuffix: "+ custom",
    billing: "per month",
    timeline: "Best for scaling & e-commerce",
    popular: false,
    features: [
      "Unlimited keywords tracked",
      "Full site on-page optimization",
      "4–6 SEO blog posts/month",
      "15+ high-DA backlinks/month",
      "E-commerce / local SEO",
      "AI content strategy included",
    ],
    cta: "Let's Talk",
  },
];
const whyPoints = [
  {
    num: "01",
    text: "Clarity, performance, and usability — not unnecessary complexity.",
  },
  {
    num: "02",
    text: "Every project is built with a business outcome in mind, not just aesthetics.",
  },
  {
    num: "03",
    text: "Local market understanding — Delhi NCR, manufacturing, B2B, real ROI.",
  },
  { num: "04", text: "One dedicated team from kickoff to launch and beyond." },
];

const webSteps = [
  {
    num: "01",
    title: "Discovery Call (Free)",
    desc: "We understand your business, competitors, audience, and goals. 30-minute call — no fluff, no sales pitch.",
  },
  {
    num: "02",
    title: "Wireframe + Proposal",
    desc: "You get a sitemap, rough wireframe, and fixed-price proposal within 48 hours. No ambiguity.",
  },
  {
    num: "03",
    title: "Design Phase",
    desc: "Figma mockups built section by section. You review and approve before we write a single line of code.",
  },
  {
    num: "04",
    title: "Development + QA",
    desc: "Production-grade React/Next.js build. Cross-browser, cross-device testing. SEO + performance baked in.",
  },
  {
    num: "05",
    title: "Launch + Handoff",
    desc: "We deploy, set up analytics, and hand over full access. Training included — no dependency on us.",
  },
];

const webTechStack = [
  {
    badge: "REACT / NEXT",
    desc: "Component-based architecture — fast, scalable, and maintainable. Industry standard for serious web apps.",
  },
  {
    badge: "TAILWIND CSS",
    desc: "Utility-first styling for rapid development with consistent design tokens across the entire project.",
  },
  {
    badge: "GSAP + LENIS",
    desc: "Professional-grade animations and buttery-smooth scroll — the same tools used by top global agencies.",
  },
  {
    badge: "VITE / VERCEL",
    desc: "Lightning-fast build tooling and edge deployment. Your site loads fast everywhere in India and globally.",
  },
  {
    badge: "FIGMA",
    desc: "Full design system in Figma — you own every frame, component, and asset. No black boxes.",
  },
];

const webDeliverables = [
  "Full source code (GitHub repo access)",
  "Figma design file — all screens & components",
  "Mobile + tablet + desktop responsive build",
  "SEO meta, Schema.org, sitemap.xml setup",
  "Google Analytics + Search Console integration",
  "1 month free bug-fix support post-launch",
  "Deployment on Vercel / custom hosting",
  "Content management guide (handoff doc)",
];

const webPlans = [
  {
    name: "Basic Website",
    price: "₹15,000",
    priceSuffix: "– ₹30,000",
    billingDetails: "one-time setup · web development service · no hidden fees",
    timeline: "Best for small/local businesses",
    popular: false,
    ribbon: "SILVER",
    features: [

      "Designing: 4-6 working Days",

      "5-8 Dynamic Web Pages",

      "On Page + Off Page + Technical SEO",

      "Fully Responsive mobile-first Website",
      "Enquiry Form with all products catalogued",
      "Google Map integration on Contact Page",
      "Live Chat implementation",
      "Admin Control Panel access",
      "Promotion with 5+ key search terms",
      "Keyword Density Analysis",
      "Google Analytics installation & setup",
      "Google Console Setup",
      "Google Webmaster tool verification",
      "Free Search Engine Submission",
      "Local Google Business Listing setup",

    ],
    cta: "Get Started",
  },
  {
    name: "Business Website",
    price: "₹30,000",
    priceSuffix: "– ₹80,000",
    billingDetails: "one-time setup · web development service · no hidden fees",
    timeline: "Ideal for growing businesses",
    popular: true,
    ribbon: "REGULAR",
    features: [

      "Custom Designing: 10-12 working Days",

      "10-15 Dynamic Web Pages",

      "On Page + Off Page + Technical SEO",

      "Fully Responsive mobile-first Website",
      "Enquiry Form with all products catalogued",
      "Google Map integration on Contact Page",
      "Live Chat implementation",
      "Admin Control Panel access",
      "Promotion with 10+ key search terms",
      "Keyword Density Analysis",
      "Google Analytics installation & setup",
      "Google Webmaster tool verification",
      "Free Search Engine Submission",
      "Local Google Business Listing setup",
      "Facebook Business Page Creation",
    ],
    cta: "Book a Call",
  },
  {
    name: "E-commerce Website",
    price: "₹80,000",
    priceSuffix: "– ₹1,50,000+",
    billingDetails: "one-time setup · web development service · no hidden fees",
    timeline: "Best for selling products online",
    popular: false,
    ribbon: "PREMIUM",
    features: [

      "Custom Designing: 15-20 working Days",
      "Individual Domain & Hosting included",
      "25-35 Dynamic Web Pages",
      "70-100 Product Images integrated",
      "On Page SEO with 10+ target keywords",
      "Fully Responsive mobile-first Website",
      "Enquiry Form with all products catalogued",
      "Live Chat implementation",
      "Admin Control Panel access",
      "Promotion with 10+ key search terms",
      "Keyword Density Analysis",
      "Google Analytics installation & setup",
      "Google Webmaster tool verification",
      "Free Search Engine Submission",
      "Local Google Business Listing setup",
      "Facebook Business Page Creation",
    ],
    cta: "Let's Talk",
  },
];

export {
  webDeliverables,
  webSteps,
  webTechStack,
  webPlans,
  whyPoints,
  SeoSteps,
  SeoTechStack,
  SeoDeliverables,
  SeoPlans,
  services,
  infoCards,
  faqs,
  steps,
  techStack,
  deliverables,
  plans,
  marqueeItems,
  stack,
  team,
  timeline,
  values,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  socialImgs,
  techStackImgs,
  navLinks,
  stats,
  categories,
  projects,
  heroProjects,
};
