/**
 * -----------------------------------------------------------------------------
 * File: types.ts
 * Description:
 * Shared dashboard types.
 * -----------------------------------------------------------------------------
 */

export type StageStatus = "completed" | "current" | "upcoming" | "rejected";

export interface ApplicationStage {
  id: string;

  title: string;

  status: StageStatus;

  completedAt?: string;

  comment?: string;

  approvedBy?: string;
}

export interface ApplicantSummary {
  id: string;
  applicationNumber: string;

  firstName: string;
  lastName: string;

  email: string;

  jobRole: string;

  currentStage: string;

  appliedDate: string;

  recruitmentManager: string;

  avatar?: string;
}
