import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteImagemin from "vite-plugin-imagemin"; // ✅ ADD THIS

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ✅ ADD THIS - auto compress images on build
    viteImagemin({
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      webp: { quality: 80 },
      svgo: {
        plugins: [
          { name: "removeViewBox" },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
  ],

  build: {
    chunkSizeWarningLimit: 800,
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
          // ✅ ADD THIS - postprocessing alag chunk
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
