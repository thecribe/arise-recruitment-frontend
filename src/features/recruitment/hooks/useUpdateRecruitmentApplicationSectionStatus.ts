/**
 * -----------------------------------------------------------------------------
 * File: useUpdateRecruitmentApplicationSectionStatus.ts
 *
 * Description:
 *
 * Updates the review status of a Recruitment application section.
 *
 * Supported manager actions:
 *
 * - Approve section
 * - Reject section
 * - Move section back to in_progress
 *
 * After a successful update, the relevant applicant and section queries are
 * invalidated so the UI receives the latest server state.
 * -----------------------------------------------------------------------------
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

interface UpdateRecruitmentApplicationSectionStatusParams {
  applicationId: string;

  sectionId: string;

  status: "in_progress" | "approved" | "rejected";

  comment?: string;
}

export function useUpdateRecruitmentApplicationSectionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      sectionId,
      status,
      comment,
    }: UpdateRecruitmentApplicationSectionStatusParams) =>
      recruitmentApi.updateApplicationSectionStatus(applicationId, sectionId, {
        status,
        comment,
      }),

    onSuccess: async (_, variables) => {
      /**
       * -----------------------------------------------------------------------
       * Refresh applicant details.
       *
       * This updates:
       *
       * - Phase status
       * - Section summaries
       * - Selected section status
       * -----------------------------------------------------------------------
       */

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: recruitmentKeys.applicant(variables.applicationId),
        }),

        queryClient.invalidateQueries({
          queryKey: recruitmentKeys.applicantSection(
            variables.applicationId,
            variables.sectionId,
          ),
        }),
      ]);

      notification.success("Application section status updated successfully.");
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
          "Unable to update application section status. Please try again.",
      );
    },
  });
}
