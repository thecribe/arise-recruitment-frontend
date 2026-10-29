import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { notification } from "@/components/feedback/notification";

import { rolesApi } from "../api/roles.api";
import type { RoleFormValues } from "../schemas/role.schema";

export const roleKeys = {
  all: ["roles"] as const,
  lists: () => [...roleKeys.all, "list"] as const,
  details: () => [...roleKeys.all, "detail"] as const,
  detail: (id: string) => [...roleKeys.details(), id] as const,
  permissions: () => [...roleKeys.all, "permissions"] as const,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<{ message?: string }>;

  return axiosError.response?.data?.message || fallback;
};

export const useRoles = () =>
  useQuery({
    queryKey: roleKeys.lists(),
    queryFn: rolesApi.getAll,
  });

export const useRolePermissions = () =>
  useQuery({
    queryKey: roleKeys.permissions(),
    queryFn: rolesApi.getPermissions,
    staleTime: 5 * 60 * 1000,
  });

export const useRole = (id: string) =>
  useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => rolesApi.getById(id),
    enabled: Boolean(id),
  });

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: RoleFormValues) => rolesApi.create(values),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: roleKeys.all,
      });

      notification.success("Role created successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to create role. Please try again."),
      );
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: Pick<RoleFormValues, "name" | "description">;
    }) => rolesApi.update(id, values),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: roleKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: roleKeys.detail(variables.id),
      });

      notification.success("Role details updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to update role details. Please try again.",
        ),
      );
    },
  });
};

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      permissionIds,
    }: {
      id: string;
      permissionIds: string[];
    }) => rolesApi.updatePermissions(id, permissionIds),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: roleKeys.all,
      });

      void queryClient.invalidateQueries({
        queryKey: roleKeys.detail(variables.id),
      });

      notification.success("Role permissions updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to update role permissions. Please try again.",
        ),
      );
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rolesApi.remove(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: roleKeys.all,
      });

      notification.success("Role deleted successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to delete role. Please try again."),
      );
    },
  });
};
