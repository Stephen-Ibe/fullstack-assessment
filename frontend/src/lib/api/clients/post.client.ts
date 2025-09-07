import { Client } from "../../config";
import type { CreateNewPostPayload, Post } from "../../types";

const postClient = {
  getUsersPosts: async (userId: string): Promise<Post[]> => {
    return await Client.get("/posts", {
      params: {
        userId,
      },
    });
  },

  createNewPost: async (payload: CreateNewPostPayload) => {
    return await Client.post("/posts", payload);
  },
};

export default postClient;
