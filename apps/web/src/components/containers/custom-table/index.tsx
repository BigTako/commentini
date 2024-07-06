import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "./cell.component";
import { StyledTableRow } from "./row.component";
import { ReactNode } from "react";
import { CustomTableColumn, CustomTableRow } from "./types";

const StyledTableHead = styled(TableHead)`
  & > tr > th {
    background-color: var(--color-primary-300);
  }
`;

const StyledTableContainer = styled(TableContainer)`
  && {
    background-color: var(--color-primary-100);
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
    border-radius: 8px;
    max-height: 500px;
    overflow-y: auto;
    width: 100%;
  }
`;

export function CustomTable({
  id,
  columns,
  rows,
}: {
  id: string;
  columns: CustomTableColumn[];
  rows: CustomTableRow[];
}) {
  return (
    <StyledTableContainer id={id}>
      <Table stickyHeader aria-label="Table of posts">
        <StyledTableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                align={column.textAlign || "right"}
                width={column.width}
                key={`${id}-header-${column.id}`}
              >
                <strong>{column.name}</strong>
              </StyledTableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow
              key={`${id}-row-${i}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((col, i) => (
                <StyledTableCell
                  key={`${id}-cell-${i}`}
                  align={col.textAlign || "right"}
                  component="td"
                  scope="row"
                >
                  {(col.formatField?.(row[col.field]) as ReactNode) ??
                    (row[col.field] as ReactNode)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
