import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { notification } from "@/components/feedback/notification";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";
import type { RecruitmentApplicantStatus } from "../types/recruitment.types";

interface UpdateRecruitmentApplicationStatusParams {
  applicantId: string;
  status: RecruitmentApplicantStatus;
  reason?: string;
}

export function useUpdateRecruitmentApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicantId,
      status,
      reason,
    }: UpdateRecruitmentApplicationStatusParams) =>
      recruitmentApi.updateRecruitmentApplicationStatus(applicantId, {
        status,
        reason,
      }),

    onSuccess: async (_, variables) => {
      notification.success("Application status updated successfully.");

      await queryClient.invalidateQueries({
        queryKey: recruitmentKeys.applicant(variables.applicantId),
      });

      await queryClient.invalidateQueries({
        queryKey: recruitmentKeys.applicants(),
      });
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string;
      }>;

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update application status. Please try again.",
      );
    },
  });
}
