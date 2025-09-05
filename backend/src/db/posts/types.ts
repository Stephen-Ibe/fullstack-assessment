export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
}

export type NewPostInput = Pick<Post, "user_id" | "title" | "body">;
