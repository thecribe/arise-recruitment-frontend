import { useQuery } from "@tanstack/react-query";
import { declarationKeys } from "../../compliance/api/declarations.keys";
import { declarationsApi } from "../../compliance/api/declarations.api";

export const useApplicantDeclarationValues = (applicationId?: string) => {
  return useQuery({
    queryKey: applicationId
      ? declarationKeys.values(applicationId)
      : declarationKeys.all,

    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      return declarationsApi.getDeclarationValues(applicationId);
    },

    enabled: Boolean(applicationId),
  });
};
