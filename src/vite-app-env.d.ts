///  <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "src/setupTests.ts"],
    },
  },
});
