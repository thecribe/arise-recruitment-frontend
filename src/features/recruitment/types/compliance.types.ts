/**
 * -----------------------------------------------------------------------------
 * File: compliance.types.ts
 *
 * Description:
 * Shared types for the Recruitment Applicant Compliance workspace.
 * -----------------------------------------------------------------------------
 */

import type { RecruitmentSectionComment } from "./recruitment.types";

export type ComplianceSectionId =
  | "right-to-work"
  | "dbs"
  | "professional-memberships"
  | "references"
  | "certificates"
  | "identity-compliance";

export interface ComplianceSection {
  id: ComplianceSectionId;
  label: string;
  description: string;
}

export type ComplianceFormValues = Record<string, unknown>;

export interface ComplianceSectionData {
  applicant: {
    values: ComplianceFormValues;
  };

  manager: {
    values: ComplianceFormValues;
  };

  comments: RecruitmentSectionComment[];

  progress: "locked" | "in_progress" | "submitted" | "approved" | "rejected";
}
