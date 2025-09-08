import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetAllUsers, useGetUsersCount } from "../api";

export const useUsers = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<number>(0);

  const { data: allUsers, isLoading } = useGetAllUsers(activePage, 4);
  const { data: usersCount } = useGetUsersCount();

  const handlePaginationChange = (page: number) => {
    setActivePage(page - 1);
  };

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
    user: {
      allUsers,
      isLoading,
      gotoUserPosts,
      usersCount,
      paginationData: { activePage, setActivePage, handlePaginationChange },
    },
  };
};
