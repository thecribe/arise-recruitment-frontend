import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadApplicantDocuments } from "../api/documents.api";

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
    },
  });
};
