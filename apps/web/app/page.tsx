"use client";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostsContainer = styled.div`
  width: 800px;
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
];

function PostsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Text</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.username}
              </TableCell>
              <TableCell align="right">{post.email}</TableCell>
              <TableCell align="right">{post.text}</TableCell>
              <TableCell align="right">
                {new Date(post.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Page(): JSX.Element {
  // const { data } = useQuery({
  //   queryKey: ["get-hello"],
  //   queryFn: () => getHello(),
  // });

  return (
    <StyledMainContainer>
      <PostsContainer>
        <Button variant="contained">
          <PostsTable />
        </Button>
      </PostsContainer>
    </StyledMainContainer>
  );
}
