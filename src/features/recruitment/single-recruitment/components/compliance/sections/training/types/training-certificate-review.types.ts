/**
 * -----------------------------------------------------------------------------
 * File: training-certificate-review.types.ts
 * -----------------------------------------------------------------------------
 */

export type TrainingCertificateReviewStatus =
  | "locked"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export interface TrainingCertificateReview {
  applicationId: string;
  sectionId: string;
  status: TrainingCertificateReviewStatus;
}

export interface TrainingCertificateReviewResponse {
  review: TrainingCertificateReview;
}
