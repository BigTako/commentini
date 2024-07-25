import { ReactNode } from "react";
import { useScreenSize } from "~/hooks/useScreenSize";
import styled from "@emotion/styled";
import googleIcon from "@icons/google-logo.svg";
import { AuthServiceButton } from "~/components/buttons/auth-service-button.component";
import Image from "next/image";

interface ILoginContainerProps {
  width?: string;
}

const StyledLoginContainer = styled("div")<ILoginContainerProps>`
  box-shadow: var(--b-shadow-min);
  width: ${({ width }) => width};
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;

  & a {
    color: var(--color-secondary-500);
  }
`;

const StyledSecondaryText = styled("div")`
  fontsize: 14px;
  color: var(--color-primary-500);
  text-align: center;
`;

const StyledHeaderContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default function AuthWindow({
  header,
  subheader,
  children,
}: {
  header: string;
  subheader: string;
  children: ReactNode;
}) {
  const { isMobile } = useScreenSize();

  return (
    <StyledLoginContainer width={isMobile ? "100%" : ""}>
      <StyledHeaderContainer>
        <StyledSecondaryText>{header}</StyledSecondaryText>
        <AuthServiceButton width={isMobile ? "100%" : "300px"} href="#google">
          <Image
            width={20}
            height={20}
            priority
            src={googleIcon}
            alt="Login in with Google"
          />
          <div>Google</div>
        </AuthServiceButton>
        <StyledSecondaryText>{subheader}</StyledSecondaryText>
      </StyledHeaderContainer>

      {children}
    </StyledLoginContainer>
  );
}
