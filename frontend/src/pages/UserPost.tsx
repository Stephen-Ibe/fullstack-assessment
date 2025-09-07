import { Text, Title } from "@mantine/core";
import { LuTrash2 } from "react-icons/lu";
import { MdAddCircleOutline } from "react-icons/md";
import { useLocation, useParams } from "react-router";
import { PageHelmet } from "../components";
import { useGetUsersPosts } from "../lib";

const UserPost = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    state: { name, email },
  } = useLocation();

  const { data: userPosts } = useGetUsersPosts(userId || "");

  return (
    <>
      <PageHelmet title="User Post" />
      <section className="container mx-auto p-24 h-screen">
        <div>
          <h1 className="text-4xl font-bold">{name}</h1>

          <div className="flex gap-x-4">
            <p>{email}</p>
            <p className="">{userPosts?.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 my-6 gap-14 py-10">
          <div className="h-[293px] flex items-center justify-center border-2 border-dashed border-[#D5D7DA] rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-center flex flex-col items-center text-[#535862] gap-y-1">
              <MdAddCircleOutline size={24} />
              <Text size="lg" fw={700}>
                New Post
              </Text>
            </div>
          </div>

          {userPosts?.map((post) => (
            <div
              key={post.id}
              className="h-[300px] border-2 border-[#D5D7DA] rounded-xl shadow-md p-10 relative"
            >
              <div className="ml-auto w-fit absolute right-3 top-3">
                <LuTrash2 color="red" />
              </div>
              <div className="flex flex-col gap-y-4 relative">
                <Title order={3} className="font-semibold text-[#535862]">
                  {post.title}
                </Title>
                <Text size="md" c="#535862" className="line-clamp-6">
                  {post.body}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserPost;
