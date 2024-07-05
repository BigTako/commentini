import { Avatar, styled } from "@mui/material";

const StyledAvatarContainer = styled("div")`
  background-color: var(--color-other-white);
  padding: 4px;
  border-radius: 100%;
`;

export function PostCardUserAvatar({ username }: { username: string }) {
  return (
    <StyledAvatarContainer>
      <Avatar
        sx={{ bgcolor: "var(--color-other-violet)" }}
        aria-label="default "
      >
        {username.charAt(0).toUpperCase()}
      </Avatar>
    </StyledAvatarContainer>
  );
}
