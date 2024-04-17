import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.tsx";

describe("Test Estimation Game", () => {
  test("should render app without crashing", () => {
    render(<App />);
    expect(screen.getByText("Add stories from backlog")).toBeInTheDocument();
    expect(screen.getByText("Save estimated stories")).toBeInTheDocument();
  });
});
