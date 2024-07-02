import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Prisma } from '@prisma/client';
import { ICreatePostDto, IPost, IPostId, IUpdatePostDto } from './post';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(args: Prisma.PostFindManyArgs) {
    const posts = await this.prismaService.post.findMany(args);
    return posts;
  }

  async findOne(id: IPostId): Promise<IPost> {
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

  async create(data: ICreatePostDto): Promise<IPost> {
    const post = await this.prismaService.post.create({
      data,
    });
    return post;
  }

  async update(id: IPostId, data: IUpdatePostDto) {
    const post = await this.prismaService.post.update({
      where: {
        id,
      },
      data,
    });
    return post;
  }

  async createReply(id: IPostId, data: ICreatePostDto) {
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
