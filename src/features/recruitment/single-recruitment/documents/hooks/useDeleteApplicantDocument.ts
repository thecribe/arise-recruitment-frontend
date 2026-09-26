import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteApplicantDocument } from "../api/documents.api";
import { notification } from "@/components/feedback/notification";
import { getErrorMessage } from "../../components/interview/hooks/useInterview";

export const useDeleteApplicantDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      documentId,
    }: {
      applicationId: string;
      documentId: string;
    }) => deleteApplicantDocument(applicationId, documentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-documents", variables.applicationId],
      });
      notification.success("Document deleted successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(error, "Unable to delete document. Please try again."),
      );
    },
  });
};
