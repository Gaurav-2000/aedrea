/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Turn off strict mode to prevent GSAP/Canvas double-renders in development
  transpilePackages: ["three", "gsap", "lenis"],
  images: {
    unoptimized: true, // Keep image tags behaving similarly to Vite raw asset loading
  },
};

export default nextConfig;
