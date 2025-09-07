import { Loader, Text } from "@mantine/core";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useParams } from "react-router";
import {
  CreateNewPost,
  NewPostCard,
  PageHelmet,
  PostCard,
} from "../components";
import { usePosts, useUsers } from "../lib";

const UserPost = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    state: { name, email },
  } = useLocation();

  const {
    posts: { goBackToUsers, userPosts, isLoadingPosts },
  } = useUsers(userId || "");

  const {
    modalActions: { opened, open, close },
  } = usePosts();

  return (
    <>
      <PageHelmet title="User Posts" />
      <section className="container h-screen p-24 mx-auto">
        {isLoadingPosts ? (
          <div className="mx-auto w-fit">
            <Loader color="#7F56D9" type="dots" />
          </div>
        ) : (
          <>
            <div>
              <div
                className="flex items-center mb-4 cursor-pointer gap-x-2"
                onClick={goBackToUsers}
              >
                <FaArrowLeft />
                <Text>Back to Users</Text>
              </div>
              <h1 className="text-4xl font-bold">{name}</h1>
              <div className="flex gap-x-4">
                <p>{email}</p>
                <p>{userPosts?.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-12 my-10">
              <NewPostCard onOpen={open} />
              {userPosts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <CreateNewPost opened={opened} close={close} />
          </>
        )}
      </section>
    </>
  );
};

export default UserPost;
