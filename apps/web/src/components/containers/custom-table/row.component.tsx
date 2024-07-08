import styled from "@emotion/styled";
import { TableRow } from "@mui/material";

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: var(--color-primary-200);
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
