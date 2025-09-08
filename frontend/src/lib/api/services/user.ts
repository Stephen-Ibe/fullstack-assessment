import { useQuery } from "@tanstack/react-query";
import type { UsersCount } from "../../types";
import { UserClient } from "../clients";

export const useGetAllUsers = (pageNumber: number, pageSize: number = 4) =>
  useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: () => UserClient.getAllUsers({ pageNumber, pageSize }),
  });

export const useGetUsersCount = () =>
  useQuery<UsersCount>({
    queryKey: ["usersCount"],
    queryFn: UserClient.getUsersCount,
  });
