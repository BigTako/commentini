import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { useScreenSize } from "~/hooks/useScreenSize";
import PostsTable from "@modules/post/post-table.component";
import PostsList from "~/components/modules/post/posts-list.component";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Box, Button, Fab, Modal } from "@mui/material";

const DesktopContainer = styled("div")`
  max-width: 800px;
  position: relative;
`;

const MobileContainer = styled("div")`
  max-height: 100vh;
  width: 100%;
  padding: 10px;
`;

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        onClick={handleOpen}
        aria-label="add"
        size="medium"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          backgroundColor: "var(--color-primary-50)",
        }}
      >
        <AddIcon style={{ color: "var(--color-primary-700)" }} />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "var(--color-primary-50)",
            borderRadius: "8px",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

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
      <ChildModal />
    </>
  );
}

export default PostsContainer;
