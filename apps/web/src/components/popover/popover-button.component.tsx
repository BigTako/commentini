import { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledPopoverButton = styled("div")`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  color: var(--color-secondary-600);
  font-size: 14px;
  align-self: center;
  transition: background-color 0.4s ease-out;

  &:hover {
    background-color: var(--color-primary-200);
  }

  & > div {
    font-size: 14px;
    align-self: center;
  }
`;

export function PopoverButton({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <StyledPopoverButton>
      {icon}
      <div>{text}</div>
    </StyledPopoverButton>
  );
}
