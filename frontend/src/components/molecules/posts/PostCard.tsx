import { Text, Title } from "@mantine/core";
import { LuTrash2 } from "react-icons/lu";

type Props = {
  post: {
    id: string;
    title: string;
    body: string;
  };
  deletePost(): void;
};

export const PostCard = ({ post, deletePost }: Props) => {
  return (
    <div className="min-h-[293px] border-2 border-[#D5D7DA] rounded-xl shadow-md p-10 relative">
      <div
        className="absolute ml-auto w-fit right-3 top-3 cursor-pointer hover:bg-gray-100 hover:p-2 p-2 hover:rounded-full"
        onClick={deletePost}
      >
        <LuTrash2 color="red" />
      </div>
      <div className="relative flex flex-col gap-y-4">
        <Title order={3} className="font-semibold">
          {post.title}
        </Title>
        <Text size="md" className="line-clamp-6">
          {post.body}
        </Text>
      </div>
    </div>
  );
};
