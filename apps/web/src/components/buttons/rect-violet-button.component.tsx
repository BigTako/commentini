import { RectButton } from "./rect-button.component";
import styled from "@emotion/styled";

export const VioletRectButton = styled(RectButton)`
  background-color: var(--color-secondary-100);
  color: var(--color-secondary-500);
  font-weight: bold;

  &:hover {
    background-color: var(--color-secondary-50);
  }

  &:active {
    background-color: var(--color-secondary-200);
  }
`;
