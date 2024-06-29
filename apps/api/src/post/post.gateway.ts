import { UseFilters, UseInterceptors } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WS_SERVER_EVENTS, WS_CLIENT_EVENTS } from 'src/config/keys/ws-events';
import { GlobalExceptionFilter } from 'src/filters/global-exception.filter';
import { createPostSchema } from 'src/lib/validation-schemas/post';
import { ZodPipe } from 'src/pipes/validation.pipe';
import { PostService } from './post.service';
import {
  TCreatePostDto,
  TCreateReplyDto,
  TFindPostDto,
  TGetAllPostsParams,
} from './post';
import { CheckBodyInterceptor } from 'src/interceptors/check-body.interceptor';
import { WsExceptionInterceptor } from 'src/interceptors/ws-exception.interceptor';

@WebSocketGateway()
@UseInterceptors(WsExceptionInterceptor)
@UseFilters(new GlobalExceptionFilter())
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

    client.emit(WS_CLIENT_EVENTS.USER_CONNECTED, {
      message: 'success',
    });
  }

  handleDisconnect(client: any) {
    console.log(`Client (${client.id}) connected`);

    client.emit(WS_CLIENT_EVENTS.USER_DISCONNECTED, {
      message: 'success',
    });
  }

  @UseInterceptors(CheckBodyInterceptor)
  @SubscribeMessage(WS_SERVER_EVENTS.CREATE_POST)
  async handleCreatePost(
    @MessageBody(new ZodPipe(createPostSchema, 'ws')) body: TCreatePostDto,
  ): Promise<void> {
    const post = await this.postService.create(body);
    this.server.emit(WS_CLIENT_EVENTS.POST_CREATED, post);
  }

  @UseInterceptors(CheckBodyInterceptor)
  @SubscribeMessage(WS_SERVER_EVENTS.CREATE_REPLY)
  async handleCreateReply(@MessageBody() body: TCreateReplyDto): Promise<void> {
    const { postId, reply } = body;
    const post = await this.postService.createReply(postId, reply);
    this.server.emit(WS_CLIENT_EVENTS.REPLY_CREATED, post);
  }

  @SubscribeMessage(WS_SERVER_EVENTS.GET_ALL_POSTS)
  async handleGetAllPosts(
    @MessageBody() body: TGetAllPostsParams,
  ): Promise<void> {
    const { page = 1, sortBy = 'createdAt', sort = 'desc' } = body;

    const take = 5;
    const skip = (page - 1) * take;

    const posts = await this.postService.findAll({
      where: {
        replies: {
          none: {},
        },
      },
      orderBy: {
        [sortBy]: sort,
      },
      take,
      skip,
    });
    this.server.emit(WS_CLIENT_EVENTS.RECEIVE_ALL_POSTS, posts);
  }

  @SubscribeMessage(WS_SERVER_EVENTS.GET_POST)
  async handleGetPost(@MessageBody() body: TFindPostDto): Promise<void> {
    const { id } = body;
    const post = await this.postService.findOne(id);
    this.server.emit(WS_CLIENT_EVENTS.RECEIVE_POST, post);
  }
}
