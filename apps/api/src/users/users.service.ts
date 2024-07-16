import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { ICreateUserDto, IUser, IUserId } from './user';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: ICreateUserDto): Promise<IUser> {
    const user = await this.prismaService.user.create({ data });
    return user;
  }

  async findOne(id: IUserId) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    // if (!user) {
    //   throw new NotFoundException('No User Found');
    // }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    // if (!user) {
    //   throw new NotFoundException('No User Found');
    // }
    return user;
  }
}
