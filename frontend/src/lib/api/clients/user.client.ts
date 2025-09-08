import { Client } from "../../config";
import type { User, UserPaginationData, UsersCount } from "../../types";

const userClient = {
  getAllUsers: async ({
    pageSize = 4,
    pageNumber = 0,
  }: UserPaginationData): Promise<User[]> => {
    return await Client.get("/users", {
      params: {
        pageSize,
        pageNumber,
      },
    });
  },

  getUsersCount: async (): Promise<UsersCount> => {
    return await Client.get("/users/count");
  },
};

export default userClient;
