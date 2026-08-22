import { useQuery } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

/**
 * -----------------------------------------------------------------------------
 * Get Recruitment applicant detail.
 * -----------------------------------------------------------------------------
 */
export function useRecruitmentApplicant(applicationId?: string) {
  return useQuery({
    queryKey: applicationId
      ? recruitmentKeys.applicant(applicationId)
      : recruitmentKeys.all,

    queryFn: () => recruitmentApi.getRecruitmentApplicant(applicationId!),

    enabled: Boolean(applicationId),
  });
}
