export interface IPost {
  id: string;
  email: string;
  username: string;
  text: string;
  createdAt: string;
  [key: string | symbol]: string | Date;
}

export interface ICreatePostDto {
  username: string;
  email: string;
  text: string;
}
