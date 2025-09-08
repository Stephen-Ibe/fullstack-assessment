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
  it("renders table headers", () => {
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={<></>} />
      </MantineProvider>
    );

    expect(screen.getByText("Address", { selector: "th" })).toBeInTheDocument();
    expect(
      screen.getByText("Email Address", { selector: "th" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Full Name", { selector: "th" })
    ).toBeInTheDocument();
  });

  it("shows loader when isLoading is true", () => {
    render(
      <MantineProvider>
        <UsersTable isLoading={true} userRows={<></>} />
      </MantineProvider>
    );
    expect(screen.getByTestId("users-loader")).toBeInTheDocument();
  });

  it("renders user rows when provided", () => {
    const row = (
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>123 Main St</td>
      </tr>
    );
    render(
      <MantineProvider>
        <UsersTable isLoading={false} userRows={row} />
      </MantineProvider>
    );
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
  });
});
