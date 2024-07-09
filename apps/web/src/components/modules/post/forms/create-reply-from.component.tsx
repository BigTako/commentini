import toast from "react-hot-toast";
import { useCallback } from "react";
import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto } from "../types";
import { PostForm } from "./post-form.component";
import { useParams } from "next/navigation";
import { useCreateReply } from "../useCreateReply";

export function CreateReplyForm({ onCancel }: { onCancel: () => void }) {
  const params = useParams<{ id: string[] }>();

  const postId = params.id[0] as string;

  const { createReply, isCreating } = useCreateReply({
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
