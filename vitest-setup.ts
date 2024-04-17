import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup, configure } from "@testing-library/react";

expect.extend(matchers);

configure({
  asyncUtilTimeout: 2000,
});

afterEach(() => {
  cleanup();
});
