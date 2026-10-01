import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { applicationStatusApi } from "../api/application-status.api";
import { applicationStatusKeys } from "../api/application-status.keys";

import type { UpdateApplicationStatusPayload } from "../types/application-status.types";
import { notification } from "@/components/feedback/notification";

// Replace these imports with your project's existing notification
// and API error utilities if their paths differ.

export const useApplicationStatus = (applicantId: string) => {
  return useQuery({
    queryKey: applicationStatusKeys.detail(applicantId),
    queryFn: () => applicationStatusApi.getApplicationStatus(applicantId),
    enabled: Boolean(applicantId),
  });
};

export const useUpdateApplicationStatus = (applicantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateApplicationStatusPayload) =>
      applicationStatusApi.updateApplicationStatus(applicantId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: applicationStatusKeys.detail(applicantId),
      });

      notification.success("Application status updated successfully.");
    },

    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update application status.";

      notification.error(message);
    },
  });
};
