import { useNavigate } from "react-router";
import { useGetAllUsers, useGetUsersPosts } from "../api";

export const useUsers = (userId: string = "") => {
  const navigate = useNavigate();
  const { data: allUsers, isLoading } = useGetAllUsers(0, 4);

  const { data: userPosts, isLoading: isLoadingPosts } = useGetUsersPosts(
    userId || ""
  );

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

  const goBackToUsers = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return {
    user: { allUsers, isLoading, gotoUserPosts },
    posts: { userPosts, isLoadingPosts, goBackToUsers },
  };
};
