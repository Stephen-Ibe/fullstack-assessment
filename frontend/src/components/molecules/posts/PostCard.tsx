import { Text, Title } from "@mantine/core";
import { LuTrash2 } from "react-icons/lu";

type Props = {
  post: {
    id: string;
    title: string;
    body: string;
  };
};

export const PostCard = ({ post }: Props) => {
  return (
    <div className="min-h-[300px] border-2 border-[#D5D7DA] rounded-xl shadow-md p-10 relative">
      <div className="absolute ml-auto w-fit right-3 top-3">
        <LuTrash2 color="red" />
      </div>
      <div className="relative flex flex-col gap-y-4">
        <Title order={3} className="font-semibold text-[#535862]">
          {post.title}
        </Title>
        <Text size="md" c="#535862" className="line-clamp-6">
          {post.body}
        </Text>
      </div>
    </div>
  );
};
