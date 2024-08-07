import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Prisma } from '@prisma/client';
import {
  ICreatePostDto,
  IPost,
  IPostId,
  IPostWithReplies,
  IUpdatePostDto,
} from './post';
import { postRepliesToJSON } from '../utils/postRepliesToJSON';
import { IUserId } from 'src/users/user';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(args: Prisma.PostFindManyArgs) {
    const posts = await this.prismaService.post.findMany(args);
    return posts;
  }

  async findOne(id: IPostId): Promise<IPostWithReplies> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('No Post Found');
    }

    const data = (await this.prismaService.$queryRaw`
      WITH RECURSIVE replies_cte AS (
        SELECT id, email, username, text, "createdAt", "parentId"
        FROM post
        WHERE "parentId" = ${post.id}
  
        UNION ALL
  
        SELECT p.id, p.email, p.username, p.text, p."createdAt", p."parentId"
        FROM post p
        INNER JOIN replies_cte r ON p."parentId" = r.id
      )
      SELECT * FROM replies_cte ORDER BY "createdAt" DESC;
    `) as IPost[];

    const postReplies = postRepliesToJSON({ post, rawData: data });
    const postWithReplies = {
      ...post,
      replies: postReplies,
    };
    return postWithReplies;
  }

  async create({
    userId,
    data,
  }: {
    userId: string;
    data: ICreatePostDto;
  }): Promise<IPost> {
    const post = await this.prismaService.post.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return post;
  }

  async update({ id, data }: { id: IPostId; data: IUpdatePostDto }) {
    const post = await this.prismaService.post.update({
      where: {
        id,
      },
      data,
    });
    return post;
  }

  async createReply({
    parentId,
    userId,
    data,
  }: {
    parentId: IPostId;
    userId: IUserId;
    data: ICreatePostDto;
  }) {
    const post = await this.prismaService.post.create({
      data: {
        ...data,
        parent: {
          connect: {
            id: parentId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return post;
  }
}
