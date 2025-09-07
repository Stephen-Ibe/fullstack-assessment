import {
  Button,
  Loader,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useParams } from "react-router";
import { NewPostCard, PageHelmet, PostCard } from "../components";
import { useUsers } from "../lib";

const UserPost = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    state: { name, email },
  } = useLocation();

  const {
    posts: { goBackToUsers, userPosts, isLoadingPosts },
  } = useUsers(userId || "");

  const [opened, { open, close }] = useDisclosure(false);

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

            <Modal
              opened={opened}
              onClose={close}
              centered
              withCloseButton={false}
              closeOnClickOutside={false}
              size="lg"
              title={<span className="text-2xl font-semibold">New Post</span>}
            >
              <form className="flex flex-col gap-y-5">
                <TextInput
                  label="Post Title"
                  placeholder="Give your post a title"
                  size="md"
                  radius="sm"
                />
                <Textarea
                  label="Post Content"
                  placeholder="Write something mind blowing..."
                  size="md"
                  radius="sm"
                  rows={6}
                />
                <div className="my-2 ml-auto space-x-4 w-fit">
                  <Button
                    type="button"
                    variant="outline"
                    color="gray"
                    radius="sm"
                    onClick={close}
                    size="md"
                  >
                    Cancel
                  </Button>

                  <Button type="submit" color="#334155" radius="sm" size="md">
                    Publish
                  </Button>
                </div>
              </form>
            </Modal>
          </>
        )}
      </section>
    </>
  );
};

export default UserPost;
