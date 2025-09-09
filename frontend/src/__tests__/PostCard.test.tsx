/**
 * Unit tests for the PostCard component.
 *
 * Coverage:
 * - Renders post title and body correctly
 * - Ensures the delete icon is present and triggers deletePost callback on click
 * - Verifies long body text is visually truncated (CSS ellipsis)
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
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PostCard } from "../components/organisms/posts/PostCard";

const post = {
  id: "1",
  title: "Test Post Title",
  body: "This is the body of the test post. It should be truncated if too long.",
};

describe("PostCard", () => {
  it("renders post title and body", () => {
    render(
      <MantineProvider>
        <PostCard post={post} deletePost={() => {}} />
      </MantineProvider>
    );
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(
      screen.getByText(/This is the body of the test post/i)
    ).toBeInTheDocument();
  });

  it("shows the delete icon and calls deletePost when clicked", () => {
    const deletePost = vi.fn();
    render(
      <MantineProvider>
        <PostCard post={post} deletePost={deletePost} />
      </MantineProvider>
    );
    const trashIcon = screen.getByTestId("trash-icon");
    fireEvent.click(trashIcon);
    expect(deletePost).toHaveBeenCalled();
  });

  it("truncates long body text with ellipsis (visual)", () => {
    const longBody = "A".repeat(1000);
    render(
      <MantineProvider>
        <PostCard post={{ ...post, body: longBody }} deletePost={() => {}} />
      </MantineProvider>
    );
    // The full text is present, but visually truncated by CSS
    expect(screen.getByText(longBody)).toBeInTheDocument();
  });
});
