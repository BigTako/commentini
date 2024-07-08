import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto } from "../types";
import { useCallback } from "react";
import { useCreatePost } from "../useCreatePost";
import { useModal } from "~/contexts/modal.context";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > button[type="submit"] {
    background-color: var(--color-other-violet);
  }
`;

export function CreatePostForm() {
  const { handleClose } = useModal();
  const { createPost, isCreating } = useCreatePost({
    onSuccess: () => {
      handleClose();
      toast.success("Post created");
    },
  });

  const handleSubmit = useCallback((values: ICreatePostDto) => {
    createPost(values);
  }, []);

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(createPostSchema)}
      initialValues={{
        username: "",
        email: "",
        text: "",
      }}
    >
      {({ errors, values, setFieldValue }) => (
        <StyledForm>
          <TextField
            error={!!errors.username}
            helperText={errors?.username ?? ""}
            size="small"
            label="Username"
            name="username"
            placeholder="Username"
            value={values["username"]}
            onChange={(e) => setFieldValue("username", e.target.value)}
          />
          <TextField
            error={!!errors.email}
            helperText={errors?.email ?? ""}
            size="small"
            label="Email"
            name="email"
            placeholder="Email"
            value={values["email"]}
            onChange={(e) => setFieldValue("email", e.target.value)}
          />
          <TextField
            error={!!errors.text}
            helperText={errors?.text ?? ""}
            label="Text"
            name="text"
            placeholder="Text"
            rows={5}
            maxRows={10}
            multiline
            value={values["text"]}
            onChange={(e) => setFieldValue("text", e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isCreating}
          >
            Submit
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
}
