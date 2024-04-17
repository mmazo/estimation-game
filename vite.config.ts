import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    testTimeout: 50000,
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    css: false,
    coverage: {
      reporter: ["text", "json-summary", "json"],
      lines: 60,
      reportOnFailure: true,
    },
    reporter: ["junit", "default"],
    outputFile: "./test-report.xml",
  },
} as UserConfig);
