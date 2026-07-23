/**
 * -----------------------------------------------------------------------------
 * File: useSubmitSection.ts
 *
 * Description:
 * React Query mutation for submitting an application section.
 * -----------------------------------------------------------------------------
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicantApplicationKeys } from "../api";
import { applicationSectionApi } from "../api/application-section.api";

export function useSubmitSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationSectionApi.submitSection,

    onSuccess: async (_, variables) => {
      /**
       * Refresh applicant progress.
       */
      await queryClient.invalidateQueries({
        queryKey: applicantApplicationKeys.application(),
      });

      /**
       * Refresh this section.
       */
      await queryClient.invalidateQueries({
        queryKey: ["application", "section", variables.sectionId],
      });
    },
  });
}
