import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { notification } from "@/components/feedback/notification";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

import type { RecruitmentApplicationStage } from "../types/recruitment.types";

interface UpdateRecruitmentApplicationStageParams {
  applicantId: string;
  stage: RecruitmentApplicationStage;
  reason?: string;
}

export function useUpdateRecruitmentApplicationStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicantId,
      stage,
      reason,
    }: UpdateRecruitmentApplicationStageParams) =>
      recruitmentApi.updateRecruitmentApplicationStage(applicantId, {
        stage,
        reason,
      }),

    onSuccess: async (_, variables) => {
      notification.success("Application stage updated successfully.");

      /**
       * Refresh the currently opened applicant.
       */

      await queryClient.invalidateQueries({
        queryKey: recruitmentKeys.applicant(variables.applicantId),
      });

      /**
       * Also refresh the applicant list because stage/status may
       * be displayed there or used for filtering later.
       */

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
          "Unable to update application stage. Please try again.",
      );
    },
  });
}
