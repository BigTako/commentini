"use client";
import { FullCenteredContainer } from "~/components/containers";
import styled from "@emotion/styled";
import Link from "next/link";
import { SignupForm } from "~/components/modules/auth/forms/signup-form.component";
import AuthWindow from "~/components/modules/auth/auth-window.component";

const StyledSecondaryText = styled("div")`
  fontsize: 14px;
  color: var(--color-primary-500);
  text-align: center;
`;

const StyledBodyContainer = styled("div")`
  margin: 10px 0;
`;

export default function SignupPage() {
  return (
    <FullCenteredContainer>
      <AuthWindow header="Sign Up with" subheader="Or with">
        <StyledBodyContainer>
          <SignupForm />
        </StyledBodyContainer>

        <StyledSecondaryText>
          Already have an account? <Link href={"/login"}>Log In!</Link>
        </StyledSecondaryText>
      </AuthWindow>
    </FullCenteredContainer>
  );
}
