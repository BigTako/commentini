import { useQuery } from "@tanstack/react-query";
import { SOCKET_EVENTS } from "@keys";
import { IPost } from "./types";
import { useSocket } from "~/contexts/socket.context";
import { Socket } from "socket.io-client";

const fetchPosts = (socket: Socket) => {
  return new Promise<IPost[]>((resolve, reject) => {
    socket.emit(
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
};

export function usePosts() {
  const { socket, isConnected } = useSocket();

  const { isLoading, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(socket),
    enabled: isConnected,
  });

  const posts = data || [];

  return { isLoading, posts, error };
}
