import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { RecruitmentApplicantFilters } from "../types/recruitment.types";
import { recruitmentKeys } from "../api/recruitment.keys";
import { recruitmentApi } from "../api/recruitment.api";

export function useRecruitmentApplicants(filters: RecruitmentApplicantFilters) {
  return useQuery({
    queryKey: recruitmentKeys.applicants(),
    queryFn: () => recruitmentApi.getRecruitmentApplicants(filters),
    placeholderData: keepPreviousData,
  });
}
