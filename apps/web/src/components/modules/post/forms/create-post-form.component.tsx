import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto } from "../types";
import { PostForm } from "./post-form.component";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { usePostQuery } from "~/contexts/post-query.context";

export function CreatePostForm({ onCancel }: { onCancel: () => void }) {
  const postQuery = usePostQuery();
  const { createPost, isCreating } = postQuery.useCreatePost({
    onSuccess: () => {
      onCancel();
      toast.success("Post created");
    },
  });

  const onSubmit = useCallback((values: ICreatePostDto) => {
    createPost(values);
  }, []);

  return (
    <PostForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      disabled={isCreating}
      validationSchema={createPostSchema}
    />
  );
}
