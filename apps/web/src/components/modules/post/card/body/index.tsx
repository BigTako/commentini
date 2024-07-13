import { CardContent, styled, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { IPost } from "../../types";

const StyledCardText = styled(Typography)`
  font-size: 16px;
  color: var(--color-primary-600);
`;

export function PostCardBody({ post }: { post: IPost }) {
  const { text } = post;
  return (
    <CardContent>
      <StyledCardText>{ReactHtmlParser(text)}</StyledCardText>
    </CardContent>
  );
}
