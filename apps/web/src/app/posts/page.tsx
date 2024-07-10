"use client";
import { styled } from "@mui/material";
import PostsContainer from "~/components/modules/post/posts-container.component";
import { usePostQuery } from "~/contexts/post-query.context";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/AddRounded";
import { useModal } from "~/contexts/modal.context";
import { ModalWindow } from "~/components/modal";
import { useCallback } from "react";
import { CreatePostForm } from "~/components/modules/post/forms/create-post-form.component";
import { useScreenSize } from "~/hooks/useScreenSize";

const StyledFab = styled(Fab)`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
`;

export default function PostsPage(): JSX.Element {
  const postQuery = usePostQuery();
  const { isLoading, data: posts } = postQuery.usePosts();
  const { isDesktop, isTablet } = useScreenSize();

  const { handleOpen, handleClose } = useModal();
  const handleOpenCreatePostModal = useCallback(() => {
    handleOpen("create-post-modal");
  }, []);

  if (!posts || posts.length === 0) {
    return <div style={{ textAlign: "center" }}>Nothing is posted yet</div>;
  }

  let width;

  if (isDesktop) {
    width = "800px";
  } else if (isTablet) {
    width = "400px";
  } else {
    width = "100%";
  }

  const isNothingIsPosted = !posts || posts.length === 0;

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }
  return (
    <>
      {isNothingIsPosted ? (
        <div style={{ textAlign: "center" }}>Nothing is posted yet</div>
      ) : (
        <PostsContainer posts={posts} />
      )}
      <StyledFab
        onClick={handleOpenCreatePostModal}
        aria-label="add"
        size="medium"
      >
        <AddIcon />
      </StyledFab>
      <ModalWindow width={width} name="create-post-modal" title="Create post">
        <CreatePostForm onCancel={handleClose} />
      </ModalWindow>
    </>
  );
}
