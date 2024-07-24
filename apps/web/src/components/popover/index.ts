import styled from "@emotion/styled";

interface IStyledPopoverProps {
  visible?: boolean;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
}

export const Popover = styled("div")<IStyledPopoverProps>`
  position: absolute;
  background-color: var(--color-primary-50);
  box-shadow: var(--b-shadow-min);
  right: ${({ right }) => right};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  animation: ${({ visible }) => (visible ? "appear" : "")} 0.4s normal;
  border-radius: 5px;
`;
