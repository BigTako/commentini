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

const StyledTableContainer = styled(TableContainer)`
  & {
    background-color: var(--color-primary-100);
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
    border-radius: 8px;
    max-height: 500px;
    overflow-y: auto;
  }
`;

function PostsTable({ posts }: { posts: IPost[] }) {
  return (
    <StyledTableContainer>
      <Table stickyHeader aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Text</TableCell>
            <TableCell align="center">Created At</TableCell>
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
                <TableCell component="th" scope="row">
                  {username}
                </TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{text}</TableCell>
                <TableCell align="right" suppressHydrationWarning>
                  {new Date(createdAt).toLocaleString()}
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default PostsTable;
