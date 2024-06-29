import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { TCreatePostDto, TPost, TUpdatePostDto } from './post';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(args: Prisma.PostFindManyArgs) {
    const posts = await this.prismaService.post.findMany(args);
    return posts;
  }

  async findOne(id: TPost['id']): Promise<TPost> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        replies: true,
      },
    });

    if (!post) {
      throw new NotFoundException('No Post Found');
    }

    return post;
  }

  async create(data: TCreatePostDto): Promise<TPost> {
    const post = await this.prismaService.post.create({
      data,
    });
    return post;
  }

  async update(id: TPost['id'], data: TUpdatePostDto) {
    const post = await this.prismaService.post.update({
      where: {
        id,
      },
      data,
    });
    return post;
  }

  async createReply(id: TPost['id'], data: TCreatePostDto) {
    const post = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        replies: {
          create: data,
        },
      },
      include: {
        replies: true,
      },
    });
    return post;
  }
}
