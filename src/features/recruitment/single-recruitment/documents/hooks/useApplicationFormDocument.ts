import { useQuery } from "@tanstack/react-query";

import { getApplicationFormDocument } from "../api/documents.api";

export const useApplicationFormDocument = (
  applicationId: string | undefined,
) => {
  return useQuery({
    queryKey: ["application-form-document", applicationId],

    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      return getApplicationFormDocument(applicationId);
    },

    enabled: Boolean(applicationId),

    staleTime: 5 * 60 * 1000,
  });
};
