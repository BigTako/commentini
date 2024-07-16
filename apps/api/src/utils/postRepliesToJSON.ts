import { IPost, IPostWithReplies } from '../post/post.d';

export function postRepliesToJSON({
  post,
  rawData,
}: {
  post: IPost;
  rawData: IPost[];
}): IPostWithReplies[] {
  const children = rawData.filter((p) => p.parentId === post.id);
  const postReplies = [] as IPostWithReplies[];

  for (const p of children) {
    const replies = postRepliesToJSON({ post: p, rawData });
    postReplies.push({ ...p, replies });
  }

  return postReplies;
}
