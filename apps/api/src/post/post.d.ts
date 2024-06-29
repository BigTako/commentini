import { Post } from '@prisma/client';

export interface TPost extends Post {}

export type TCreatePostDto = Omit<TPost, 'id' | 'createdAt'>;

export interface TCreateReplyDto {
  postId: TPost['id'];
  reply: TCreatePostDto;
}

export type TUpdatePostDto = Partial<TCreatePostDto>;

export type TFindPostDto = Pick<TPost, 'id'>;

export interface TGetAllPostsParams {
  page?: number;
  sortBy?: string;
  sort?: 'asc' | 'desc';
}
