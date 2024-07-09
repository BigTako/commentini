import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@keys";
import { ICreateReplyDto, IPost, IPostId } from "./types";
import { useSocket } from "~/contexts/socket.context";

const mutatePost = (socket: Socket, data: ICreateReplyDto) => {
  return new Promise<IPost>((resolve, reject) => {
    socket.emit(
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
};

export function useCreateReply({
  postId,
  onSuccess,
}: {
  postId: IPostId;
  onSuccess?: () => void;
}) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { mutate: createReply, isPending: isCreating } = useMutation({
    mutationFn: (data: ICreateReplyDto) => mutatePost(socket, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [["posts"], ["post", postId]],
      });
      onSuccess?.();
    },
  });

  return { createReply, isCreating };
}
