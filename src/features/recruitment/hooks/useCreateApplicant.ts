import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

import type { AddApplicantPayload } from "../types/add-applicant.types";

export const useCreateApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddApplicantPayload) =>
      recruitmentApi.createApplicant(values),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: recruitmentKeys.applicants(),
      });

      notification.success(
        "Applicant created successfully. A verification email has been sent.",
      );
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
        axiosError.response?.data?.message ??
          "Unable to create applicant. Please try again.",
      );
    },
  });
};
