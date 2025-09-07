import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../types";
import { PostClient } from "../clients";

export const useGetUsersPosts = (userId: string) =>
  useQuery<Array<Post>, Error>({
    queryFn: () => PostClient.getUsersPosts(userId),
    queryKey: ["posts", userId],
    enabled: !!userId,
  });
