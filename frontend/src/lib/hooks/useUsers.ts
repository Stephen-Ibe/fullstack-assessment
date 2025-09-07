import { useNavigate } from "react-router";
import { useGetAllUsers, useGetUsersPosts } from "../api";

export const useUsers = (userId: string = "") => {
  const navigate = useNavigate();
  const { data: allUsers, isLoading } = useGetAllUsers(0, 4);

  const { data: userPosts } = useGetUsersPosts(userId || "");

  const gotoUserPosts = ({
    id,
    name,
    email,
  }: {
    id: string;
    name: string;
    email: string;
  }) => {
    navigate(`/${id}/posts`, { state: { name, email } });
  };

  return { user: { allUsers, isLoading, gotoUserPosts }, posts: { userPosts } };
};
