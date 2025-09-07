import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { yupResolver } from "mantine-form-yup-resolver";

import { createPostSchema } from "../schema";

export const usePosts = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<{
    title: string;
    content: string;
  }>({
    initialValues: { title: "", content: "" },
    validateInputOnChange: true,
    validate: yupResolver(createPostSchema),
  });

  const handleCreatePost = (values: { title: string; content: string }) => {
    console.log(values);
  };

  return {
    modalActions: { opened, open, close },
    formActions: { handleCreatePost, form },
  };
};
