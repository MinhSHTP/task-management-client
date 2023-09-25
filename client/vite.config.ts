import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555,
  },
  resolve: {
    alias: [
      {
        find: "@app",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@app/assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@app/components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@app/pages",
        replacement: fileURLToPath(new URL("./src/pages", import.meta.url)),
      },
      {
        find: "@app/services",
        replacement: fileURLToPath(new URL("./src/services", import.meta.url)),
      },
      {
        find: "@app/utils",
        replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
      },
      {
        find: "@app/configs",
        replacement: fileURLToPath(new URL("./src/configs", import.meta.url)),
      },
    ],
  },
});
