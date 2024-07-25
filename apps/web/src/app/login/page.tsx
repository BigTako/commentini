"use client";
import { FullCenteredContainer } from "~/components/containers";
import styled from "@emotion/styled";
import Link from "next/link";
import { LoginForm } from "~/components/modules/auth/forms/login-form.component";
import AuthWindow from "~/components/modules/auth/auth-window.component";

const StyledSecondaryText = styled("div")`
  fontsize: 14px;
  color: var(--color-primary-500);
  text-align: center;
`;

const StyledBodyContainer = styled("div")`
  margin: 10px 0;
`;

export default function LoginPage() {
  return (
    <FullCenteredContainer>
      <AuthWindow header="Login with" subheader="Or with">
        <StyledBodyContainer>
          <LoginForm />
        </StyledBodyContainer>

        <StyledSecondaryText>
          Dont have an account? <Link href={"/signup"}>Create!</Link>
        </StyledSecondaryText>
      </AuthWindow>
    </FullCenteredContainer>
  );
}
