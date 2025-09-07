import * as yup from "yup";

export const createPostSchema = yup.object().shape({
  title: yup.string().min(5, "Title must be at least 5 characters"),
  content: yup.string().min(20, "Content must be at least 20 characters"),
});
