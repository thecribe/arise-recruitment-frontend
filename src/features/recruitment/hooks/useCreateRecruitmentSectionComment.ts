import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "../api/recruitment.api";
import { notification } from "@/components/feedback/notification";
import type { AxiosError } from "axios";

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

    onSuccess: (data) => {
      /**
       * We will replace this with your exact section query key.
       */
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
