import { useQuery } from "@tanstack/react-query";

import { applicantDeclarationsApi } from "../api/applicant-declarations.api";
import { applicantDeclarationKeys } from "../api/applicant-declarations.keys";

export const useApplicantDeclarations = () => {
  return useQuery({
    queryKey: applicantDeclarationKeys.definitions(),
    queryFn: applicantDeclarationsApi.getDeclarations,
  });
};
