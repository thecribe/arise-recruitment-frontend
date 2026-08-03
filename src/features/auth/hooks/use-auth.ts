import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export function useCurrentUser() {
  return useQuery<AuthUser, Error>({
    queryKey: authKeys.user(),

    queryFn: () => authApi.getCurrentUser() as Promise<AuthUser>,

    retry: false,

    staleTime: 1000 * 60 * 5,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),

    onSuccess: async () => {
      await queryClient.fetchQuery({
        queryKey: authKeys.user(),
        queryFn: authApi.getCurrentUser,
      });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: authKeys.user(),
      });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: authApi.verifyEmail,
  });
}
