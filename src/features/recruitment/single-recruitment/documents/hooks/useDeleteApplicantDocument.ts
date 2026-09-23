import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteApplicantDocument } from "../api/documents.api";

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
    },
  });
};
