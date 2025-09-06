import { useNavigate } from "react-router";
import { useGetAllUsers } from "../api";

export const useUsers = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllUsers(0, 4);

  const gotoUserPosts = (userId: string) => {
    navigate(`/${userId}/posts`);
  };

  return { data, isLoading, gotoUserPosts };
};
