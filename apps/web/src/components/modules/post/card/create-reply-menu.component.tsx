"use client";
import { styled } from "@mui/material";
import { useCallback, useState } from "react";
import { CreateReplyForm } from "../forms";
import { IPostId } from "../types";

const StyledCreateReplyFormContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const StyledOpenCreateReplyFormButton = styled("div")`
  width: 100%;
  border-radius: 20px;
  background-color: var(--color-primary-200);
  color: var(--color-primary-500);
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export function CreateReplyMenu({ postId }: { postId: IPostId }) {
  const [replyFormOpened, setReplyFormOpened] = useState(false);

  const handleCancelReplyCreate = useCallback(() => {
    setReplyFormOpened(false);
  }, []);

  return replyFormOpened ? (
    <StyledCreateReplyFormContainer>
      <CreateReplyForm postId={postId} onCancel={handleCancelReplyCreate} />
    </StyledCreateReplyFormContainer>
  ) : (
    <StyledOpenCreateReplyFormButton
      onClick={() => setReplyFormOpened((v) => !v)}
    >
      Add comment...
    </StyledOpenCreateReplyFormButton>
  );
}
