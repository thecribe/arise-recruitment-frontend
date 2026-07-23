/**
 * -----------------------------------------------------------------------------
 * File: review-status.ts
 *
 * Description:
 * Review lifecycle for a section.
 * -----------------------------------------------------------------------------
 */

export const REVIEW_STATUS = {
  SUBMITTED: "submitted",
  APPROVED: "approved",
  RETURNED: "returned",
} as const;

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];
