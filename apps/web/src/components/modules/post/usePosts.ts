import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@keys";
import { IPost } from "./types";

export function usePosts({
  socket,
  isConnected,
}: {
  socket: Socket;
  isConnected: boolean;
}) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const posts = queryClient.getQueryData<IPost[]>(["posts"]) || [];
  React.useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      socket.emit(
        SOCKET_EVENTS.GET_ALL_POSTS,
        {},
        (data: { data: IPost[] }) => {
          const { data: posts } = data;
          queryClient.setQueryData(["posts"], posts);
          setIsLoading(false);
        }
      );
    }
  }, [isConnected]);
  return { isLoading, posts };
}
