import styled from "@emotion/styled";
import { RectButton } from "./rect-button.component";

interface IAuthServiceButtonProps {
  width: string;
}

export const AuthServiceButton = styled(RectButton)<IAuthServiceButtonProps>`
  box-shadow: var(--b-shadow-min);
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  font-weight: bold;
  color: var(--color-secondary-500);

  &:hover {
    background-color: var(--color-primary-100);
  }

  &:active {
    background-color: var(--color-primary-200);
  }

  & > div {
    align-self: center;
  }
`;
