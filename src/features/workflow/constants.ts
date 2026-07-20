export const WORKFLOW_PHASES = {
  APPLICATION: "application",
  PRE_EMPLOYMENT: "pre-employment",
  COMPLIANCE: "compliance",
  APPROVAL: "approval",
} as const;

export const WORKFLOW_STATUS = {
  LOCKED: "locked",
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;
