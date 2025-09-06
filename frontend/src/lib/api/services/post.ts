import { useQuery } from "@tanstack/react-query";
import { PostClient } from "../clients";

export const useGetUsersPosts = (userId: string) =>
  useQuery({
    queryFn: () => PostClient.getUsersPosts(userId),
    queryKey: ["posts", userId],
    enabled: !!userId,
  });
