/**
 * -----------------------------------------------------------------------------
 * Retrieves the current applicant's application progress.
 * -----------------------------------------------------------------------------
 */

import { useQuery } from "@tanstack/react-query";

import { applicantApplicationKeys, getApplicantApplication } from "../api";

export function useApplicantApplication() {
  return useQuery({
    queryKey: applicantApplicationKeys.application(),

    queryFn: getApplicantApplication,
  });
}
