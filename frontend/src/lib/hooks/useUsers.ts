import { useNavigate } from "react-router";
import { useGetAllUsers } from "../api";

export const useUsers = () => {
  const navigate = useNavigate();
  const { data: allUsers, isLoading } = useGetAllUsers(0, 4);

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

  return {
    user: { allUsers, isLoading, gotoUserPosts },
  };
};
