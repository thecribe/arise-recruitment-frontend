/**
 * -----------------------------------------------------------------------------
 * Section lifecycle.
 * -----------------------------------------------------------------------------
 */

export const SECTION_STATUS = {
  LOCKED: "locked",
  IN_PROGRESS: "in_progress",
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type SectionStatus =
  (typeof SECTION_STATUS)[keyof typeof SECTION_STATUS];
