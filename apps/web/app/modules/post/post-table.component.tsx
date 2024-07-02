import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IPost } from "./post.d";

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: var(--color-primary-200);
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;

const StyledTableHead = styled(TableHead)`
  & > tr > th {
    background-color: var(--color-primary-300);
  }
`;

interface StyledTableContainerProps {
  columnsNum: number;
  columWidth: number;
}

const StyledTableContainer = styled(TableContainer)<StyledTableContainerProps>`
  && {
    background-color: var(--color-primary-100);
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
    border-radius: 8px;
    max-height: 500px;
    overflow-y: auto;
    width: ${({ columnsNum, columWidth }) => columnsNum * columWidth}px;
  }
`;

const StyledTableCell = styled(TableCell)`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function TableDashboard({
  headers,
  items,
}: {
  headers: string[];
  items: object[];
}) {
  return (
    <StyledTableContainer columWidth={250} columnsNum={headers.length}>
      <Table stickyHeader aria-label="Table of posts">
        <StyledTableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell>{header}</StyledTableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {items.map((item, i) => (
            <StyledTableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(item).map((value) => (
                <StyledTableCell align="right">{value}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

function PostsTable({ posts }: { posts: IPost[] }) {
  return (
    <StyledTableContainer columWidth={250} columnsNum={4}>
      <Table stickyHeader aria-label="Table of posts">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Text</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {posts.map((post) => {
            const { id, username, email, text, createdAt } = post;

            return (
              <StyledTableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {username}
                </StyledTableCell>
                <StyledTableCell align="right">{email}</StyledTableCell>
                <StyledTableCell align="right">{text}</StyledTableCell>
                <StyledTableCell align="right" suppressHydrationWarning>
                  {new Date(createdAt).toLocaleString()}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default PostsTable;
