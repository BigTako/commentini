import { styled } from "@mui/material";

const StyledCardTitle = styled("div")`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  * {
    white-space: nowrap;
  }
`;

export function PostCardTitle({
  username,
  createdAt,
}: {
  username: string;
  createdAt: string;
}) {
  return (
    <StyledCardTitle>
      <strong>{username}</strong>
      <div>{createdAt}</div>
    </StyledCardTitle>
  );
}
