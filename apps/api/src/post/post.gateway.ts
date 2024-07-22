import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createPostSchema } from 'src/lib/validation-schemas/post';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { PostService } from './post.service';
import { CheckBodyInterceptor } from 'src/interceptors/check-body.interceptor';
import { WS_POST_EVENTS } from 'src/config/keys/ws-events';
import {
  ICreatePostDto,
  ICreateReplyDto,
  IGetAllPostsParams,
  IGetPostDto,
  IPost,
  IPostResponse,
} from './post';
import { HtmlPipe } from 'src/pipes/html.pipe';
import { JwtSocketGuard } from 'src/auth/guards/jwt-socket.guard';
import { WsExceptionFilter } from 'src/filters/ws-exception.filter';

interface IUserPayload {
  id: string;
  email: string;
}

type IAuthedSocket = Socket & { user: IUserPayload };

@WebSocketGateway({ cors: { origin: '*' } })
@UseFilters(new WsExceptionFilter())
export class PostGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private postService: PostService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Initialized websocket');
  }

  handleConnection(client: Socket) {
    console.log(`Client (${client.id}) connected`);

    return { message: 'success' };
  }

  handleDisconnect(client: any) {
    console.log(`Client (${client.id}) connected`);

    return { message: 'success' };
  }

  @SubscribeMessage(WS_POST_EVENTS.CREATE_POST)
  @UseGuards(JwtSocketGuard)
  @UseInterceptors(CheckBodyInterceptor)
  async handleCreatePost(
    @MessageBody(
      new ZodPipe(createPostSchema, 'ws'),
      new HtmlPipe(['text'], 'ws'),
    )
    body: ICreatePostDto,
    @ConnectedSocket() client: IAuthedSocket,
  ): Promise<IPostResponse<IPost>> {
    const currentUserId = client.user.id;

    const post = await this.postService.create({
      userId: currentUserId,
      data: body,
    });
    return { data: post };
  }

  @UseInterceptors(CheckBodyInterceptor)
  @UseGuards(JwtSocketGuard)
  @SubscribeMessage(WS_POST_EVENTS.CREATE_REPLY)
  async handleCreateReply(
    @MessageBody(
      new ZodPipe(createPostSchema, 'ws'),
      new HtmlPipe(['text'], 'ws'),
    )
    body: ICreateReplyDto,
    @ConnectedSocket() client: IAuthedSocket,
  ): Promise<IPostResponse<IPost>> {
    const { parentId, ...reply } = body;
    const currentUserId = client.user.id;

    const post = await this.postService.createReply({
      parentId,
      userId: currentUserId,
      data: reply,
    });
    return { data: post };
  }

  @SubscribeMessage(WS_POST_EVENTS.GET_ALL_POSTS)
  @UseGuards(JwtSocketGuard)
  async handleGetAllPosts(
    @MessageBody() body: IGetAllPostsParams,
  ): Promise<IPostResponse<IPost[]>> {
    const { page = 1, sortBy = 'createdAt', sort = 'desc' } = body;
    const take = 25;
    const skip = (page - 1) * take;

    const posts = await this.postService.findAll({
      where: {
        parentId: null,
      },
      orderBy: {
        [sortBy]: sort,
      },
      take,
      skip,
    });
    return { data: posts };
  }

  @SubscribeMessage(WS_POST_EVENTS.GET_POST)
  async handleGetPost(
    @MessageBody()
    body: IGetPostDto,
  ): Promise<IPostResponse<IPost>> {
    const { id } = body;
    const post = await this.postService.findOne(id);
    return { data: post };
  }
}
