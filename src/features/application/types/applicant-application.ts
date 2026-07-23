/**
 * -----------------------------------------------------------------------------
 * File: applicant-application.ts
 *
 * Description:
 * Defines the current applicant's progress through the application.
 *
 * Unlike the application definition, these records are unique to each
 * applicant and represent their journey.
 *
 * Notes:
 * - Does NOT contain phase definitions.
 * - Does NOT contain section definitions.
 * - Does NOT contain field definitions.
 * -----------------------------------------------------------------------------
 */

export interface ApplicantApplication {
  applicantId: string;

  progress: number;

  currentPhaseId: string;

  currentSectionId: string;

  phases: ApplicantPhaseRecord[];
}

/**
 * Represents an applicant's progress within a phase.
 */
export interface ApplicantPhaseRecord {
  phaseId: string;

  status: PhaseStatus;

  startedAt?: string;

  completedAt?: string;

  sections: ApplicantSectionRecord[];
}

/**
 * Represents an applicant's progress within a section.
 */
export interface ApplicantSectionRecord {
  sectionId: string;

  status: SectionStatus;

  recruiterComment?: string;

  submittedAt?: string;

  approvedAt?: string;
}

export type PhaseStatus =
  | "locked"
  | "draft"
  | "in_progress"
  | "submitted"
  | "rejected"
  | "approved";

export type SectionStatus =
  | "locked"
  | "draft"
  | "in_progress"
  | "submitted"
  | "rejected"
  | "approved";
