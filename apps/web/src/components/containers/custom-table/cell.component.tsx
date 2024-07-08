import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

interface IStyledTableCellProps {
  $maxWidth?: number | string;
}

export const StyledTableCell = styled(TableCell)<IStyledTableCellProps>`
  & {
    max-width: ${(props) => {
      if (typeof props.$maxWidth === "string") {
        return props.$maxWidth;
      } else {
        return `${props.$maxWidth}px`;
      }
    }};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
