import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react()],
  root: "site/prompt-explorer",
  publicDir: "public",
  server: {
    fs: {
      allow: [path.resolve(process.cwd())]
    }
  },
  build: {
    outDir: "../../dist/site",
    emptyOutDir: true
  }
});
