/**
 * -----------------------------------------------------------------------------
 * File: useSaveDraft.ts
 *
 * Description:
 * Saves the current application section as a draft.
 * -----------------------------------------------------------------------------
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicantApplicationKeys } from "../api";
import { applicationSectionApi } from "../api/application-section.api";

export function useSaveDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationSectionApi.saveDraft,

    onSuccess: async (_, variables) => {
      /**
       * Refresh applicant progress.
       */
      await queryClient.invalidateQueries({
        queryKey: applicantApplicationKeys.application(),
      });

      /**
       * Refresh the saved values for this section.
       */
      await queryClient.invalidateQueries({
        queryKey: ["application", "section", variables.sectionId],
      });
    },
  });
}
