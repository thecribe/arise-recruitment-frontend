import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicantDeclarationsApi } from "../api/applicant-declarations.api";
import { applicantDeclarationKeys } from "../api/applicant-declarations.keys";
import { notification } from "@/components/feedback/notification";

interface UpdateApplicantDeclarationInput {
  sectionId: string;
  values: Record<string, unknown>;
}

export const useUpdateApplicantDeclaration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, values }: UpdateApplicantDeclarationInput) =>
      applicantDeclarationsApi.updateDeclaration(sectionId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: applicantDeclarationKeys.values(),
      });
      notification.success("Declaration submitted successfully.");
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to submit declaration. Please try again.",
      );
    },
  });
};
