/**
 * -----------------------------------------------------------------------------
 * File: use-training-certificate-comments.ts
 *
 * Description:
 * React Query hooks for Training Certificate section comments.
 * -----------------------------------------------------------------------------
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { trainingCertificateCommentsApi } from "../api/training-certificate-comments.api";

import { trainingCertificateCommentKeys } from "../api/training-certificate-comments.keys";

import type {
  CreateTrainingCertificateCommentPayload,
  UpdateTrainingCertificateCommentPayload,
} from "../sections/training/types/training-certificate-comment.types";
import { notification } from "@/components/feedback/notification";

/**
 * -----------------------------------------------------------------------------
 * Fetch comments
 * -----------------------------------------------------------------------------
 */

export const useTrainingCertificateComments = (
  applicationId: string,
  sectionId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: trainingCertificateCommentKeys.list(applicationId, sectionId),

    queryFn: () =>
      trainingCertificateCommentsApi.getComments(applicationId, sectionId),

    enabled: Boolean(applicationId) && Boolean(sectionId) && enabled,
  });
};

/**
 * -----------------------------------------------------------------------------
 * Add comment
 * -----------------------------------------------------------------------------
 */

export const useAddTrainingCertificateComment = (
  applicationId: string,
  sectionId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrainingCertificateCommentPayload) =>
      trainingCertificateCommentsApi.createComment(
        applicationId,
        sectionId,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateCommentKeys.list(applicationId, sectionId),
      });
      notification.success("Review comment added successfully.");
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to add review comment. Please try again.",
      );
    },
  });
};

/**
 * -----------------------------------------------------------------------------
 * Update comment
 * -----------------------------------------------------------------------------
 */

export const useUpdateTrainingCertificateComment = (
  applicationId: string,
  sectionId: string,
  commentId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTrainingCertificateCommentPayload) =>
      trainingCertificateCommentsApi.updateComment(
        applicationId,
        sectionId,
        commentId,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateCommentKeys.list(applicationId, sectionId),
      });
      notification.success("Review comment updated successfully.");
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update review comment. Please try again.",
      );
    },
  });
};

/**
 * -----------------------------------------------------------------------------
 * Delete comment
 * -----------------------------------------------------------------------------
 */

export const useDeleteTrainingCertificateComment = (
  applicationId: string,
  sectionId: string,
  commentId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      trainingCertificateCommentsApi.deleteComment(
        applicationId,
        sectionId,
        commentId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateCommentKeys.list(applicationId, sectionId),
      });
      notification.success("Review comment deleted successfully.");
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to delete review comment. Please try again.",
      );
    },
  });
};
