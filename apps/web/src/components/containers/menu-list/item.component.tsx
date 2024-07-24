import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledListItemIcon = styled(ListItemIcon)`
  color: inherit;
`;

const StyledListButton = styled(ListItemButton)`
  &:hover {
    background-color: var(--color-secondary-50);
  }
`;

export function MenuListItem({
  icon,
  text,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}) {
  return (
    <ListItem disablePadding>
      <StyledListButton onClick={onClick}>
        <StyledListItemIcon>{icon}</StyledListItemIcon>
        <ListItemText>{text}</ListItemText>
      </StyledListButton>
    </ListItem>
  );
}
