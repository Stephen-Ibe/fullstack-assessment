import { Client } from "../../config";

const postClient = {
  getUsersPosts: async (userId: string) => {
    return await Client.get("/posts", {
      params: {
        userId,
      },
    });
    // return await Client.get(`/posts?userId=${userId}`);
  },
};

export default postClient;
