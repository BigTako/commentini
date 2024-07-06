import { IconButton, styled } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface IStyledModalCloseButtonProps {
  $top: string | number;
  $right: string | number;
}

const StyledModalCloseButton = styled(IconButton)<IStyledModalCloseButtonProps>`
  position: absolute;
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
`;

export function ModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <StyledModalCloseButton
      $top="-10px"
      $right="-10px"
      onClick={onClose}
      aria-label="close create modal button"
    >
      <CloseRoundedIcon />
    </StyledModalCloseButton>
  );
}
