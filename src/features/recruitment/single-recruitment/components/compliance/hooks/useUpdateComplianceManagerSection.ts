import { useMutation, useQueryClient } from "@tanstack/react-query";

import { complianceManagerApi } from "../api/compliance-manager.api";
import { complianceSectionDataKeys } from "./useComplianceSectionData";

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
    },
  });

  return {
    updateManagerSection: mutation.mutateAsync,

    isUpdatingManagerSection: mutation.isPending,

    updateManagerSectionError: mutation.error,
  };
}

export default useUpdateComplianceManagerSection;
