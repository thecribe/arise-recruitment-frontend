export type RecruitmentApplicationSectionStatus =
  | "locked"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export type ApplicantComplianceTab =
  | "compliance-forms"
  | "references"
  | "training-certificates";

export interface ApplicantComplianceSection {
  id: string;
  application_id: string;
  section_id: string;
  status: RecruitmentApplicationSectionStatus;
  submitted_at: string | null;
  approved_at: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface ApplicantCompliancePageData {
  application_id: string;
  sections: ApplicantComplianceSection[];
}
