import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "@/features/recruitment/api/recruitment.api";
import { complianceSectionDataKeys } from "./useComplianceSectionData";
import { notification } from "@/components/feedback/notification";

export type ComplianceSectionReviewStatus =
  | "in_progress"
  | "approved"
  | "rejected";

interface UseComplianceSectionStatusProps {
  applicationId: string;
  sectionId: string;
}

interface UpdateComplianceSectionStatusPayload {
  status: ComplianceSectionReviewStatus;
  comment?: string;
}

export function useComplianceSectionStatus({
  applicationId,
  sectionId,
}: UseComplianceSectionStatusProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: UpdateComplianceSectionStatusPayload) =>
      recruitmentApi.updateApplicationSectionStatus(
        applicationId,
        sectionId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: complianceSectionDataKeys.section(applicationId, sectionId),
      });

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
      console.log(axiosError.response?.data?.message);
      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update application section status. Please try again.",
      );
    },
  });

  return {
    updateStatus: mutation.mutateAsync,

    isUpdatingStatus: mutation.isPending,

    updateStatusError: mutation.error,
  };
}

export default useComplianceSectionStatus;
