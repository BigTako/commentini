import { IUserEmail, IUserId } from 'src/users/user';

export interface IJwtPayload {
  email: IUserEmail;
  sub: IUserId;
}
