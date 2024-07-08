export interface IPost {
  id: string;
  email: string;
  username: string;
  text: string;
  createdAt: string;
  replies: IPost[];
  [key: string | symbol]: string | Date;
}

export interface ICreatePostDto {
  username: string;
  email: string;
  text: string;
}

export type IPostId = IPost["id"];
