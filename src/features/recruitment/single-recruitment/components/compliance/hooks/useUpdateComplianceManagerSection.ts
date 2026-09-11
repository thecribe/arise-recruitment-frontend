import { useMutation, useQueryClient } from "@tanstack/react-query";

import { complianceManagerApi } from "../api/compliance-manager.api";
import { complianceSectionDataKeys } from "./useComplianceSectionData";
import { notification } from "@/components/feedback/notification";

interface UseUpdateComplianceManagerSectionProps {
  applicationId: string;
  sectionId: string;
}

export function useUpdateComplianceManagerSection({
  applicationId,
  sectionId,
}: UseUpdateComplianceManagerSectionProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: unknown) =>
      complianceManagerApi.updateComplianceManagerSectionData(
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
    updateManagerSection: mutation.mutateAsync,

    isUpdatingManagerSection: mutation.isPending,

    updateManagerSectionError: mutation.error,
  };
}

export default useUpdateComplianceManagerSection;
