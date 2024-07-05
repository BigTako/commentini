"use client";
import styled from "@emotion/styled";
import { useSocket } from "@hooks/useSocket";
import { usePosts } from "@hooks/usePosts";
import PostsContainer from "~/components/modules/post/posts-container.component";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Page(): JSX.Element {
  const { socket, isConnected } = useSocket();
  const { isLoading, posts } = usePosts({ socket, isConnected });

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
