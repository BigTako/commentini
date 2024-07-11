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
import { GlobalExceptionFilter } from 'src/filters/global-exception.filter';
import { createPostSchema } from 'src/lib/validation-schemas/post';
import { ZodPipe } from 'src/pipes/validation.pipe';
import { PostService } from './post.service';
import { CheckBodyInterceptor } from 'src/interceptors/check-body.interceptor';
import { WsExceptionInterceptor } from 'src/interceptors/ws-exception.interceptor';
import { WS_POST_EVENTS } from 'src/config/keys/ws-events';
import {
  ICreatePostDto,
  ICreateReplyDto,
  IGetAllPostsParams,
  IGetPostDto,
  IPost,
  IPostResponse,
} from './post';

@WebSocketGateway({ cors: { origin: '*' } })
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

    return { message: 'success' };
  }

  handleDisconnect(client: any) {
    console.log(`Client (${client.id}) connected`);

    return { message: 'success' };
  }

  @UseInterceptors(CheckBodyInterceptor)
  @SubscribeMessage(WS_POST_EVENTS.CREATE_POST)
  async handleCreatePost(
    @MessageBody(new ZodPipe(createPostSchema, 'ws')) body: ICreatePostDto,
  ): Promise<IPostResponse<IPost>> {
    const post = await this.postService.create(body);
    return { data: post };
  }

  @UseInterceptors(CheckBodyInterceptor)
  @SubscribeMessage(WS_POST_EVENTS.CREATE_REPLY)
  async handleCreateReply(
    @MessageBody() body: ICreateReplyDto,
  ): Promise<IPostResponse<IPost>> {
    const { postId, reply } = body;
    const post = await this.postService.createReply(postId, reply);
    return { data: post };
  }

  @SubscribeMessage(WS_POST_EVENTS.GET_ALL_POSTS)
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
    @MessageBody() body: IGetPostDto,
  ): Promise<IPostResponse<IPost>> {
    const { id } = body;
    const post = await this.postService.findOne(id);
    return { data: post };
  }
}
