import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./", // ✅ gera ./assets/... no index.html
  build: { outDir: "dist", sourcemap: true }, // ✅ garante pasta final
  plugins: [react(), legacy(), tailwindcss()],
});
