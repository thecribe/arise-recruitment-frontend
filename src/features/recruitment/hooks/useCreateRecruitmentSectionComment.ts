import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";

interface CreateSectionCommentParams {
  applicationId: string;
  sectionId: string;
  comment: string;
}

export function useCreateRecruitmentSectionComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      sectionId,
      comment,
    }: CreateSectionCommentParams) =>
      recruitmentApi.createSectionComment(applicationId, sectionId, {
        comment,
      }),

    onSuccess: () => {
      /**
       * We will replace this with your exact section query key.
       */
      queryClient.invalidateQueries({
        queryKey: ["recruitment"],
      });
    },
  });
}
