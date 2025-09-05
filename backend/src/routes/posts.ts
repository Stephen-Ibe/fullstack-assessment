import { Request, Response, Router } from "express";
import { createPost, getPosts } from "../db/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = (req.body ?? {}) as {
      title?: string;
      body?: string;
      userId?: string | number;
    };

    if (
      typeof title !== "string" ||
      typeof body !== "string" ||
      (typeof userId !== "string" && typeof userId !== "number")
    ) {
      res.status(400).send({
        error: "Invalid input. Expecting title, body, userId",
      });
      return;
    }

    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    const cleanUserId = String(userId).trim();

    if (!cleanTitle || !cleanBody || !cleanUserId) {
      res.status(400).send({ error: "title, body, and userId are required" });
      return;
    }

    const created = await createPost({
      title: cleanTitle,
      body: cleanBody,
      user_id: cleanUserId,
    });
    res.status(201).send(created);
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

export default router;
