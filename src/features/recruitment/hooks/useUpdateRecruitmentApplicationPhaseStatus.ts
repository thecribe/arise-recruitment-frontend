import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { notification } from "@/components/feedback/notification";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

import type { RecruitmentApplicationPhaseStatus } from "../types/recruitment.types";

interface UpdateRecruitmentApplicationPhaseStatusParams {
  applicationId: string;
  phaseId: string;
  status: RecruitmentApplicationPhaseStatus;
}

export function useUpdateRecruitmentApplicationPhaseStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      phaseId,
      status,
    }: UpdateRecruitmentApplicationPhaseStatusParams) =>
      recruitmentApi.updateApplicationPhaseStatus(applicationId, phaseId, {
        status,
      }),

    onSuccess: async (_, variables) => {
      /**
       * Refresh the main applicant data.
       *
       * This is important because:
       *
       * - phases come from the applicant query
       * - phase statuses come from the applicant query
       * - section summaries inside phases come from the applicant query
       */
      await queryClient.invalidateQueries({
        queryKey: recruitmentKeys.applicant(variables.applicationId),
      });

      await queryClient.refetchQueries({
        queryKey: recruitmentKeys.applicant(variables.applicationId),
      });

      /**
       * Refresh section details as well.
       *
       * This ensures that if the backend changed section statuses
       * as part of the phase action, cached section details are refreshed.
       */
      await queryClient.invalidateQueries({
        queryKey: [
          ...recruitmentKeys.all,
          "applicant-section",
          variables.applicationId,
        ],
      });

      await queryClient.refetchQueries({
        queryKey: [
          ...recruitmentKeys.all,
          "applicant-section",
          variables.applicationId,
        ],
      });

      const messages: Partial<
        Record<RecruitmentApplicationPhaseStatus, string>
      > = {
        locked: "Application phase locked successfully.",

        in_progress: "Application phase updated successfully.",

        approved: "Application phase approved successfully.",
      };

      notification.success(
        messages[variables.status] ?? "Application phase updated successfully.",
      );
    },

    onError: (
      error: AxiosError<{
        message?: string;
      }>,
    ) => {
      notification.error(
        error.response?.data?.message ||
          "Unable to update application phase. Please try again.",
      );
    },
  });
}
