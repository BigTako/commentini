import { IUserEmail, IUserId } from 'src/users/user';

export interface IJwtPayload {
  email: IUserEmail;
  id: IUserId;
}

export interface ILocalLoginDto {
  email: IUserEmail;
  password: string;
}

export interface ILocalSignUpDto {
  email: IUserEmail;
  username: string;
  password: string;
}
