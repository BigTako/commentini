"use client";
import styled from "@emotion/styled";
import PostsContainer from "~/components/modules/post/posts-container.component";
import { usePosts } from "~/components/modules/post/usePosts";
import { useSocket } from "~/contexts/socket.context";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Page(): JSX.Element {
  const { isConnected } = useSocket();
  const { isLoading, posts } = usePosts();

  return (
    <StyledMainContainer>
      {isConnected && isLoading && (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
      {!isConnected && <div style={{ textAlign: "center" }}>Disconnected</div>}
      {isConnected && !isLoading && <PostsContainer posts={posts} />}
    </StyledMainContainer>
  );
}
