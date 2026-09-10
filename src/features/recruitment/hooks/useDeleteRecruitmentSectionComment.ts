import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";
import { notification } from "@/components/feedback/notification";
import type { AxiosError } from "axios";

interface DeleteSectionCommentParams {
  commentId: string;

  applicationId: string;
  sectionId: string;
}

export function useDeleteRecruitmentSectionComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      applicationId,
      sectionId,
    }: DeleteSectionCommentParams) =>
      recruitmentApi.deleteSectionComment(commentId, applicationId, sectionId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["recruitment"],
      });
      notification.success(data.message);
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{
        message?: string;
      }>;

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update application stage. Please try again.",
      );
    },
  });
}
