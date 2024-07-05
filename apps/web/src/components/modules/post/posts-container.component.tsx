import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { useScreenSize } from "~/hooks/useScreenSize";
import PostsTable from "@modules/post/post-table.component";
import PostsList from "~/components/modules/post/posts-list.component";

const DesktopContainer = styled("div")`
  max-width: 800px;
`;

const MobileContainer = styled("div")`
  max-height: 100vh;
  width: 100%;
  padding: 10px;
`;

function PostsContainer({ posts }: { posts: IPost[] }) {
  const { isDesktop } = useScreenSize();
  return (
    <>
      {isDesktop && (
        <DesktopContainer>
          <PostsTable posts={posts} />
        </DesktopContainer>
      )}
      {!isDesktop && (
        <MobileContainer>
          <PostsList posts={posts} />
        </MobileContainer>
      )}
    </>
  );
}

export default PostsContainer;
