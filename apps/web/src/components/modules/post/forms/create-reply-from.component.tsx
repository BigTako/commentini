import toast from "react-hot-toast";
import { useCallback } from "react";
import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto, IPostId } from "../types";
import { PostForm } from "./post-form.component";
import { usePostQuery } from "~/contexts/post-query.context";

export function CreateReplyForm({
  postId,
  onCancel,
}: {
  postId: IPostId;
  onCancel: () => void;
}) {
  const postQuery = usePostQuery();
  const { createReply, isCreating } = postQuery.useCreateReply({
    postId,
    onSuccess: () => {
      onCancel();
      toast.success("Post created");
    },
  });

  const onSubmit = useCallback((values: ICreatePostDto) => {
    createReply({ postId, reply: values });
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
