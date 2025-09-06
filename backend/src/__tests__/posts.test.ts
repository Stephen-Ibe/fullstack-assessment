import request from "supertest";
import app from "../index";

const createSamplePost = async (userId: string) => {
  const payload = { title: "Test Title", body: "Test Body", userId };
  const res = await request(app).post("/posts").send(payload);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  expect(res.body).toMatchObject({
    user_id: userId,
    title: payload.title,
    body: payload.body,
  });
  return res.body as {
    id: string;
    user_id: string;
    title: string;
    body: string;
    created_at: string;
  };
};

describe("Posts endpoints", () => {
  let userId: string;

  beforeAll(async () => {
    const usersRes = await request(app)
      .get("/users")
      .query({ pageNumber: 0, pageSize: 1 });
    expect(usersRes.status).toBe(200);
    const users = usersRes.body as Array<{ id: string }>;
    expect(users.length).toBeGreaterThan(0);
    userId = users[0].id;
  });

  it("creates, lists, and deletes a post", async () => {
    const created = await createSamplePost(userId);

    const listRes = await request(app).get("/posts").query({ userId });
    expect(listRes.status).toBe(200);
    const posts = listRes.body as Array<{ id: string }>;
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.find((p) => p.id === created.id)).toBeTruthy();

    const delRes = await request(app).delete(`/posts/${created.id}`);
    expect(delRes.status).toBe(200);

    const listResAfter = await request(app).get("/posts").query({ userId });
    expect(listResAfter.status).toBe(200);
    const postsAfter = listResAfter.body as Array<{ id: string }>;
    expect(postsAfter.find((p) => p.id === created.id)).toBeFalsy();
  });

  it("rejects invalid create payloads", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ title: 1, body: {}, userId: null });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 404 when deleting non-existent post", async () => {
    const res = await request(app).delete("/posts/does-not-exist");
    expect(res.status).toBe(404);
  });
});
