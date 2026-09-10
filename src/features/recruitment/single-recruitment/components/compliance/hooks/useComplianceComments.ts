import { useMutation, useQueryClient } from "@tanstack/react-query";

import { recruitmentApi } from "@/features/recruitment/api/recruitment.api";

import { complianceSectionDataKeys } from "./useComplianceSectionData";
import { notification } from "@/components/feedback/notification";

interface UseComplianceCommentsProps {
  applicationId: string;
  sectionId: string;
}

export function useComplianceComments({
  applicationId,
  sectionId,
}: UseComplianceCommentsProps) {
  const queryClient = useQueryClient();

  const invalidateSection = () => {
    queryClient.invalidateQueries({
      queryKey: complianceSectionDataKeys.section(applicationId, sectionId),
    });

    notification.success("Application section status updated successfully.");
  };

  const onError = (error: unknown) => {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };

    notification.error(
      axiosError.response?.data?.message ||
        "Unable to update application section status. Please try again.",
    );
  };

  const addCommentMutation = useMutation({
    mutationFn: (comment: string) =>
      recruitmentApi.createSectionComment(applicationId, sectionId, {
        comment,
      }),

    onSuccess: invalidateSection,
    onError: onError,
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      comment,
    }: {
      commentId: string;
      comment: string;
    }) =>
      recruitmentApi.updateSectionComment(commentId, applicationId, sectionId, {
        comment,
      }),

    onSuccess: invalidateSection,
    onError: onError,
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) =>
      recruitmentApi.deleteSectionComment(commentId, applicationId, sectionId),

    onSuccess: invalidateSection,
    onError: onError,
  });

  return {
    addComment: addCommentMutation.mutateAsync,

    updateComment: updateCommentMutation.mutateAsync,

    deleteComment: deleteCommentMutation.mutateAsync,

    isAddingComment: addCommentMutation.isPending,

    updatingCommentId: updateCommentMutation.isPending
      ? (updateCommentMutation.variables?.commentId ?? null)
      : null,

    deletingCommentId: deleteCommentMutation.isPending
      ? (deleteCommentMutation.variables ?? null)
      : null,

    addCommentError: addCommentMutation.error,

    updateCommentError: updateCommentMutation.error,

    deleteCommentError: deleteCommentMutation.error,
  };
}

export default useComplianceComments;
