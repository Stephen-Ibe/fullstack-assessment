import { Request, Response, Router } from "express";
import { createPost, deletePostById, getPosts } from "../db/posts";
import { getUsers } from "../db/users";

const router = Router();

/**
 * Description - Get Posts by User ID
 * @param {any} "/"
 * @param {any} async(req:Request
 * @param {any} res:Response
 * @returns {any}
 */
router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ message: "userId is required" });
    return;
  }
  // Check if user exists
  const users = await getUsers(0, 10000); // get all users (or optimize for large datasets)
  const userExists = users.some((u: any) => u.id === userId);
  if (!userExists) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

/**
 * Description - Delete Post by ID
 * @param {any} "/:id"
 * @param {any} async(req:Request
 * @param {any} res:Response
 * @returns {any}
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id?.toString();
    if (!id) {
      res.status(400).send({ message: "Post id is required" });
      return;
    }
    const changes = await deletePostById(id);
    if (changes === 0) {
      res.status(404).send({ message: "Post not found" });
      return;
    }
    res.status(200).send({ message: "Post deleted" });
  } catch (e) {
    res.status(500).send({ message: "Failed to delete post" });
  }
});

/**
 * Description - Create a new Post
 * @param {any} "/"
 * @param {any} async(req:Request
 * @param {any} res:Response
 * @returns {any}
 */
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
        message: "Invalid input. Expecting title, body, userId",
      });
      return;
    }

    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    const cleanUserId = String(userId).trim();

    if (!cleanTitle || !cleanBody || !cleanUserId) {
      res.status(400).send({ message: "title, body, and userId are required" });
      return;
    }

    const created = await createPost({
      title: cleanTitle,
      body: cleanBody,
      user_id: cleanUserId,
    });
    res.status(201).send(created);
  } catch (error) {
    res.status(500).send({ message: "Failed to create post" });
  }
});

export default router;
