/**
 * -----------------------------------------------------------------------------
 * File: useApplicantSection.ts
 *
 * Description:
 * Retrieves applicant values for a section.
 * -----------------------------------------------------------------------------
 */

import { useQuery } from "@tanstack/react-query";

import { applicationSectionApi } from "../api/application-section.api";

export function useApplicantSection(sectionId?: string) {
  return useQuery({
    queryKey: ["application", "section", sectionId],

    queryFn: () => applicationSectionApi.getApplicantSection(sectionId!),

    enabled: !!sectionId,
  });
}
