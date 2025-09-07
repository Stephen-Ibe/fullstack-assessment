import { Text } from "@mantine/core";
import { MdAddCircleOutline } from "react-icons/md";

export const NewPostCard = () => (
  <div className="min-h-[293px] flex items-center justify-center border-2 border-dashed border-[#D5D7DA] rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
    <div className="text-center flex flex-col items-center text-[#535862] gap-y-1">
      <MdAddCircleOutline size={24} />
      <Text size="lg" fw={700}>
        New Post
      </Text>
    </div>
  </div>
);
