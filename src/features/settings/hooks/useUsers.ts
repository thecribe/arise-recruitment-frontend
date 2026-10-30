import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { notification } from "@/components/feedback/notification";

import { usersApi } from "../api/users.api";
import type {
  UserCreateValues,
  UserListParams,
  UserRoleValues,
  UserStatusValues,
  UserUpdateValues,
} from "../types/user.types";

export const userKeys = {
  all: ["settings-users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  list: (params: UserListParams = {}) => [...userKeys.lists(), params] as const,

  details: () => [...userKeys.all, "detail"] as const,

  detail: (id: string) => [...userKeys.details(), id] as const,

  roles: () => [...userKeys.all, "assignable-roles"] as const,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<{ message?: string }>;

  return axiosError.response?.data?.message || fallback;
};

export const useUsers = (params: UserListParams = {}) =>
  useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => usersApi.getAll(params),
  });

export const useUser = (id: string) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Boolean(id),
  });

export const useAssignableRoles = () =>
  useQuery({
    queryKey: userKeys.roles(),
    queryFn: usersApi.getAssignableRoles,
    staleTime: 5 * 60 * 1000,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: UserCreateValues) => usersApi.create(values),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      notification.success("User created successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to create user. Please try again."),
      );
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: UserUpdateValues }) =>
      usersApi.update(id, values),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });

      notification.success("User details updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to update user details. Please try again.",
        ),
      );
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: UserRoleValues }) =>
      usersApi.updateRole(id, values),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });

      notification.success("User role updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to update user role. Please try again."),
      );
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: UserStatusValues }) =>
      usersApi.updateStatus(id, values),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });

      notification.success("User status updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to update user status. Please try again.",
        ),
      );
    },
  });
};

export const useResetUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      usersApi.resetPassword(id, password),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });

      notification.success(
        "Password reset successfully. All existing sessions have been revoked.",
      );
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to reset the password. Please try again.",
        ),
      );
    },
  });
};
