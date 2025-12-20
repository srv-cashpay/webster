import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // 🔥 WAJIB UNTUK DEPLOY DI ROOT DOMAIN
  plugins: [react()],
  optimizeDeps: {
    include: ["@react-oauth/google"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
