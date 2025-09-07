import { Text, Title } from "@mantine/core";
import { useLocation, useParams } from "react-router";
import { PageHelmet } from "../components";
import { useGetUsersPosts } from "../lib";

const UserPost = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    state: { name, email },
  } = useLocation();

  const { data: userPosts } = useGetUsersPosts(userId || "");

  console.log(userPosts, { name, email });

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

        <div className="grid grid-cols-3 my-8 gap-12">
          <div className="h-[293px] flex items-center justify-center border-2 border-dashed border-[#D5D7DA] rounded-lg cursor-pointer hover:shadow-xl transition-shadow">
            <Image />
            <Text>New Post</Text>
          </div>

          {userPosts?.map((post) => (
            <div
              key={post.id}
              className="h-[300px] border-2 border-[#D5D7DA] rounded-xl shadow-md p-8"
            >
              <div className="flex flex-col gap-y-4">
                <Title
                  order={4}
                  className="font-semibold text-[#535862] mb-3 line-clamp-2 mr-4"
                >
                  {post.title}
                </Title>
                <Text className="text-[#535862] line-clamp-6">{post.body}</Text>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserPost;
