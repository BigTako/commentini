import { Socket } from "socket.io-client";
import {
  ICreatePostDto,
  ICreateReplyDto,
  IPost,
  IPostId,
} from "~/components/modules/post/types";
import { SOCKET_EVENTS } from "~/keys";

export class PostService {
  constructor(private socket: Socket) {}

  getAll() {
    return new Promise<IPost[]>((resolve, reject) => {
      this.socket.emit(
        SOCKET_EVENTS.GET_ALL_POSTS,
        {},
        (response: { data: IPost[] }) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to fetch posts"));
          }
        }
      );
    });
  }

  getOne(id: IPostId) {
    return new Promise<IPost>((resolve, reject) => {
      this.socket.emit(
        SOCKET_EVENTS.GET_POST,
        { id },
        (response: { data: IPost }) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to fetch post"));
          }
        }
      );
    });
  }

  create(data: ICreatePostDto) {
    return new Promise<IPost>((resolve, reject) => {
      this.socket.emit(
        SOCKET_EVENTS.CREATE_POST,
        data,
        (response: { data: IPost }) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to create post"));
          }
        }
      );
    });
  }

  createReply(data: ICreateReplyDto) {
    return new Promise<IPost>((resolve, reject) => {
      this.socket.emit(
        SOCKET_EVENTS.CREATE_REPLY,
        data,
        (response: { data: IPost }) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(new Error("Failed to create reply"));
          }
        }
      );
    });
  }
}
