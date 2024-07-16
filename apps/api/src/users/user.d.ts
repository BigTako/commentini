import { User } from '@prisma/client';

export interface IUser extends User {}

export type ICreateUserDto = Omit<IUser, 'id' | 'createdAt'>;
