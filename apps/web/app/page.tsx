"use client";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostsContainer = styled.div`
  width: 900px;
`;

const posts = [
  {
    id: "cc29443f-c5da-49a3-9a55-c8d721aad373",
    email: "3@gmail.com",
    username: "alex",
    text: "You can ",
    createdAt: "2024-07-01T06:32:31.220Z",
  },
  {
    id: "4d2ddf88-584a-4efb-9ff2-a5e53990d77c",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:22.633Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
];

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

interface IPost {
  id: string;
  email: string;
  username: string;
  text: string;
  createdAt: string;
}

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

export default function Page(): JSX.Element {
  return (
    <StyledMainContainer>
      <PostsContainer>
        <PostsTable posts={posts} />
      </PostsContainer>
    </StyledMainContainer>
  );
}
