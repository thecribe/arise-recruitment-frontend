import { useQuery } from "@tanstack/react-query";
import { getComplianceSummaryDocument } from "../api/documents.api";

export const useComplianceSummaryDocument = (
  applicationId: string | undefined,
) => {
  return useQuery({
    queryKey: ["compliance-summary-document", applicationId],

    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      return getComplianceSummaryDocument(applicationId);
    },

    enabled: Boolean(applicationId),

    staleTime: 5 * 60 * 1000,
  });
};
