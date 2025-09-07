import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { yupResolver } from "mantine-form-yup-resolver";

import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCreateNewPost, useDeletePostById, useGetUsersPosts } from "../api";
import { createPostSchema } from "../schema";

export const usePosts = (userId: string = "") => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const [selectedPostData, setSelectedPostData] = useState<
    Record<string, string>
  >({
    postId: "",
    postTitle: "",
  });

  const { mutate: createNewPost, isPending: isCreatingPost } =
    useCreateNewPost();
  const { mutate: deletePostById, isPending: isDeletingPost } =
    useDeletePostById();
  const {
    data: userPosts,
    isLoading: isLoadingPosts,
    error: isErrorPosts,
    refetch: refetchUserPosts,
  } = useGetUsersPosts(userId || "");

  const form = useForm<{
    title: string;
    body: string;
  }>({
    initialValues: { title: "", body: "" },
    validateInputOnChange: true,
    validate: yupResolver(createPostSchema),
  });

  const handleRefetchUserPosts = (close: () => void) => {
    refetchUserPosts();
    close();
  };

  const handleCreatePost = (
    values: { title: string; body: string },
    closeModal: () => void
  ) => {
    createNewPost(
      { ...values, userId },
      {
        onSuccess: () => {
          toast.success("Post created successfully!");
          form.reset();
          handleRefetchUserPosts(closeModal);
        },
        onError: (error) => {
          toast.error(
            `${error ?? "Failed to create post. Please try again."} `
          );
        },
      }
    );
  };

  const handleDeletePost = (postId: string) => {
    deletePostById(postId, {
      onSuccess: () => {
        toast.success("Post deleted successfully!");
        closeDelete();
        refetchUserPosts();
      },
      onError: (error) => {
        toast.error(`${error ?? "Failed to delete post. Please try again."} `);
      },
    });
  };

  const showDeleteModal = (postId: string, postTitle: string) => {
    setSelectedPostData({ postId, postTitle });
    openDelete();
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
    formActions: { handleCreatePost, isCreatingPost, form },
    posts: {
      userPosts,
      isLoadingPosts,
      isErrorPosts,
      goBackToUsers,
      refetchUserPosts,
      handleDeletePost,
      isDeletingPost,
      openedDelete,
      selectedPostData,
      closeDelete,
      showDeleteModal,
    },
  };
};
