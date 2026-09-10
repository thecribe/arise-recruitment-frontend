import { useQuery } from "@tanstack/react-query";

import { complianceApi } from "../api/compliance.api";

export const complianceSectionDataKeys = {
  all: ["compliance-section-data"] as const,

  section: (applicationId: string, sectionId: string) =>
    [...complianceSectionDataKeys.all, applicationId, sectionId] as const,
};

export function useComplianceSectionData(
  applicationId: string,
  sectionId: string,
) {
  return useQuery({
    queryKey: complianceSectionDataKeys.section(applicationId, sectionId),

    queryFn: () => complianceApi.getComplianceSection(applicationId, sectionId),

    enabled: Boolean(applicationId && sectionId),
  });
}

export default useComplianceSectionData;
