import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";
import { declarationsApi } from "../../compliance/api/declarations.api";
import { declarationKeys } from "../../compliance/api/declarations.keys";

interface UpdateDeclarationPayload {
  applicationId: string;
  sectionId: string;
  values: Record<string, unknown>;
}

export const useUpdateApplicantDeclaration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      sectionId,
      values,
    }: UpdateDeclarationPayload) =>
      declarationsApi.updateDeclaration(applicationId, sectionId, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: declarationKeys.values(variables.applicationId),
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
