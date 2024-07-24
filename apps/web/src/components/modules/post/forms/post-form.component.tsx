import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { ICreatePostDto } from "../types";
import { ZodSchema } from "zod";
import { RichTextEditor } from "~/components/rich-text-editor.component";
import { htmlPlainText } from "~/utils/htmlPlainText";

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
    background-color: var(--color-secondary-500);
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
      initialValues={{
        username: "",
        email: "",
        text: "",
      }}
      validate={(values) => {
        const errors = {} as { [key: string]: string };

        const plainText = htmlPlainText(values.text).replace(/\n/, "");

        const validationResult = validationSchema.safeParse({
          ...values,
          text: plainText,
        });

        validationResult.error?.errors.forEach((e) => {
          const field = e.path[0] as string;
          const message = e.message;
          errors[field] = message;
        });

        return errors;
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
          <RichTextEditor
            error={errors.text}
            value={values["text"]}
            setFieldValue={(val) => setFieldValue("text", val)}
          />
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
