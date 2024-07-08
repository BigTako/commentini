import { useQuery } from "@tanstack/react-query";
import { SOCKET_EVENTS } from "@keys";
import { IPost, IPostId } from "./types";
import { useSocket } from "~/contexts/socket.context";
import { Socket } from "socket.io-client";

const fetchPost = (socket: Socket, id: IPostId) => {
  return new Promise<IPost>((resolve, reject) => {
    socket.emit(SOCKET_EVENTS.GET_POST, { id }, (response: { data: IPost }) => {
      if (response.data) {
        resolve(response.data);
      } else {
        reject(new Error("Failed to fetch post"));
      }
    });
  });
};

export function usePost({ id }: { id: IPostId }) {
  const { socket, isConnected } = useSocket();

  const { isLoading, data, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(socket, id),
    enabled: isConnected,
  });

  const post = data;

  return { isLoading, post, error };
}
