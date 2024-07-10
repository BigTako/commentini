import { createContext, useCallback, useContext } from "react";
import { useSocket } from "./socket.context";
import { PostService } from "~/services/post.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICreatePostDto,
  ICreateReplyDto,
  IPost,
  IPostId,
} from "~/components/modules/post/types";

const PostQueryContext = createContext({});

interface IQueryResult<T> {
  isLoading: boolean;
  data: T;
  error: Error | null;
}

interface IPostQueryContext {
  usePosts: () => IQueryResult<IPost[]>;
  usePost: (id: IPostId) => IQueryResult<IPost>;
  useCreatePost: ({ onSuccess }: { onSuccess?: () => void }) => {
    createPost: (data: ICreatePostDto) => IPost;
    isCreating: boolean;
  };
  useCreateReply: ({
    postId,
    onSuccess,
  }: {
    postId: IPostId;
    onSuccess?: () => void;
  }) => {
    createReply: (data: ICreateReplyDto) => IPost;
    isCreating: boolean;
  };
}

function PostQueryProvider({ children }: { children: React.ReactNode }) {
  const { socket, isConnected } = useSocket();

  const postService = new PostService(socket);
  const queryClient = useQueryClient();

  const usePosts = useCallback(
    function () {
      const { isLoading, data, error } = useQuery({
        queryKey: ["posts"],
        queryFn: () => postService.getAll(),
        enabled: isConnected,
      });

      return { isLoading, data, error };
    },
    [isConnected]
  );

  const usePost = useCallback(
    function (id: IPostId) {
      const { isLoading, data, error } = useQuery({
        queryKey: ["post", id],
        queryFn: () => postService.getOne(id),
        enabled: isConnected,
      });

      return { isLoading, data, error };
    },
    [isConnected]
  );

  const useCreatePost = useCallback(
    function ({ onSuccess }: { onSuccess?: () => void }) {
      const { mutate: createPost, isPending: isCreating } = useMutation({
        mutationFn: (data: ICreatePostDto) => postService.create(data),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["posts"],
          });
          onSuccess?.();
        },
      });

      return { createPost, isCreating };
    },
    [isConnected]
  );

  const useCreateReply = useCallback(function ({
    postId,
    onSuccess,
  }: {
    postId: IPostId;
    onSuccess?: () => void;
  }) {
    const { mutate: createReply, isPending: isCreating } = useMutation({
      mutationFn: (data: ICreateReplyDto) => postService.createReply(data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
        onSuccess?.();
      },
    });
    return { createReply, isCreating };
  }, []);

  return (
    <PostQueryContext.Provider
      value={{
        usePosts,
        usePost,
        useCreatePost,
        useCreateReply,
      }}
    >
      {children}
    </PostQueryContext.Provider>
  );
}

function usePostQuery(): IPostQueryContext {
  const context = useContext(PostQueryContext) as IPostQueryContext;
  if (context === undefined)
    throw new Error("PostQueryContext was used outside the PostQueryProvider");
  return context;
}

export { PostQueryProvider, usePostQuery };