"use client";
import { useParams } from "next/navigation";
import PostCard from "~/components/modules/post/card";
import { usePost } from "~/components/modules/post/usePost";

export default function PostPage() {
  const params = useParams<{ id: string[] }>();

  const id = params.id[0] as string;

  const { isLoading, post } = usePost({ id });

  const isPostFound = !isLoading && post;

  if (!post) {
    return <div style={{ textAlign: "center" }}>Post not found</div>;
  }

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  return isPostFound && <PostCard post={post} />;
}
