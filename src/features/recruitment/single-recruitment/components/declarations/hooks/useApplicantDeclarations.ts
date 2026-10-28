import { useQuery } from "@tanstack/react-query";
import {
  applicationSectionKeys,
  declarationKeys,
} from "../../compliance/api/declarations.keys";
import { declarationsApi } from "../../compliance/api/declarations.api";

export const useApplicantDeclarations = (applicationId?: string) => {
  return useQuery({
    queryKey: applicationId
      ? declarationKeys.definitions(applicationId)
      : declarationKeys.all,

    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required.");
      }

      return declarationsApi.getDeclarations(applicationId);
    },

    enabled: Boolean(applicationId),
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApplicationSectionStatus } from "@/features/compliance/applicant/components/declarations/application-section-status";
import { notification } from "@/components/feedback/notification";

export const useApplicationSectionStatus = (
  applicationId: string,
  sectionId: string,
) => {
  return useQuery({
    queryKey: applicationSectionKeys.status(applicationId, sectionId),
    queryFn: () => declarationsApi.getSectionStatus(applicationId, sectionId),
    enabled: !!applicationId && !!sectionId,
  });
};

interface UpdateStatusInput {
  applicationId: string;
  sectionId: string;
  status: ApplicationSectionStatus;
}

export const useUpdateApplicationSectionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, sectionId, status }: UpdateStatusInput) =>
      declarationsApi.updateSectionStatus(applicationId, sectionId, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: applicationSectionKeys.status(
          variables.applicationId,
          variables.sectionId,
        ),
      });

      notification.success("Declaration status updated successfully.");
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
          "Unable to update declaration status. Please try again.",
      );
    },
  });
};
