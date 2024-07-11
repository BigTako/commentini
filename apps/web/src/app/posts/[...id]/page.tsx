"use client";
import { Collapse, List, ListItem } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import PostCard from "~/components/modules/post/card";
import { IPost } from "~/components/modules/post/types";
import { usePostQuery } from "~/contexts/post-query.context";

function FullPostCard({ post }: { post: IPost }) {
  const [expanded, setExpanded] = useState(false);
  const withReplies = !!post.replies;

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItem sx={{ padding: 0 }}>
        <PostCard post={post} expanded={expanded} setExpanded={setExpanded} />
      </ListItem>

      {withReplies && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {post.replies.map((reply) => (
              <div style={{ marginLeft: "20px" }} key={`post-reply-${post.id}`}>
                <ListItem sx={{ padding: 0 }}>
                  <FullPostCard post={reply} />
                </ListItem>
              </div>
            ))}
          </List>
        </Collapse>
      )}
    </List>
  );
}

export default function PostPage() {
  const params = useParams<{ id: string[] }>();

  const id = params.id[0] as string;

  const postQuery = usePostQuery();
  const { isLoading, data: post } = postQuery.usePost(id);
  const isPostFound = !isLoading && post;

  if (!post) {
    return <div style={{ textAlign: "center" }}>Post not found</div>;
  }

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  return isPostFound && <FullPostCard post={post} />;
}
