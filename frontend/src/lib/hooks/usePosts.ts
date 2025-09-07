import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { yupResolver } from "mantine-form-yup-resolver";

import { createPostSchema } from "../schema";

export const usePosts = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<{
    title: string;
    body: string;
  }>({
    initialValues: { title: "", body: "" },
    validateInputOnChange: true,
    validate: yupResolver(createPostSchema),
  });

  const handleCreatePost = (values: { title: string; body: string }) => {
    console.log(values);
  };

  return {
    modalActions: { opened, open, close },
    formActions: { handleCreatePost, form },
  };
};
