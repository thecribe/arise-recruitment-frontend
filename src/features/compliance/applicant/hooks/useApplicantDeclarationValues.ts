import { useQuery } from "@tanstack/react-query";

import { applicantDeclarationsApi } from "../api/applicant-declarations.api";
import { applicantDeclarationKeys } from "../api/applicant-declarations.keys";

export const useApplicantDeclarationValues = () => {
  return useQuery({
    queryKey: applicantDeclarationKeys.values(),
    queryFn: applicantDeclarationsApi.getDeclarationValues,
  });
};
