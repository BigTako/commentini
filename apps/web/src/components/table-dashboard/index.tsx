import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "./cell.component";

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

export function TableDashboard<T>({
  id,
  headers,
  items,
  renderRow,
}: {
  id: string;
  headers: string[];
  items: T[];
  renderRow: (_item: T) => JSX.Element;
}) {
  return (
    <StyledTableContainer id={id}>
      <Table stickyHeader aria-label="Table of posts">
        <StyledTableHead>
          <TableRow>
            {headers.map((header, i) => (
              <StyledTableCell key={`${id}-header-${i}`}>
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>{items.map((item) => renderRow(item))}</TableBody>
      </Table>
    </StyledTableContainer>
  );
}
