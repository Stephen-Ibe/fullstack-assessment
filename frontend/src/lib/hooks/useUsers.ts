import { useGetAllUsers } from "../api";

export const useUsers = () => {
  const { data, isLoading } = useGetAllUsers(0, 4);

  return { data, isLoading };
};
