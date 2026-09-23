import type { FieldType } from "@/components/forms/types/field";
import type { FormUploadedFile } from "@/components/forms/types/file";

export interface ApplicationDocument {
  documentType: "application_form";

  application: {
    id: string;
    status: string | null;
    createdAt: string | null;
    updatedAt: string | null;
  };

  applicant: Record<string, unknown> | null;

  sections: ApplicationDocumentSection[];

  references: ApplicationReference[];

  generatedAt: string;
}

export interface ApplicationDocumentSection {
  sectionId: string;
  status: string;
  recruiterComment: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  values: Record<string, unknown> | unknown[];
}

export interface ApplicationReference {
  id: string;
  [key: string]: unknown;
}

export interface ApplicationDefinitionField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: unknown;
  placeholder?: string | null;
  description?: string | null;
  file?: {
    multiple?: boolean;
  } | null;
}

export interface ApplicationDefinitionSection {
  id: string;
  title: string;
  description?: string | null;
  order?: number;
  repeatable?: boolean;
  minItems?: number;
  maxItems?: number;
  fields: ApplicationDefinitionField[];
}

export interface ApplicationDefinitionPhase {
  id: string;
  title: string;
  description?: string | null;
  order?: number;
  sections: ApplicationDefinitionSection[];
}

// -----------------------------------------------------------------------------
// Interview Scoresheet Document
// -----------------------------------------------------------------------------

export interface InterviewScoreField {
  id: string;
  name: string;
  label: string;
  type: string;
  description?: string | null;
  required?: boolean;
  min?: number | null;
  max?: number | null;
  order?: number;
  score: number | null;
}

export interface InterviewScoreSection {
  id: string;
  title: string;
  description?: string | null;
  order?: number;
  fields: InterviewScoreField[];
}

export interface InterviewDocumentApplicant {
  id: string | null;
  fullName: string | null;
}

export interface InterviewDocumentDetails {
  id: string;
  applicationId: string;
  interviewerId: string;
  interviewerName: string;
  interviewDate: string;
  interviewerSignature: FormUploadedFile;
  normalizedScore: number | null;
  totalScore: number;
}

export interface InterviewScoresheetDocument {
  documentType: "interview_scoresheet";

  applicant: InterviewDocumentApplicant | null;

  interview: InterviewDocumentDetails;

  sections: InterviewScoreSection[];

  generatedAt: string;
}

export interface ApplicantDocument {
  id: string;
  application_id: string;
  name: string;
  document_url: string;
  mime_type?: string | null;
  size?: number | null;
  createdAt: string;
  updatedAt?: string;
}
