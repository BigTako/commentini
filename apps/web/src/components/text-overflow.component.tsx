import styled from "@emotion/styled";

interface ITextOverflowProps {
  maxWidth: string;
}

export const TextOverflow = styled("div")<ITextOverflowProps>`
  max-width: ${({ maxWidth }) => maxWidth};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
