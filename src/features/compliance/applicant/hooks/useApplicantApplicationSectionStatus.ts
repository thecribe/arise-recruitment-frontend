import { useQuery } from "@tanstack/react-query";
import { applicantApplicationSectionKeys } from "../api/applicant-declarations.keys";
import { applicantDeclarationsApi } from "../api/applicant-declarations.api";

export const useApplicantApplicationSectionStatus = (sectionId: string) => {
  return useQuery({
    queryKey: applicantApplicationSectionKeys.status(sectionId),
    queryFn: () => applicantDeclarationsApi.getSectionStatus(sectionId),
    enabled: !!sectionId,
  });
};
