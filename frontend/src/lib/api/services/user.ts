import { useQuery } from "@tanstack/react-query";
import { UserClient } from "../clients";

export const useGetAllUsers = (pageNumber: number, pageSize: number = 4) => {
  return useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () => UserClient.getAllUsers({ pageNumber, pageSize }),
  });
};

export const useGetUsersCount = () =>
  useQuery({
    queryKey: ["usersCount"],
    queryFn: UserClient.getUsersCount,
  });
