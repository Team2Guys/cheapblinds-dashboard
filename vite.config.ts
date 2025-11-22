import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#components": path.resolve(__dirname, "src/components"),
      "#contexts": path.resolve(__dirname, "src/contexts"),
      "#graphql": path.resolve(__dirname, "src/graphql"),
      "#pages": path.resolve(__dirname, "src/pages"),
      "#providers": path.resolve(__dirname, "src/providers"),
      "#utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
