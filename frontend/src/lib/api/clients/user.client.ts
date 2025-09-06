import { Client } from "../../config";
import type { User } from "../../types";

const userClient = {
  getAllUsers: async ({
    pageSize = 4,
    pageNumber = 0,
  }: {
    pageSize: number;
    pageNumber: number;
  }): Promise<User[]> => {
    return await Client.get("/users", {
      params: {
        pageSize,
        pageNumber,
      },
    });
  },
};

export default userClient;
