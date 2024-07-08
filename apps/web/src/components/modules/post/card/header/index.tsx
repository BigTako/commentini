import styled from "@emotion/styled";
import { CardHeader } from "@mui/material";
import { IPost } from "../../types";
import { PostCardVoteMenu } from "./vote-menu.component";
import { PostCardUserAvatar } from "./user-avatar.component";
import { PostCardTitle } from "./title.component";
import { useScreenSize } from "~/hooks/useScreenSize";

const StyledCardHeader = styled(CardHeader)`
  & {
    padding: 12px;
    display: flex;
    align-item: center;
    justify-content: center;
    background-color: var(--color-primary-100);
  }
`;

export function PostCardHeader({ post }: { post: IPost }) {
  const { isMobile } = useScreenSize();
  const { username, createdAt } = post;
  return (
    <StyledCardHeader
      avatar={<PostCardUserAvatar username={username} />}
      action={!isMobile && <PostCardVoteMenu marginTop="5%" />}
      title={
        <PostCardTitle
          username={username}
          createdAt={new Date(createdAt).toLocaleString()}
        />
      }
    />
  );
}
