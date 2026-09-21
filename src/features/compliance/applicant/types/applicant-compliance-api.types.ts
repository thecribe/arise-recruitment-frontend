import type {
  ApplicantComplianceSection,
  RecruitmentApplicationSectionStatus,
} from "./compliance.types";

export interface ApplicantComplianceSectionResponse {
  section: ApplicantComplianceSection;
  values: Record<string, unknown>;
  comments: ApplicantComplianceComment[];
}

export interface ApplicantComplianceComment {
  id: string;
  application_id: string;
  section_id: string;
  comment: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicantComplianceSaveResponse {
  section: ApplicantComplianceSection;
  values: Record<string, unknown>;
}

export interface ApplicantComplianceSectionStatusResponse {
  id: string;
  application_id: string;
  section_id: string;
  status: RecruitmentApplicationSectionStatus;
}
