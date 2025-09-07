export type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};

export type CreateNewPostPayload = {
  userId: string;
  title: string;
  body: string;
};
