import { Post } from '@prisma/client';

export interface IPost extends Post {}

export interface IPostWithReplies extends Post {
  replies: IPostWithReplies[];
}

export type ICreatePostDto = Omit<IPost, 'id' | 'createdAt'>;

export interface ICreateReplyDto {
  postId: IPost['id'];
  reply: ICreatePostDto;
}

export type IUpdatePostDto = Partial<ICreatePostDto>;

export type IPostId = IPost['id'];

export interface IGetPostDto {
  id: IPostId;
}

export interface IGetAllPostsParams {
  page?: number;
  sortBy?: string;
  sort?: 'asc' | 'desc';
}

export interface IPostResponse<T> {
  data: T;
}
