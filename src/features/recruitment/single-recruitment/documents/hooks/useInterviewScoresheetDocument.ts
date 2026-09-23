import { useQuery } from "@tanstack/react-query";

import { getInterviewScoresheetDocument } from "../api/documents.api";

export const useInterviewScoresheetDocument = (
  applicationId: string | undefined,
) => {
  return useQuery({
    queryKey: ["interview-scoresheet-document", applicationId],

    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      return getInterviewScoresheetDocument(applicationId);
    },

    enabled: Boolean(applicationId),

    staleTime: 5 * 60 * 1000,
  });
};
