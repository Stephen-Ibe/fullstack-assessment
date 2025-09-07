import { Client } from "../../config";
import type { Post } from "../../types";

const postClient = {
  getUsersPosts: async (userId: string): Promise<Post[]> => {
    return await Client.get("/posts", {
      params: {
        userId,
      },
    });
  },
};

export default postClient;
