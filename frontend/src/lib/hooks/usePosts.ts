import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { yupResolver } from "mantine-form-yup-resolver";

import { useNavigate } from "react-router";
import { useCreateNewPost, useGetUsersPosts } from "../api";
import { createPostSchema } from "../schema";

export const usePosts = (userId: string = "") => {
  const {
    data: userPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    refetch: refetchUserPosts,
  } = useGetUsersPosts(userId || "");
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<{
    title: string;
    body: string;
  }>({
    initialValues: { title: "", body: "" },
    validateInputOnChange: true,
    validate: yupResolver(createPostSchema),
  });

  const { mutate: createNewPost } = useCreateNewPost();

  const handleRefetchUserPosts = (close: () => void) => {
    refetchUserPosts();
    close();
  };

  // For this implementation, assume refetchUserPosts is passed as an argument
  const handleCreatePost = (
    values: { title: string; body: string },
    closeModal: () => void
  ) => {
    createNewPost(
      { ...values, userId },
      {
        onSuccess: () => {
          form.reset();
          handleRefetchUserPosts(closeModal);
        },
        onError: (error) => {
          console.error("Error creating post:", error);
        },
      }
    );
  };

  const goBackToUsers = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return {
    modalActions: { opened, open, close },
    formActions: { handleCreatePost, form },
    posts: {
      userPosts,
      isLoadingPosts,
      isErrorPosts,
      goBackToUsers,
      refetchUserPosts,
    },
  };
};
