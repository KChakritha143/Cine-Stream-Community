import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Community from "./Community";
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Community Component Tests", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });
  });
  it("renders the Community Page header and post submission form", async () => {
    render(<Community />);
    await waitFor(() => {
      expect(screen.queryByText(/Loading discussions/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/CineStream Community/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Post Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Publisher Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Publish Post/i })).toBeInTheDocument();
  });
  it("shows loading indicator and skeleton loaders initially, then displays posts", async () => {
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
    expect(screen.getByText(/Loading discussions/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/Loading discussions/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText("Inception review")).toBeInTheDocument();
    expect(screen.getByText("It was a dream within a dream!")).toBeInTheDocument();
  });
  it("displays error banner if fetching fails, and triggers retry", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    render(<Community />);
    await waitFor(() => {
      expect(screen.getByText(/Unable to connect to the community server/i)).toBeInTheDocument();
    });
    const retryBtn = screen.getByRole("button", { name: /Retry Connection/i });
    expect(retryBtn).toBeInTheDocument();
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
    fireEvent.click(retryBtn);
    await waitFor(() => {
      expect(screen.getByText("Retry Success Post")).toBeInTheDocument();
    });
    expect(screen.queryByText(/Unable to connect to the community server/i)).not.toBeInTheDocument();
  });
  it("creates a new post and appends it to the DOM", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    render(<Community />);
    await waitFor(() => {
      expect(screen.queryByText(/Loading discussions/i)).not.toBeInTheDocument();
    });
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
    const titleInput = screen.getByLabelText(/Post Title/i);
    const publisherInput = screen.getByLabelText(/Publisher Name/i);
    const contentInput = screen.getByLabelText(/Content/i);
    fireEvent.change(titleInput, { target: { value: "Interstellar Analysis" } });
    fireEvent.change(publisherInput, { target: { value: "Movie Geek" } });
    fireEvent.change(contentInput, { target: { value: "Absolutely mindblowing soundtrack." } });
    const submitBtn = screen.getByRole("button", { name: /Publish Post/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText("Interstellar Analysis")).toBeInTheDocument();
      expect(screen.getByText("Absolutely mindblowing soundtrack.")).toBeInTheDocument();
      expect(screen.getByText("Published by Movie Geek")).toBeInTheDocument();
    });
    expect(titleInput.value).toBe("");
    expect(publisherInput.value).toBe("");
    expect(contentInput.value).toBe("");
  });
  it("deletes a post and updates the DOM dynamically", async () => {
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
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    const deleteBtn = screen.getByRole("button", { name: /Delete post/i });
    fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(screen.queryByText("Spam Post")).not.toBeInTheDocument();
    });
  });
});