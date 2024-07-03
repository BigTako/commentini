import styled from "@emotion/styled";
import { TableRow, TableRowProps } from "@mui/material";

const _StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: var(--color-primary-200);
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;

export function StyledTableRow(props: TableRowProps) {
  return <_StyledTableRow {...props} />;
}
