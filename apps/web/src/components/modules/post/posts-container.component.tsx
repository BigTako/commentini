import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { useScreenSize } from "~/hooks/useScreenSize";
import PostsTable from "@modules/post/post-table.component";
import PostsList from "~/components/modules/post/posts-list.component";
import AddIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ReactNode } from "react";
import { Box, Button, Fab, IconButton, Modal, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useModal } from "~/contexts/modal.context";

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

interface IModalBoxProps {
  $width: string;
}

const StyledModalBox = styled(Box)<IModalBoxProps>`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => props.$width};
    background-color: var(--color-primary-50);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
    transition: all 1s ease-out;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > button[type="submit"] {
    background-color: var(--color-other-violet);
  }
`;

interface CreatePostDto {
  username: string;
  email: string;
  text: string;
}

function CreatePostForm() {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        text: "",
      }}
      onSubmit={async (values: CreatePostDto) => {
        console.log({ values });
      }}
    >
      <StyledForm>
        <Field
          size="small"
          label="Username"
          name="username"
          placeholder="Username"
          component={TextField}
        />
        <Field
          size="small"
          label="Email"
          name="email"
          placeholder="Email"
          component={TextField}
        />
        <Field
          label="Text"
          name="text"
          placeholder="Text"
          component={TextField}
          rows={5}
          maxRows={10}
          multiline
        />
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </StyledForm>
    </Formik>
  );
}

const StyledInnerModalContainer = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledModalCloseButton = styled(IconButton)`
  position: absolute;
  top: -10px;
  right: -10px;
`;

const StyledFormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 40px;

  & > .form-header {
    text-align: center;
  }
`;

function ModalWindow({
  name,
  title,
  children,
}: {
  name: string;
  title: string;
  children: ReactNode;
}) {
  const { isDesktop, isTablet } = useScreenSize();
  const { handleClose, opened } = useModal();
  const isOpened = opened === name;
  let width;

  if (isDesktop) {
    width = "800px";
  } else if (isTablet) {
    width = "400px";
  } else {
    width = "100%";
  }

  return (
    <>
      <Modal open={isOpened} onClose={handleClose}>
        <StyledModalBox $width={width}>
          <StyledInnerModalContainer>
            <StyledModalCloseButton
              onClick={handleClose}
              aria-label="close create modal button"
            >
              <CloseRoundedIcon />
            </StyledModalCloseButton>
            <StyledFormContainer>
              <h3 className="form-header">{title}</h3>
              {children}
            </StyledFormContainer>
          </StyledInnerModalContainer>
        </StyledModalBox>
      </Modal>
    </>
  );
}

function PostsContainer({ posts }: { posts: IPost[] }) {
  const { handleOpen } = useModal();
  const { isDesktop } = useScreenSize();

  const handleOpenCreatePostModal = () => {
    handleOpen("create-post-modal");
  };

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
      <ModalWindow name="create-post-modal" title="Create post">
        <CreatePostForm />
      </ModalWindow>
    </>
  );
}

export default PostsContainer;
