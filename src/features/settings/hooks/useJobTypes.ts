import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { notification } from "@/components/feedback/notification";

import { jobTypesApi } from "../api/job-types.api";
import type { JobTypeFormValues } from "../schemas/job-type.schema";

export const jobTypeKeys = {
  all: ["job-types"] as const,
  lists: () => [...jobTypeKeys.all, "list"] as const,
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<{ message?: string }>;

  return axiosError.response?.data?.message || fallback;
};

export const useJobTypes = () =>
  useQuery({
    queryKey: jobTypeKeys.lists(),
    queryFn: jobTypesApi.getAll,
  });

export const useCreateJobType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: JobTypeFormValues) => jobTypesApi.create(values),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: jobTypeKeys.all,
      });

      notification.success("Job type created successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to create job type. Please try again."),
      );
    },
  });
};

export const useUpdateJobType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: JobTypeFormValues }) =>
      jobTypesApi.update(id, values),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: jobTypeKeys.all,
      });

      notification.success("Job type updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to update job type. Please try again."),
      );
    },
  });
};

export const useSetDefaultJobType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobTypesApi.setDefault(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: jobTypeKeys.all,
      });

      notification.success("Default job type updated successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to set the default job type. Please try again.",
        ),
      );
    },
  });
};

export const useDeleteJobType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobTypesApi.remove(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: jobTypeKeys.all,
      });

      notification.success("Job type deleted successfully.");
    },

    onError: (error) => {
      notification.error(
        getErrorMessage(error, "Unable to delete job type. Please try again."),
      );
    },
  });
};
