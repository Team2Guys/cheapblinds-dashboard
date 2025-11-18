import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#components": path.resolve(__dirname, "src/components"),
      "#constants": path.resolve(__dirname, "src/constants"),
      "#context": path.resolve(__dirname, "src/context"),
      "#pages": path.resolve(__dirname, "src/pages"),
      "#providers": path.resolve(__dirname, "src/providers"),
      "#utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
