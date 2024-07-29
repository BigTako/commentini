import { Socket } from "socket.io-client";
import {
  ICreatePostDto,
  ICreateReplyDto,
  IPost,
  IPostId,
} from "~/components/modules/post/types";
import { SOCKET_EVENTS } from "~/keys";

interface IWsAckResponce<T> {
  data: T;
}

export class PostService {
  constructor(private socket: Socket) {}

  async getAll(): Promise<IPost[]> {
    const responce = (await this.socket.emitWithAck(
      SOCKET_EVENTS.GET_ALL_POSTS,
      {}
    )) as IWsAckResponce<IPost[]>;
    return responce.data;
  }

  async getOne(id: IPostId): Promise<IPost> {
    const responce = (await this.socket.emitWithAck(SOCKET_EVENTS.GET_POST, {
      id,
    })) as IWsAckResponce<IPost>;
    return responce.data;
  }

  async create(data: ICreatePostDto): Promise<IPost> {
    const responce = (await this.socket
      .timeout(1000)
      .emitWithAck(SOCKET_EVENTS.CREATE_POST, data)) as IWsAckResponce<IPost>;
    return responce.data;
  }

  async createReply(data: ICreateReplyDto): Promise<IPost> {
    const responce = (await this.socket
      .timeout(1000)
      .emitWithAck(SOCKET_EVENTS.CREATE_REPLY, data)) as IWsAckResponce<IPost>;
    return responce.data;
  }
}
