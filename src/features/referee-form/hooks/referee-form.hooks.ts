import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { refereeFormApi } from "../api/referee-form.api";

import type { RefereeFormSubmission } from "../types/referee-form.types";
import { notification } from "@/components/feedback/notification";

/**
 * -----------------------------------------------------------------------------
 * Query Keys
 * -----------------------------------------------------------------------------
 */

export const refereeFormKeys = {
  all: ["referee-form"] as const,

  detail: (referenceId: string, token: string) =>
    [...refereeFormKeys.all, "detail", referenceId, token] as const,
};

/**
 * -----------------------------------------------------------------------------
 * Get referee form details
 * -----------------------------------------------------------------------------
 */
export const useRefereeForm = (
  referenceId: string,
  token: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: refereeFormKeys.detail(referenceId, token),

    queryFn: () => refereeFormApi.getReferenceDetails(referenceId, token),

    enabled: Boolean(referenceId && token) && enabled,

    retry: false,

    staleTime: 0,

    refetchOnWindowFocus: false,
  });
};

/**
 * -----------------------------------------------------------------------------
 * Submit referee form
 * -----------------------------------------------------------------------------
 */
export const useSubmitRefereeForm = (referenceId: string, token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RefereeFormSubmission) =>
      refereeFormApi.submitReference(referenceId, {
        ...payload,
        token,
      }),

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: refereeFormKeys.detail(referenceId, token),
      });

      notification.success("Reference Response saved successfully.");
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to submit reference response. Please try again.",
      );
    },
  });
};
