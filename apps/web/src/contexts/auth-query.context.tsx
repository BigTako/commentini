import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useContext } from "react";
import {
  IJwtResponce,
  ILoginDto,
  ISignupDto,
  IUserProfile,
} from "~/components/modules/auth/types";
import { AuthService } from "~/services/http/auth.service";

const AuthQueryContext = createContext({});

interface IAuthQueryContext {
  useLogout(options: { onSuccess?: () => void }): { logout: () => void };
  useUserProfile: () => {
    isLoading: boolean;
    data: IUserProfile;
    error: Error;
  };
  useLogin: (options: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }) => {
    login: (data: ILoginDto) => Promise<IJwtResponce>;
    isLoading: boolean;
  };
  useSingup: (options: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }) => {
    signup: (data: ISignupDto) => Promise<IJwtResponce>;
    isLoading: boolean;
  };
}

function AuthQueryProvider({ children }: { children: ReactNode }) {
  const authService = new AuthService();
  const queryClient = useQueryClient();

  const useLogout = useCallback(function ({ onSuccess }) {
    const logout = () =>
      authService.logout().then(() => {
        queryClient.setQueryData(["userProfile"], null), onSuccess?.();
      });
    return { logout };
  }, []) as IAuthQueryContext["useLogout"];

  const useUserProfile = useCallback(function () {
    const { isLoading, data, error } = useQuery({
      queryKey: ["userProfile"],
      queryFn: () => authService.getUserProfile(),
      retry: false,
    });

    return { isLoading, data, error };
  }, []);

  const useLogin = useCallback(function ({ onSuccess, onError }) {
    const { mutate: login, isPending: isLoading } = useMutation({
      mutationFn: (data: ILoginDto) => authService.login(data),
      onSuccess: () => {
        onSuccess?.();
      },
      onError,
    });

    return { login, isLoading };
  }, []) as IAuthQueryContext["useLogin"];

  const useSingup = useCallback(function ({ onSuccess, onError }) {
    const { mutate: signup, isPending: isLoading } = useMutation({
      mutationFn: (data: ISignupDto) => authService.signup(data),
      onSuccess: () => {
        onSuccess?.();
      },
      onError,
    });

    return { signup, isLoading };
  }, []) as IAuthQueryContext["useSingup"];

  return (
    <AuthQueryContext.Provider
      value={{ useLogin, useSingup, useUserProfile, useLogout }}
    >
      {children}
    </AuthQueryContext.Provider>
  );
}

function useAuthQuery(): IAuthQueryContext {
  const context = useContext(AuthQueryContext) as IAuthQueryContext;
  if (context === undefined)
    throw new Error("AuthQueryContext was used outside the AuthQueryProvider");
  return context;
}

export { AuthQueryProvider, useAuthQuery };
