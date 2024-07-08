"use client";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { useSocket } from "~/contexts/socket.context";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PostsPageLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { isConnected } = useSocket();

  return (
    <StyledMainContainer>
      {isConnected ? (
        children
      ) : (
        <div style={{ textAlign: "center" }}>Disconnected</div>
      )}
    </StyledMainContainer>
  );
}
