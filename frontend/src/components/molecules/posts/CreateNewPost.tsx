import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { usePosts } from "../../../lib";

type Props = {
  opened: boolean;
  close(): void;
  userId: string;
};

export const CreateNewPost = ({ opened, close, userId }: Props) => {
  const {
    formActions: { handleCreatePost, form },
  } = usePosts(userId);

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      padding="lg"
      withCloseButton={false}
      closeOnClickOutside={false}
      size="lg"
      title={<span className="text-2xl font-semibold">New Post</span>}
    >
      <form
        className="flex flex-col gap-y-5"
        onSubmit={form.onSubmit((values) => handleCreatePost(values, close))}
      >
        <TextInput
          label="Post Title"
          placeholder="Give your post a title"
          size="md"
          radius="sm"
          name="title"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Post Content"
          placeholder="Write something mind blowing..."
          size="md"
          radius="sm"
          rows={6}
          key={form.key("body")}
          {...form.getInputProps("body")}
        />
        <div className="mt-2 ml-auto space-x-4 w-fit">
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
  );
};
