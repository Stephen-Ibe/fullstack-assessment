import { randomUUID } from "crypto";
import { connection } from "../connection";
import { insertPostTemplate, selectPostsTemplate } from "./query-templates";
import { NewPostInput, Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const createPost = (input: NewPostInput): Promise<Post> =>
  new Promise((resolve, reject) => {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    connection.run(
      insertPostTemplate,
      [id, input.user_id, input.title, input.body, createdAt],
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          id,
          user_id: input.user_id,
          title: input.title,
          body: input.body,
          created_at: createdAt,
        });
      }
    );
  });
