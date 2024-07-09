import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto } from "../types";
import { PostForm } from "./post-form.component";
import { useCreatePost } from "../useCreatePost";
import toast from "react-hot-toast";
import { useCallback } from "react";

export function CreatePostForm({ onCancel }: { onCancel: () => void }) {
  const { createPost, isCreating } = useCreatePost({
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
