import styled from "@emotion/styled";
import { ICreatePostDto } from "~/components/modules/post/types";
import { Button, TextField } from "@mui/material";
import { Formik, Field, Form } from "formik";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > button[type="submit"] {
    background-color: var(--color-other-violet);
  }
`;

export function CreatePostForm() {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        text: "",
      }}
      onSubmit={async (values: ICreatePostDto) => {
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
