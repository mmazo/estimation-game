import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup, configure } from "@testing-library/react";

configure({
  asyncUtilTimeout: 2000,
});

afterEach(() => {
  cleanup();
});
