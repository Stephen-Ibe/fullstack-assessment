import { Modal, type ModalProps } from "@mantine/core";

type Props = ModalProps;
export const FSModal = ({ children, ...props }: Props) => (
  <Modal {...props}>{children}</Modal>
);
