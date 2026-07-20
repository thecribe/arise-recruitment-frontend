/**
 * -----------------------------------------------------------------------------
 * File: types.ts
 * Description:
 * Recruitment workflow shared types.
 * -----------------------------------------------------------------------------
 */

export type WorkflowStatus =
  | "locked"
  | "not_started"
  | "in_progress"
  | "completed"
  | "approved"
  | "rejected";

export interface WorkflowSection {
  id: string;

  title: string;

  description?: string;

  route: string;

  order: number;

  status: WorkflowStatus;

  visible: boolean;

  completed: boolean;

  approved: boolean;

  recruiterComment?: string;

  completedAt?: string;

  approvedAt?: string;

  approvedBy?: string;
}

export interface WorkflowPhase {
  id: string;

  title: string;

  description?: string;

  order: number;

  status: WorkflowStatus;

  sections: WorkflowSection[];
}

export interface RecruitmentWorkflow {
  applicantId: string;

  currentPhaseId: string;

  currentSectionId: string;

  phases: WorkflowPhase[];
}

export interface WorkflowPhase {
  id: string;

  title: string;

  description?: string;

  order: number;

  status: WorkflowStatus;



  /**
   * Can the applicant enter this phase?
   */
  unlocked?: boolean;

  sections: WorkflowSection[];
}
