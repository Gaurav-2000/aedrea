import { Metadata } from "next";
import AppShell from "./AppShell";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Web Agency Delhi NCR | AEDREA Digital Studio",
  description: "AEDREA builds websites, WhatsApp automation & chatbots for Delhi NCR manufacturers & SMEs. Based in Delhi. Call +91-7289873340 or +91-8527722329",
  keywords: "Web agency Delhi NCR, website with chatbot Delhi, WhatsApp automation Delhi manufacturer, web design Nangloi Bawana Mundka, AI automation Delhi SME",
  verification: {
    google: "0dgPZB4aiyjZxFK6XrpVhaSKtNEWhHMRrP3FWi4H920",
  },
  alternates: {
    canonical: "https://aedrea.com/",
  },
  openGraph: {
    type: "website",
    title: "Web Agency Delhi NCR | AEDREA Digital Studio",
    description: "websites, WhatsApp bots & automation for Delhi NCR manufacturers & SMEs. Results in 30 days.",
    url: "https://aedrea.com/",
    images: [
      {
        url: "https://aedrea.com/images/ogImage.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Agency Delhi NCR | AEDREA Digital Studio",
    description: "websites, WhatsApp bots & automation for Delhi NCR manufacturers & SMEs.",
    images: ["https://aedrea.com/images/ogImage.png"],
  },
  icons: {
    icon: [
      { url: "/images/logos/favicon.png", type: "image/svg+xml" },
      { url: "/images/logos/favicon.png", sizes: "192x192" },
    ],
    apple: "/images/logos/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AEDREA Digital Studio",
    "url": "https://aedrea.com",
    "logo": "https://aedrea.com/images/logos/favicon.png",
    "image": "https://aedrea.com/images/ogImage.png",
    "description": "AEDREA is an web agency in Delhi NCR delivering websites, WhatsApp automation, AI chatbots, and digital growth systems for manufacturers and SMEs.",
    "telephone": ["+91-7289873340", "+91-8527722329"],
    "email": "support@aedrea.com",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pitampura",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110034",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6997",
      "longitude": "77.1386"
    },
    "areaServed": [
      "Nangloi", "Bawana", "Mundka", "Delhi NCR", "West Delhi", "Pitampura",
      "Punjabi Bagh", "Rohini", "Paschim Vihar", "Rajouri Garden", "Janakpuri",
      "Dwarka", "Vikaspuri", "Uttam Nagar"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WhatsApp Automation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Chatbot" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Automations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO" } }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7289873340",
      "contactType": "customer support",
      "email": "support@aedrea.com",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/aedrea.studio",
      "https://www.linkedin.com/in/aedrea-studio-479a033b0"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("scrollRestoration" in history)
                history.scrollRestoration = "manual";
              window.scrollTo(0, 0);
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" as="image" type="image/webp" href="/images/hero-book.webp" />
        <link rel="preload" as="image" type="image/webp" href="/images/hero-watch.webp" />
        <link rel="preload" as="image" type="image/webp" href="/images/hero-card.webp" />
        <link rel="preload" href="/videos/hero-video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/images/hero-poster.webp" as="image" type="image/webp" />
      </head>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
