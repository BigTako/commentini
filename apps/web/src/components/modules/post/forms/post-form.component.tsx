import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ICreatePostDto } from "../types";
import { ZodSchema } from "zod";
import { RichTextEditor } from "~/components/rich-text-editor.component";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  & > button[type="submit"] {
    background-color: var(--color-other-violet);
  }
`;

const StyledPostFormMenu = styled("div")`
  display: inline-flex;
  gap: 10px;
  justify-content: flex-end;

  & > .cancel-button,
  & > .cancel-button:hover {
    background-color: var(--color-primary-200);
    color: var(--color-primary-800);
    border: none;
  }

  & > .submit-button,
  & > .submit-button:hover {
    background-color: var(--color-other-violet);
    color: var(--color-primary-50);
    border: none;
  }
`;

export function PostForm({
  onCancel,
  onSubmit,
  validationSchema,
  disabled,
}: {
  onCancel: () => void;
  onSubmit: (_values: ICreatePostDto) => void;
  validationSchema: ZodSchema;
  disabled: boolean;
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(validationSchema)}
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
          <RichTextEditor onChange={(value) => setFieldValue("text", value)} />

          {/* <TextField
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
          /> */}
          <StyledPostFormMenu>
            <Button
              type="button"
              size="medium"
              className="cancel-button"
              disabled={disabled}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="medium"
              className="submit-button"
              disabled={disabled}
            >
              Submit
            </Button>
          </StyledPostFormMenu>
        </StyledForm>
      )}
    </Formik>
  );
}
