/**
 * -----------------------------------------------------------------------------
 * File: use-training-certificate-review.ts
 *
 * Description:
 * React Query hooks for Training Certificate section review.
 *
 * Responsibilities:
 * - Fetch section review state
 * - Approve the section
 * - Reject the section
 * - Invalidate review state after changes
 * -----------------------------------------------------------------------------
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { trainingCertificateReviewApi } from "../api/training-certificate-review.api";

import { trainingCertificateReviewKeys } from "../api/training-certificate-review.keys";

/**
 * -----------------------------------------------------------------------------
 * Fetch review
 * -----------------------------------------------------------------------------
 */

export const useTrainingCertificateReview = (
  applicationId: string,
  sectionId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: trainingCertificateReviewKeys.detail(applicationId, sectionId),

    queryFn: () =>
      trainingCertificateReviewApi.getReview(applicationId, sectionId),

    enabled: Boolean(applicationId) && Boolean(sectionId) && enabled,
  });
};

/**
 * -----------------------------------------------------------------------------
 * Approve
 * -----------------------------------------------------------------------------
 */

export const useApproveTrainingCertificateSection = (
  applicationId: string,
  sectionId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      trainingCertificateReviewApi.approve(applicationId, sectionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateReviewKeys.detail(
          applicationId,
          sectionId,
        ),
      });
    },
  });
};

/**
 * -----------------------------------------------------------------------------
 * Reject
 * -----------------------------------------------------------------------------
 */

export const useRejectTrainingCertificateSection = (
  applicationId: string,
  sectionId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      trainingCertificateReviewApi.reject(applicationId, sectionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateReviewKeys.detail(
          applicationId,
          sectionId,
        ),
      });
    },
  });
};
