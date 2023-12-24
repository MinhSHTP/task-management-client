import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react", // Fixed error styled_defaults
    }),
  ],
  server: {
    port: 5555,
  },
  resolve: {
    alias: {
      src: path.resolve("src/"),
      "@assets": path.resolve("src/assets"),
      "@components": path.resolve("src/components"),
      "@pages": path.resolve("src/pages"),
      "@services": path.resolve("src/services"),
      "@utils": path.resolve("src/utils"),
      "@configs": path.resolve("src/configs"),
      "@types": path.resolve("src/types"),
    },
  },
});
