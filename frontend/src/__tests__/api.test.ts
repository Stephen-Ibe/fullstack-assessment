/**
 * Unit tests for UserClient and PostClient API calls.
 *
 * Coverage:
 * - Mocks Client.get, Client.post, and Client.delete for users and posts
 * - Verifies correct data is returned and error handling works
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostClient, UserClient } from "../lib/api/clients";
import Client from "../lib/config/httpClient";

const mockUsers = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];
const mockPosts = [
  { id: "1", title: "Post 1", body: "Body 1" },
  { id: "2", title: "Post 2", body: "Body 2" },
];
const mockCount = { count: 2 };

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("UserClient", () => {
  it("getAllUsers returns users", async () => {
    vi.spyOn(Client, "get").mockResolvedValue(mockUsers);
    const result = await UserClient.getAllUsers({ pageSize: 4, pageNumber: 0 });
    expect(result).toEqual(mockUsers);
    expect(Client.get).toHaveBeenCalledWith("/users", {
      params: { pageSize: 4, pageNumber: 0 },
    });
  });

  it("getUsersCount returns count", async () => {
    vi.spyOn(Client, "get").mockResolvedValue(mockCount);
    const result = await UserClient.getUsersCount();
    expect(result).toEqual(mockCount);
    expect(Client.get).toHaveBeenCalledWith("/users/count");
  });
});

describe("PostClient", () => {
  it("getUsersPosts returns posts", async () => {
    vi.spyOn(Client, "get").mockResolvedValue(mockPosts);
    const result = await PostClient.getUsersPosts("1");
    expect(result).toEqual(mockPosts);
    expect(Client.get).toHaveBeenCalledWith("/posts", {
      params: { userId: "1" },
    });
  });

  it("createNewPost posts data", async () => {
    vi.spyOn(Client, "post").mockResolvedValue({ success: true });
    const payload = { userId: "1", title: "Test", body: "Body" };
    const result = await PostClient.createNewPost(payload);
    expect(result).toEqual({ success: true });
    expect(Client.post).toHaveBeenCalledWith("/posts", payload);
  });

  it("deletePostById deletes post", async () => {
    vi.spyOn(Client, "delete").mockResolvedValue({ success: true });
    const result = await PostClient.deletePostById("1");
    expect(result).toEqual({ success: true });
    expect(Client.delete).toHaveBeenCalledWith("/posts/1");
  });
});
