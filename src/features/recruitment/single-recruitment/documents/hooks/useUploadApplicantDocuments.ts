import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadApplicantDocuments } from "../api/documents.api";
import { getErrorMessage } from "../../components/interview/hooks/useInterview";
import { notification } from "@/components/feedback/notification";

export const useUploadApplicantDocuments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      files,
    }: {
      applicationId: string;
      files: File[];
    }) => uploadApplicantDocuments(applicationId, files),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applicant-documents", variables.applicationId],
      });
      notification.success("Document uploaded successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(error, "Unable to upload document. Please try again."),
      );
    },
  });
};
