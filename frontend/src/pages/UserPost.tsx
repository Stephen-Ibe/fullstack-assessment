import { Button, Loader, Text } from "@mantine/core";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useLocation, useParams } from "react-router";
import {
  ConfirmDelete,
  CreateNewPost,
  NewPostCard,
  PageHelmet,
  PostCard,
} from "../components";
import { usePosts } from "../lib";

const UserPost = () => {
  const { userId } = useParams<{ userId: string }>();
  if (!userId) {
    alert("User ID is required for UserPost page.");
  }
  const location = useLocation();
  const name = location.state?.name;
  const email = location.state?.email;

  const {
    posts: {
      userPosts,
      isLoadingPosts,
      isErrorPosts,
      isDeletingPost,
      openedDelete,
      selectedPostData,
      goBackToUsers,
      closeDelete,
      showDeleteModal,
      handleDeletePost,
    },
    modalActions: { opened, open, close },
  } = usePosts(userId || "");

  if (isLoadingPosts) {
    return (
      <div className="container flex items-center justify-center h-screen mx-auto">
        <Loader color="#7F56D9" type="dots" />
      </div>
    );
  }

  if (isErrorPosts) {
    const errorMsg = "Failed to load posts. Please try again later.";
    return (
      <div className="container flex flex-col items-center justify-center h-screen mx-auto gap-y-2">
        <Text c="red" size="xl" fw={700}>
          {(isErrorPosts?.message as string) || errorMsg}
        </Text>
        <Button
          size="sm"
          variant="outline"
          leftSection={<FaHome />}
          onClick={() => (window.location.href = "/")}
        >
          View Users
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHelmet title="User Posts" />
      <section className="container h-screen p-24 mx-auto">
        <>
          <div>
            <div
              className="flex items-center mb-4 cursor-pointer gap-x-2"
              onClick={goBackToUsers}
            >
              <FaArrowLeft />
              <Text>Back to Users</Text>
            </div>
            <h1 className="text-4xl font-bold">
              {name ? (
                name
              ) : (
                <span className="text-red-500">Name not available</span>
              )}
            </h1>
            <div className="flex gap-x-4">
              <p>
                {email ? (
                  email
                ) : (
                  <span className="text-red-500">Email not available</span>
                )}
              </p>
              <p>{userPosts?.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-10">
            <NewPostCard onOpen={open} />
            {userPosts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                deletePost={() => showDeleteModal(post.id, post.title)}
              />
            ))}
          </div>

          <CreateNewPost opened={opened} close={close} userId={userId || ""} />
          <ConfirmDelete
            opened={openedDelete}
            onClose={closeDelete}
            postData={selectedPostData}
            deleteActions={{ isDeletingPost, handleDeletePost }}
          />
        </>
      </section>
    </>
  );
};

export default UserPost;
