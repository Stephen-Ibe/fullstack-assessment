/**
 * Unit test for the NotFound component.
 *
 * Coverage:
 * - Renders the not found message correctly
 * - Ensures compatibility with MantineProvider and React Router (MemoryRouter)
 * - Mocks window.matchMedia for Mantine UI compatibility
 */

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NotFound from "../pages/NotFound";

describe("NotFound component", () => {
  it("should display the not found message", () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </MantineProvider>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
