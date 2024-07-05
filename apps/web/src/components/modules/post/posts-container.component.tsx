import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { useScreenSize } from "~/hooks/useScreenSize";
import PostsTable from "@modules/post/post-table.component";
import PostsList from "~/components/modules/post/posts-list.component";
import AddIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { Box, Button, Fab, IconButton, Modal, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";

const DesktopContainer = styled("div")`
  max-width: 800px;
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

const StyledModalBox = styled(Box)`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: var(--color-primary-50);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
  }
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
      <StyledFab onClick={handleOpen} aria-label="add" size="medium">
        <AddIcon />
      </StyledFab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <StyledModalBox>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <IconButton
              onClick={handleClose}
              aria-label="close create modal button"
              style={{ position: "absolute", top: -10, right: -10 }}
            >
              <CloseRoundedIcon />
            </IconButton>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
              <h3 style={{ textAlign: "center" }}>Create post</h3>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  text: "",
                }}
                onSubmit={async (values) => {
                  console.log({ values });
                }}
              >
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Field
                    label="Username"
                    name="username"
                    placeholder="Doe"
                    component={TextField}
                  />
                  <Field
                    label="Email"
                    name="email"
                    placeholder="Doe"
                    component={TextField}
                  />
                  <Field
                    label="Text"
                    name="lastName"
                    placeholder="Doe"
                    component={TextField}
                  />
                  <Button variant="contained">Submit</Button>
                </Form>
              </Formik>
            </div>
          </div>
        </StyledModalBox>
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
