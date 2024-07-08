import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledVoteMenuText = styled(Typography)`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
`;

interface VoteMenuProps {
  $marginTop?: string;
}

const StyledVoteMenu = styled("div")<VoteMenuProps>`
  display: flex;
  gap: 10px;
  margin-top: ${(props) => props.$marginTop};
`;

export function PostCardVoteMenu({ marginTop }: { marginTop?: string }) {
  return (
    <StyledVoteMenu $marginTop={marginTop}>
      <IconButton aria-label="like button">
        <KeyboardArrowUpIcon />
      </IconButton>
      <StyledVoteMenuText color="text.secondary">0</StyledVoteMenuText>
      <IconButton aria-label="dislike button">
        <KeyboardArrowDownIcon />
      </IconButton>
    </StyledVoteMenu>
  );
}
