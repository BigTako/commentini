"use client";

import { Form, Formik } from "formik";
import styled from "@emotion/styled";
import { InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import toast from "react-hot-toast";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signUpSchema } from "~/components/lib/validations-schemas/user";
import { ISignupDto } from "../types";
import { useAuthQuery } from "~/contexts/auth-query.context";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 10px 0px;
`;

const StyledTextField = styled(TextField)`
  input::placeholder {
    color: var(--color-primary-400);
    opacity: 1;
  }
`;

const StyledLoginButton = styled("button")`
  width: 100%;
  padding: 16px;
  background-color: var(--color-secondary-500);
  color: var(--color-other-white);
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.4s ease-out;
  cursor: pointer;
  font-family: inherit;
  border: none;
  font-size: 14px;

  &:hover {
    background-color: var(--color-secondary-600);
  }

  &:active {
    background-color: var(--color-secondary-700);
  }
`;

export function SignupForm() {
  const { signup, isLoading } = useAuthQuery().useSingup({
    onSuccess: () => {
      toast.success("Account created successfuly!");
    },
    onError: (error) => {
      const message = error.message;
      toast.error(message);
    },
  });

  const onSubmit = async (values: ISignupDto) => {
    await signup(values);
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(signUpSchema)}
      initialValues={{
        email: "",
        username: "",
        password: "",
      }}
    >
      {({ errors, values, setFieldValue }) => (
        <StyledForm>
          <StyledTextField
            error={!!errors.username}
            helperText={errors?.username ?? ""}
            onChange={(e) => setFieldValue("username", e.target.value)}
            id="username-input"
            value={values.username}
            placeholder="your name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon
                    style={{ color: "var(--color-primary-400)" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            error={!!errors.email}
            helperText={errors?.email ?? ""}
            onChange={(e) => setFieldValue("email", e.target.value)}
            id="email-input"
            value={values.email}
            placeholder="youremail@example.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: "var(--color-primary-400)" }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            error={!!errors.password}
            helperText={errors?.password ?? ""}
            value={values.password}
            onChange={(e) => setFieldValue("password", e.target.value)}
            id="password-input"
            placeholder="your password"
            type={passwordVisible ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setPasswordVisible((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  {!passwordVisible && (
                    <VisibilityIcon
                      style={{ color: "var(--color-primary-400)" }}
                    />
                  )}
                  {passwordVisible && (
                    <VisibilityOffIcon
                      style={{ color: "var(--color-primary-400)" }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <StyledLoginButton type="submit" disabled={isLoading}>
            Log In
          </StyledLoginButton>
        </StyledForm>
      )}
    </Formik>
  );
}
