import styled from "@emotion/styled";
import { TableCell, TableCellProps } from "@mui/material";

interface StyledTableCellProps {
  $maxWidth?: number;
}

const _StyledTableCell = styled(TableCell)<StyledTableCellProps>`
  max-width: ${(props) => props.$maxWidth || 250}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function StyledTableCell(props: TableCellProps) {
  return <_StyledTableCell {...props} />;
}
