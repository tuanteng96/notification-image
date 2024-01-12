import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: command === "serve" ? "" : "/Thietke/source",
  plugins: [react()],
  server: {
    port: 3001,
  },
}));
