import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";
import { notification } from "@/components/feedback/notification";
import type { AxiosError } from "axios";

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
