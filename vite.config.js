import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  optimizeDeps: {
    include: ["@react-oauth/google"],
  },
  build: {
    rollupOptions: {
      external: [], // pastikan tidak mengecualikan library ini
    },
  },
});
