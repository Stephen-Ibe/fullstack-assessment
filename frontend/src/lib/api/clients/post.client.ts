import { Client } from "../../config";

const postClient = {
  getAllPosts: async () => {
    return await Client.get("/posts");
  },
};

export default postClient;
