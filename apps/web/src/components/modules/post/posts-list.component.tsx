import { ListContainer } from "~/components/containers";
import { IPost } from "./types";
import PostCard from "./card";

function PostsList({ posts }: { posts: IPost[] }) {
  const listId = "posts-list";
  return (
    <ListContainer
      id={listId}
      items={posts}
      renderItem={(post) => <PostCard post={post} />}
    />
  );
}

export default PostsList;
