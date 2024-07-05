"use client";
import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { Card, CardActions } from "@mui/material";
import { PostCardHeader } from "./header";
import { PostCardBody } from "./body";
import { PostCardVoteMenu } from "./header/vote-menu.component";
import { useScreenSize } from "~/hooks/useScreenSize";

const StyledCard = styled(Card)`
  & {
    width: 100%;
  }
`;

function PostCard({ post }: { post: IPost }) {
  const { isMobile } = useScreenSize();
  return (
    <StyledCard>
      <PostCardHeader post={post} />
      <PostCardBody post={post} />
      {isMobile && (
        <CardActions>
          <PostCardVoteMenu marginTop="0" />
        </CardActions>
      )}
    </StyledCard>
  );
}

export default PostCard;
