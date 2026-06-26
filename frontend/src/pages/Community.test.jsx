import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Community from "./Community";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Community Component Tests", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    // Default mock response is empty array of posts
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });
  });

  it("renders the Community Page header and post submission form", async () => {
    render(<Community />);
    
    // Wait for initial load to finish to avoid state update warnings
    await waitFor(() => {
      expect(screen.queryByText(/Loading discussions/i)).not.toBeInTheDocument();
    });

    // Check main title
    expect(screen.getByText(/CineStream Community/i)).toBeInTheDocument();
    
    // Check form fields
    expect(screen.getByLabelText(/Post Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Publisher Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Publish Post/i })).toBeInTheDocument();
  });

  it("shows loading indicator and skeleton loaders initially, then displays posts", async () => {
    // Delay resolution to capture loading state
    mockFetch.mockImplementation(() =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: async () => [
                {
                  id: "1",
                  title: "Inception review",
                  content: "It was a dream within a dream!",
                  createdAt: new Date().toISOString(),
                },
              ],
            }),
          50
        )
      )
    );

    render(<Community />);
    
    // Loading indicator and skeleton loader should render
    expect(screen.getByText(/Loading discussions/i)).toBeInTheDocument();
    
    // Wait for the loader to clear and the post to render
    await waitFor(() => {
      expect(screen.queryByText(/Loading discussions/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText("Inception review")).toBeInTheDocument();
    expect(screen.getByText("It was a dream within a dream!")).toBeInTheDocument();
  });

  it("displays error banner if fetching fails, and triggers retry", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    
    render(<Community />);
    
    // Wait for error banner to render
    await waitFor(() => {
      expect(screen.getByText(/Unable to connect to the community server/i)).toBeInTheDocument();
    });

    const retryBtn = screen.getByRole("button", { name: /Retry Connection/i });
    expect(retryBtn).toBeInTheDocument();

    // Now mock success for retry
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "2",
          title: "Retry Success Post",
          content: "Backend back online!",
          createdAt: new Date().toISOString(),
        },
      ],
    });

    // Click retry
    fireEvent.click(retryBtn);

    // Verify it loads the data successfully
    await waitFor(() => {
      expect(screen.getByText("Retry Success Post")).toBeInTheDocument();
    });
    expect(screen.queryByText(/Unable to connect to the community server/i)).not.toBeInTheDocument();
  });

  it("creates a new post and appends it to the DOM", async () => {
    // Initial fetch empty posts
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Community />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading discussions/i)).not.toBeInTheDocument();
    });

    // Mock the POST request endpoint
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        post: {
          id: "3",
          title: "Interstellar Analysis",
          content: "Absolutely mindblowing soundtrack.",
          publisher: "Movie Geek",
          createdAt: new Date().toISOString(),
        },
      }),
    });

    // Fill form
    const titleInput = screen.getByLabelText(/Post Title/i);
    const publisherInput = screen.getByLabelText(/Publisher Name/i);
    const contentInput = screen.getByLabelText(/Content/i);
    
    fireEvent.change(titleInput, { target: { value: "Interstellar Analysis" } });
    fireEvent.change(publisherInput, { target: { value: "Movie Geek" } });
    fireEvent.change(contentInput, { target: { value: "Absolutely mindblowing soundtrack." } });

    // Submit form
    const submitBtn = screen.getByRole("button", { name: /Publish Post/i });
    fireEvent.click(submitBtn);

    // Verify post was appended to DOM
    await waitFor(() => {
      expect(screen.getByText("Interstellar Analysis")).toBeInTheDocument();
      expect(screen.getByText("Absolutely mindblowing soundtrack.")).toBeInTheDocument();
      expect(screen.getByText("Published by Movie Geek")).toBeInTheDocument();
    });

    // Check fields are cleared
    expect(titleInput.value).toBe("");
    expect(publisherInput.value).toBe("");
    expect(contentInput.value).toBe("");
  });

  it("deletes a post and updates the DOM dynamically", async () => {
    // Initial fetch returns a post
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "delete-me",
          title: "Spam Post",
          content: "Spam content",
          createdAt: new Date().toISOString(),
        },
      ],
    });

    render(<Community />);

    await waitFor(() => {
      expect(screen.getByText("Spam Post")).toBeInTheDocument();
    });

    // Mock DELETE endpoint success
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Click delete
    const deleteBtn = screen.getByRole("button", { name: /Delete post/i });
    fireEvent.click(deleteBtn);

    // Verify it is removed from DOM
    await waitFor(() => {
      expect(screen.queryByText("Spam Post")).not.toBeInTheDocument();
    });
  });
});
