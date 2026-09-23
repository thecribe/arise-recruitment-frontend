import { useQuery } from "@tanstack/react-query";

import { getApplicantDocuments } from "../api/documents.api";

export const useApplicantDocuments = (applicationId: string | undefined) => {
  return useQuery({
    queryKey: ["applicant-documents", applicationId],

    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      return getApplicantDocuments(applicationId);
    },

    enabled: Boolean(applicationId),

    staleTime: 5 * 60 * 1000,
  });
};
