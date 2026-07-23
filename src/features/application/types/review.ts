/**
 * -----------------------------------------------------------------------------
 * File: review.ts
 *
 * Description:
 * Types representing a manager's review of an application section.
 * -----------------------------------------------------------------------------
 */

import type { ReviewStatus } from "../constants/review-status";

export interface ReviewComment {
  id: string;

  author: string;

  createdAt: string;

  /**
   * Optional field name the comment relates to.
   */
  field?: string;

  message: string;
}

export interface SectionReview {
  status: ReviewStatus;

  reviewedBy?: string;

  reviewedAt?: string;

  comments: ReviewComment[];
}
