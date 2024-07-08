import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { useScreenSize } from "~/hooks/useScreenSize";
import PostsTable from "@modules/post/post-table.component";
import PostsList from "~/components/modules/post/posts-list.component";
import AddIcon from "@mui/icons-material/AddRounded";
import { Fab } from "@mui/material";
import { useModal } from "~/contexts/modal.context";
import { ModalWindow } from "~/components/modal";
import { CreatePostForm } from "./forms/create-post-form.component";
import { useCallback } from "react";

const DesktopContainer = styled("div")`
  // max-width: 1000px;
  position: relative;
`;

const MobileContainer = styled("div")`
  max-height: 100vh;
  width: 100%;
  padding: 10px;
`;

const StyledFab = styled(Fab)`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
`;

function PostsContainer({ posts }: { posts: IPost[] }) {
  const { handleOpen } = useModal();
  const { isDesktop, isTablet } = useScreenSize();
  let width;

  if (isDesktop) {
    width = "800px";
  } else if (isTablet) {
    width = "400px";
  } else {
    width = "100%";
  }

  const handleOpenCreatePostModal = useCallback(() => {
    handleOpen("create-post-modal");
  }, []);

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
      <StyledFab
        onClick={handleOpenCreatePostModal}
        aria-label="add"
        size="medium"
      >
        <AddIcon />
      </StyledFab>
      <ModalWindow width={width} name="create-post-modal" title="Create post">
        <CreatePostForm />
      </ModalWindow>
    </>
  );
}

export default PostsContainer;
