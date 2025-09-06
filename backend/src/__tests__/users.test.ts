import request from "supertest";
import app from "../index";

describe("GET /users", () => {
  it("returns users with addresses and supports pagination", async () => {
    const res = await request(app)
      .get("/users")
      .query({ pageNumber: 0, pageSize: 3 });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Each user should have addresses array (can be empty)
    for (const u of res.body as Array<any>) {
      expect(u).toHaveProperty("id");
      expect(u).toHaveProperty("name");
      expect(u).toHaveProperty("address");
      expect(Array.isArray(u.address)).toBe(true);
    }
  });
});

describe("GET /users/count", () => {
  it("returns total user count", async () => {
    const res = await request(app).get("/users/count");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("count");
    expect(typeof res.body.count === "number").toBe(true);
  });
});
