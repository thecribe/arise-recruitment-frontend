import { useQuery } from "@tanstack/react-query";

import { getApplicationFormSections } from "../api/documents.api";

export const useApplicationFormSections = (phaseId: string | undefined) => {
  return useQuery({
    queryKey: ["application-form-sections", phaseId],

    queryFn: () => {
      if (!phaseId) {
        throw new Error("Phase ID is required.");
      }

      return getApplicationFormSections(phaseId);
    },

    enabled: Boolean(phaseId),

    staleTime: 10 * 60 * 1000,
  });
};
