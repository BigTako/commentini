import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@keys";
import { ICreatePostDto, IPost } from "./types";
import { useSocket } from "~/contexts/socket.context";

const mutatePost = (socket: Socket, data: ICreatePostDto) => {
  return new Promise<IPost>((resolve, reject) => {
    socket.emit(
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
};

export function useCreatePost({ onSuccess }: { onSuccess?: () => void }) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: (data: ICreatePostDto) => mutatePost(socket, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      onSuccess?.();
    },
  });

  return { createPost, isCreating };
}
