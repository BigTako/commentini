import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@keys";
import { ICreatePostDto, IPost } from "./types";

export function useCreatePost({
  socket,
  isConnected,
}: {
  socket: Socket;
  isConnected: boolean;
}) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  function createPost(postData: ICreatePostDto) {
    if (isConnected) {
      setIsLoading(true);
      socket.emit(
        SOCKET_EVENTS.CREATE_POST,
        { data: postData },
        (data: { data: IPost }) => {
          const { data: post } = data;
          console.log({ post });
          const posts = queryClient.getQueryData<IPost[]>(["posts"]) || [];
          queryClient.setQueryData(["posts"], [...posts, post]);
          setIsLoading(false);
        }
      );
    }
  }
  return { isLoading, createPost };
}
