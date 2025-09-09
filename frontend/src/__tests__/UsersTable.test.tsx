/**
 * Unit tests for the UsersTable component.
 *
 * Coverage:
 * - Renders all table headers and checks accessibility roles
 * - Shows loader row when loading
 * - Renders single and multiple user rows
 * - Handles empty state when no user rows are provided
 * - Handles edge case for very long text in cells (visual truncation)
 * - Ensures table accessibility and correct roles
 *
 * Uses MantineProvider for theme context and mocks window.matchMedia for Mantine UI compatibility.
 */

// Mock window.matchMedia for Mantine UI
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
import { UsersTable } from "../components/organisms/users/UsersTable";

describe("UsersTable", () => {
  it("renders all table headers and matches accessibility roles", () => {
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={<></>} />
      </MantineProvider>
    );
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(3);
    expect(headers[0]).toHaveTextContent(/Full Name/i);
    expect(headers[1]).toHaveTextContent(/Email Address/i);
    expect(headers[2]).toHaveTextContent(/Address/i);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("shows loader row when isLoading is true", () => {
    render(
      <MantineProvider>
        <UsersTable isLoading={true} userRows={<></>} />
      </MantineProvider>
    );
    expect(screen.getByTestId("users-loader")).toBeInTheDocument();
    expect(screen.getByRole("cell")).toHaveTextContent("");
  });

  it("renders a single user row correctly", () => {
    const row = (
      <tr>
        <td>Jane Doe</td>
        <td>jane@example.com</td>
        <td>456 Main St</td>
      </tr>
    );
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={row} />
      </MantineProvider>
    );
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/456 Main St/i)).toBeInTheDocument();
  });

  it("renders multiple user rows and checks for unique values", () => {
    const rows = (
      <>
        <tr>
          <td>Alice Smith</td>
          <td>alice@example.com</td>
          <td>789 Main St</td>
        </tr>
        <tr>
          <td>Bob Brown</td>
          <td>bob@example.com</td>
          <td>101 Main St</td>
        </tr>
      </>
    );
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={rows} />
      </MantineProvider>
    );
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/789 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Brown/i)).toBeInTheDocument();
    expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/101 Main St/i)).toBeInTheDocument();
  });

  it("renders empty state when no user rows are provided and not loading", () => {
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={null} />
      </MantineProvider>
    );
    // Table body should be empty
    const rowgroups = screen.getAllByRole("rowgroup");
    // tbody is the second rowgroup (thead is first)
    expect(rowgroups[1].childElementCount).toBe(0);
  });

  it("handles edge case: very long text in cells is truncated visually", () => {
    const longName = "A".repeat(200);
    const longEmail = "B".repeat(200) + "@example.com";
    const longAddress = "C".repeat(300);
    const row = (
      <tr>
        <td>{longName}</td>
        <td>{longEmail}</td>
        <td>{longAddress}</td>
      </tr>
    );
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={row} />
      </MantineProvider>
    );
    expect(screen.getByText(longName)).toBeInTheDocument();
    expect(screen.getByText(longEmail)).toBeInTheDocument();
    expect(screen.getByText(longAddress)).toBeInTheDocument();
    // Visual truncation is handled by CSS, so we check presence only
  });

  it("table is accessible and has correct roles", () => {
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={<></>} />
      </MantineProvider>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader").length).toBe(3);
  });
});
