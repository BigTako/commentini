import { Post } from '@prisma/client';

export interface IPost extends Post {}

export type IPostId = IPost['id'];

export interface IPostWithReplies extends Post {
  replies: IPostWithReplies[];
}

export type ICreatePostDto = Pick<IPost, 'text'>;

export interface ICreateReplyDto extends ICreatePostDto {
  parentId: IPostId;
}

export type IUpdatePostDto = Partial<ICreatePostDto>;

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
