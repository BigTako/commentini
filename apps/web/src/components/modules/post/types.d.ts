export interface IPost {
  id: string;
  email: string;
  username: string;
  text: string;
  createdAt: string;
  replies: IPost[];
  [key: string | symbol]: string | Date;
}

export type IPostId = IPost["id"];

export interface ICreatePostDto {
  username: string;
  email: string;
  text: string;
}

export interface ICreateReplyDto {
  postId: IPostId;
  reply: ICreatePostDto;
}
