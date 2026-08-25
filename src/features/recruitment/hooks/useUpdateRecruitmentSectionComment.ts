import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";

interface UpdateSectionCommentParams {
  commentId: string;
  applicationId: string;
  sectionId: string;
  comment: string;
}

export function useUpdateRecruitmentSectionComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      applicationId,
      sectionId,
      comment,
    }: UpdateSectionCommentParams) =>
      recruitmentApi.updateSectionComment(commentId, applicationId, sectionId, {
        comment,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruitment"],
      });
    },
  });
}
