export const PHASE_STATUS = {
  LOCKED: "locked",
  IN_PROGRESS: "in_progress",
  SUBMITTED: "submitted",
  APPROVED: "approved",
  DRAFT: "draft",
  REJECTED: "rejected",
} as const;

export type PhaseStatus = (typeof PHASE_STATUS)[keyof typeof PHASE_STATUS];
