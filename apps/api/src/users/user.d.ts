import { User } from '@prisma/client';

export interface IUser extends User {}

export type IUserId = IUser['id'];

export type IUserEmail = IUser['email'];

export type ICreateUserDto = Omit<IUser, 'id' | 'createdAt'>;

export type IUserProfile = Omit<IUser, 'password'>;
