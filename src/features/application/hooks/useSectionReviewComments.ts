/**
 * -----------------------------------------------------------------------------
 * File: useSectionReviewComments.ts
 *
 * Description:
 * Fetches Recruitment Manager review comments for an applicant application
 * section.
 *
 * The authenticated applicant is resolved by the backend.
 * -----------------------------------------------------------------------------
 */

import { useQuery } from "@tanstack/react-query";
import { applicantApi, applicationReviewKeys } from "../api";

export function useSectionReviewComments(sectionId?: string) {
  return useQuery({
    queryKey: sectionId
      ? applicationReviewKeys.sectionComments(sectionId)
      : applicationReviewKeys.all,

    queryFn: () => applicantApi.getSectionReviewComments(sectionId!),

    enabled: Boolean(sectionId),
  });
}
