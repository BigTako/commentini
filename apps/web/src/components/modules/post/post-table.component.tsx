import {
  CustomTableColumn,
  CustomTableRow,
} from "~/components/containers/custom-table/types";
import { IPost } from "./types";
import { CustomTable } from "~/components/containers";
import { useRouter } from "next/navigation";

const columns: CustomTableColumn[] = [
  {
    id: 1,
    name: "Username",
    field: "username",
    textAlign: "center" as const,
    width: 200,
  },
  {
    id: 2,
    name: "Email",
    field: "email",
    textAlign: "center" as const,
    width: 200,
  },
  {
    id: 3,
    name: "Text",
    field: "text",
    width: 300,
  },
  {
    id: 4,
    name: "Created At",
    field: "createdAt",
    formatField: (value) => new Date(value as string).toLocaleString(),
    width: 200,
  },
];

function PostsTable({ posts }: { posts: IPost[] }) {
  const tableId = "posts-table";
  const router = useRouter();

  const handleRowClick = (row: CustomTableRow) => {
    const post = row as IPost;
    router.push(`posts/${post.id}`);
  };

  return (
    <CustomTable
      id={tableId}
      columns={columns}
      onRowClick={handleRowClick}
      rows={posts}
    />
  );
}

export default PostsTable;
