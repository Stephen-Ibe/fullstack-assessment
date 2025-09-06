import { useQuery } from "@tanstack/react-query";
import { PostClient } from "../clients";

export const useGetAllPosts = () =>
  useQuery({
    queryFn: PostClient.getAllPosts,
    queryKey: ["posts"],
  });
