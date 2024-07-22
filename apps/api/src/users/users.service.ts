import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ICreateUserDto, IUser, IUserId } from './user';
import { AuthProvider } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: ICreateUserDto): Promise<IUser> {
    const user = await this.prismaService.user.create({ data });
    return user;
  }

  async findByEmailOrCreate({
    email,
    data,
  }: {
    email: string;
    data: ICreateUserDto;
  }) {
    const user = await this.prismaService.user.upsert({
      where: {
        email,
      },
      update: {},
      create: data,
    });
    return user;
  }

  async findOne(id: IUserId) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    return user;
  }

  async findOneLocalAuthed(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email, authProvider: AuthProvider.LOCAL },
    });
    if (!user) {
      throw new NotFoundException('No User Found');
    }
    return user;
  }
}
