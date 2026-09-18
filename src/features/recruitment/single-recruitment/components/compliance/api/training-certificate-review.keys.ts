/**
 * -----------------------------------------------------------------------------
 * File: training-certificate-review.keys.ts
 *
 * Description:
 * React Query keys for Training Certificate section review state.
 * -----------------------------------------------------------------------------
 */

export const trainingCertificateReviewKeys = {
  all: ["training-certificate-review"] as const,

  detail: (applicationId: string, sectionId: string) =>
    [
      ...trainingCertificateReviewKeys.all,
      "detail",
      applicationId,
      sectionId,
    ] as const,
};
