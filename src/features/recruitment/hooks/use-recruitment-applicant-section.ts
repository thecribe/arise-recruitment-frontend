import { useQuery } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";
import { recruitmentKeys } from "../api/recruitment.keys";

/**
 * -----------------------------------------------------------------------------
 * Get selected applicant application section.
 * -----------------------------------------------------------------------------
 *
 * The request is only enabled when both:
 *
 * - applicationId
 * - sectionId
 *
 * are available.
 *
 * This means opening the applicant page does NOT immediately fetch section
 * fields and values.
 */
export function useRecruitmentApplicantSection(
  applicationId?: string,
  sectionId?: string | null,
) {
  return useQuery({
    queryKey:
      applicationId && sectionId
        ? recruitmentKeys.applicantSection(applicationId, sectionId)
        : recruitmentKeys.all,

    queryFn: () =>
      recruitmentApi.getRecruitmentApplicantSection(applicationId!, sectionId!),

    enabled: Boolean(applicationId) && Boolean(sectionId),
  });
}
