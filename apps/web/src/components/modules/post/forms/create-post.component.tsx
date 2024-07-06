import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createPostSchema } from "~/components/lib/validations-schemas/post";
import { ICreatePostDto, IPost } from "../types";
import { SOCKET_EVENTS } from "~/keys";
import { useSocket } from "~/contexts/socket.context";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > button[type="submit"] {
    background-color: var(--color-other-violet);
  }
`;

export function CreatePostForm() {
  const { socket, isConnected } = useSocket();

  const handleSubmit = (values: ICreatePostDto) => {
    if (isConnected) {
      socket.emit(
        SOCKET_EVENTS.CREATE_POST,
        values,
        (data: { data: IPost }) => {
          const { data: post } = data;
          console.log(post);
        }
      );
    }
  };

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
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
}
