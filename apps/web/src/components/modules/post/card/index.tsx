"use client";
import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { Card } from "@mui/material";
import { PostCardHeader } from "./header";
import { PostCardBody } from "./body";

const StyledCard = styled(Card)`
  & {
    width: 100%;
  }
`;

function PostCard({ post }: { post: IPost }) {
  return (
    <StyledCard>
      <PostCardHeader post={post} />
      <PostCardBody post={post} />
    </StyledCard>
  );
}

export default PostCard;
