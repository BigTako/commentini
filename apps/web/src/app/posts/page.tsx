"use client";
import PostsContainer from "~/components/modules/post/posts-container.component";
import { usePosts } from "~/components/modules/post/usePosts";

export default function PostsPage(): JSX.Element {
  const { isLoading, posts } = usePosts();

  if (posts.length === 0) {
    return <div style={{ textAlign: "center" }}>Nothing is posted yet</div>;
  }
  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }
  return <PostsContainer posts={posts} />;
}
