import { RoundedButton } from "./rouned-button.component";
import styled from "@emotion/styled";

export const VioletRoundedButton = styled(RoundedButton)`
  background-color: var(--color-secondary-50);
  color: var(--color-secondary-500);

  &:hover {
    background-color: var(--color-secondary-150);
  }

  &:active {
    background-color: var(--color-secondary-250);
  }
`;
