import { randomUUID } from "crypto";
import { connection } from "../connection";
import {
  deletePostByIdTemplate,
  insertPostTemplate,
  selectPostsTemplate,
} from "./query-templates";
import { NewPostInput, Post } from "./types";

/**
 * Description - Get posts by user id
 * @param {any} userId:string
 * @returns {any}
 */
export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

/**
 * Description - Delete post by id
 * @param {any} id:string
 * @returns {any}
 */
export const deletePostById = (id: string): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostByIdTemplate, [id], function (this, err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes as number);
    });
  });

/**
 * Description - Create a new post
 * @param {any} input:NewPostInput
 * @returns {any}
 */
export const createPost = (input: NewPostInput): Promise<Post> =>
  new Promise((resolve, reject) => {
    const TITLE_LIMIT = 100;
    const BODY_LIMIT = 1000;
    if (input.title.length > TITLE_LIMIT) {
      reject(`Title must be at most ${TITLE_LIMIT} characters.`);
      return;
    }
    if (input.body.length > BODY_LIMIT) {
      reject(`Body must be at most ${BODY_LIMIT} characters.`);
      return;
    }
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
