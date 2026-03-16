import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ❌ viteImagemin removed - Vercel pe crash karta hai
  ],

  // Ensure proper base path for Vercel
  base: "/",

  build: {
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/gsap")) return "gsap";
          if (
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          )
            return "fiber";
          if (id.includes("lenis")) return "lenis";
          if (
            id.includes("postprocessing") ||
            id.includes("@react-three/postprocessing")
          )
            return "postprocessing";
        },
      },
    },
  },

  optimizeDeps: {
    include: ["three", "gsap", "@react-three/fiber", "@react-three/drei"],
  },
});
