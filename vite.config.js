import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteImagemin from "vite-plugin-imagemin"; // ✅ ADD THIS

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteImagemin({
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      webp: { quality: 80 },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800,
  },
});
