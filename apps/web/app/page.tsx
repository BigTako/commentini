"use client";

import styled from "@emotion/styled";
import PostsTable from "./modules/post/post-table.component";
import { useEffect, useState } from "react";
import { socket } from "./utils/socket";
import { SOCKET_EVENTS } from "./keys";
import { IPost } from "./modules/post/post";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPostsContainer = styled.div`
  width: 900px;
`;

export default function Page(): JSX.Element {
  const [isConnected, setIsConnected] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    function onConnect() {
      console.log("You are connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("You are disconnected");
      setIsConnected(false);
    }

    function onReceiveAllPosts(data: IPost[]) {
      setPosts(data);
    }

    socket.on(SOCKET_EVENTS.RECEIVE_ALL_POSTS, onReceiveAllPosts);
    socket.on(SOCKET_EVENTS.CONNECT, onConnect);
    socket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect);

    return () => {
      socket.off(SOCKET_EVENTS.CONNECT, onConnect);
      socket.off(SOCKET_EVENTS.DISCONNECT, onDisconnect);
    };
  }, [isConnected]);

  useEffect(() => {
    socket.emit(SOCKET_EVENTS.GET_ALL_POSTS, {}, () => {
      console.log("get-all-posts");
    });
  }, []);

  console.log({
    posts,
  });

  return (
    <StyledMainContainer>
      <StyledPostsContainer>
        {!isConnected && (
          <div style={{ textAlign: "center" }}>Disconnected</div>
        )}
        {isConnected && <PostsTable posts={posts} />}
      </StyledPostsContainer>
    </StyledMainContainer>
  );
}
