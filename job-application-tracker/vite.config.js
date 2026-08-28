import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/HTML-CSS-Learning/job-application-tracker/",
  plugins: [react(), tailwindcss()],
});