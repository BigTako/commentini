import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ICreateUserDto, IUser } from './user';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: ICreateUserDto): Promise<IUser> {
    const user = await this.prismaService.user.create({ data });
    return user;
  }
}
