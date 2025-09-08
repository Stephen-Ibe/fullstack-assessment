import { Button, Modal, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  onClose: () => void;
  deleteActions: {
    isDeletingPost: boolean;
    handleDeletePost: (postId: string) => void;
  };
  postData: Record<string, string>;
};

export const ConfirmDelete = ({
  opened,
  onClose,
  deleteActions: { isDeletingPost, handleDeletePost },
  postData: { postId, postTitle },
}: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<span className="text-2xl font-semibold">Confirm Delete</span>}
      size="md"
      padding="lg"
      centered
    >
      <Text>
        Are you sure you want to delete{" "}
        <span className="font-bold">{postTitle}</span>?
      </Text>
      <div className="mt-6 flex justify-end gap-x-4">
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red.5"
          onClick={() => handleDeletePost(postId)}
          loading={isDeletingPost}
          disabled={isDeletingPost}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
