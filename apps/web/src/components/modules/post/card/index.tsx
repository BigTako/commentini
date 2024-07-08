"use client";
import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { Card, CardActions, IconButton, IconButtonProps } from "@mui/material";
import { PostCardHeader } from "./header";
import { PostCardBody } from "./body";
import { PostCardVoteMenu } from "./header/vote-menu.component";
import { useScreenSize } from "~/hooks/useScreenSize";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Dispatch, SetStateAction } from "react";

const StyledCard = styled(Card)`
  & {
    width: 100%;
  }
`;

interface ExpandMoreProps extends IconButtonProps {
  $expand: boolean;
}

const ExpandMore = styled(IconButton)<ExpandMoreProps>`
  transform: ${(props) => (!props.$expand ? "rotate(0deg)" : "rotate(180deg)")};
  transition: transform 0.5s ease-out;
`;

const StyledShowRepliesMenu = styled("div")`
  display: flex;
  gap: 10px;
  margin-left: auto;
  align-items: center;

  & > * {
    font-weight: normal;
  }
`;

function PostCard({
  post,
  expanded,
  setExpanded,
}: {
  post: IPost;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMobile } = useScreenSize();
  const withReplies = !!post.replies && post.replies.length > 0;

  return (
    <StyledCard>
      <PostCardHeader post={post} />
      <PostCardBody post={post} />
      <CardActions>
        {isMobile && <PostCardVoteMenu marginTop="0" />}
        {withReplies && (
          <StyledShowRepliesMenu>
            <h5>{expanded ? "Hide" : "Show"} replies</h5>
            <ExpandMore
              $expand={expanded}
              onClick={() => setExpanded?.((v) => !v)}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </StyledShowRepliesMenu>
        )}
      </CardActions>
    </StyledCard>
  );
}

export default PostCard;
