import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves the site from /wazn/; local dev and preview stay at /.
  base: process.env.GITHUB_PAGES ? "/wazn/" : "/",
  plugins: [react(), tailwindcss()],
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
