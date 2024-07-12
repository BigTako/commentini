import styled from "@emotion/styled";
import { useScreenSize } from "~/hooks/useScreenSize";
import PostsTable from "@modules/post/post-table.component";
import PostsList from "~/components/modules/post/posts-list.component";
import { usePostQuery } from "~/contexts/post-query.context";

const DesktopContainer = styled("div")`
  position: relative;
`;

const MobileContainer = styled("div")`
  max-height: 100vh;
  width: 100%;
  padding: 10px;
`;

function PostsContainer() {
  const { isDesktop } = useScreenSize();
  const postQuery = usePostQuery();

  const { isLoading, data: posts } = postQuery.usePosts();

  const isNothingIsPosted = !posts || posts.length === 0;

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (isNothingIsPosted) {
    return <div style={{ textAlign: "center" }}>Nothing is posted</div>;
  }

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
