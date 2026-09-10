import { useMutation, useQueryClient } from "@tanstack/react-query";

import { complianceApi } from "../api/compliance.api";
import { complianceSectionDataKeys } from "./useComplianceSectionData";
import { notification } from "@/components/feedback/notification";

interface UseUpdateComplianceSectionDataProps {
  applicationId: string;
  sectionId: string;
}

export function useUpdateComplianceSectionData({
  applicationId,
  sectionId,
}: UseUpdateComplianceSectionDataProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: unknown) =>
      complianceApi.updateComplianceSectionData(
        applicationId,
        sectionId,
        values,
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

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update application section status. Please try again.",
      );
    },
  });

  return {
    updateSection: mutation.mutateAsync,

    isUpdatingSection: mutation.isPending,

    updateSectionError: mutation.error,
  };
}

export default useUpdateComplianceSectionData;
