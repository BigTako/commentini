"use client";
import styled from "@emotion/styled";
import { IPost } from "~/components/modules/post/types";
import { Card, CardActions, IconButton, IconButtonProps } from "@mui/material";
import { PostCardHeader } from "./header";
import { PostCardBody } from "./body";
import { PostCardVoteMenu } from "./header/vote-menu.component";
import { useScreenSize } from "~/hooks/useScreenSize";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CreateReplyForm } from "../forms";

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
  const [replyFormOpened, setReplyFormOpened] = useState(false);

  const { isMobile } = useScreenSize();
  const withReplies = !!post.replies && post.replies.length > 0;

  const handleCancelReplyCreate = useCallback(() => {
    setReplyFormOpened(false);
  }, []);

  return (
    <StyledCard>
      <PostCardHeader post={post} />
      <PostCardBody post={post} />
      <CardActions
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {replyFormOpened ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "10px",
            }}
          >
            <CreateReplyForm
              postId={post.id}
              onCancel={handleCancelReplyCreate}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "var(--color-primary-200)",
              color: "var(--color-primary-500)",
              padding: "10px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => setReplyFormOpened((v) => !v)}
          >
            Add comment...
          </div>
        )}

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
