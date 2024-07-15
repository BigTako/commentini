import toast from "react-hot-toast";
import { useCallback } from "react";
import dynamic from "next/dynamic";
import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto, IPostId } from "../types";
import { usePostQuery } from "~/contexts/post-query.context";

const PostForm = dynamic(
  () => import("./post-form.component").then((mod) => mod.PostForm),
  { ssr: false }
);

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
