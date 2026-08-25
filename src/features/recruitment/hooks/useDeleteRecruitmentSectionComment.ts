import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";

interface DeleteSectionCommentParams {
  commentId: string;
}

export function useDeleteRecruitmentSectionComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: DeleteSectionCommentParams) =>
      recruitmentApi.deleteSectionComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruitment"],
      });
    },
  });
}
