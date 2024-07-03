import { IPost } from "./post.d";
import { TableDashboard } from "../../_shared/components/table-dashboard";
import { StyledTableCell } from "../../_shared/components/table-dashboard/cell.component";
import { StyledTableRow } from "../../_shared/components/table-dashboard/row.component";

function PostsTable({ posts }: { posts: IPost[] }) {
  return (
    <TableDashboard
      headers={["Username", "Email", "Text", "Created At"]}
      items={posts}
      renderRow={(post) => {
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
      }}
    />
  );
}

export default PostsTable;
