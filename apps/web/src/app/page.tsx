"use client";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { ModalWindow } from "~/components/modal";
import { CreatePostForm } from "~/components/modules/post/forms";
import PostsContainer from "~/components/modules/post/posts-container.component";
import AddIcon from "@mui/icons-material/AddRounded";
import { useModal } from "~/contexts/modal.context";
import { useSocket } from "~/contexts/socket.context";
import { useScreenSize } from "~/hooks/useScreenSize";
import { Fab } from "@mui/material";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFab = styled(Fab)`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
`;

export default function Page(): JSX.Element {
  const { isConnected } = useSocket();

  const { isDesktop, isTablet } = useScreenSize();

  const { handleOpen, handleClose } = useModal();
  const handleOpenCreatePostModal = useCallback(() => {
    handleOpen("create-post-modal");
  }, []);

  let width;

  if (isDesktop) {
    width = "800px";
  } else if (isTablet) {
    width = "400px";
  } else {
    width = "100%";
  }

  return (
    <StyledMainContainer>
      {isConnected ? (
        <>
          <PostsContainer />
          <StyledFab
            onClick={handleOpenCreatePostModal}
            aria-label="add"
            size="medium"
          >
            <AddIcon />
          </StyledFab>
          <ModalWindow
            width={width}
            name="create-post-modal"
            title="Create post"
          >
            <CreatePostForm onCancel={handleClose} />
          </ModalWindow>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>Disconnected</div>
      )}
    </StyledMainContainer>
  );
}
