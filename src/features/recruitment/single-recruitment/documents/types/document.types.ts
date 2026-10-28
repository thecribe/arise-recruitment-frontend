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

export type ComplianceRecord = Record<string, unknown>;

export interface ComplianceSummarySection {
  sectionId: string;
  status: string;
  values?: ComplianceRecord;
  applicantValues?: ComplianceRecord;
  managerValues?: ComplianceRecord;
}

export interface ComplianceDocumentFile {
  id?: string | number;
  name?: string;
  filename?: string;
  originalname?: string;
  document_name?: string;
  document_url?: string;
  documentUrl?: string;
  url?: string;
  path?: string;
  [key: string]: unknown;
}

export type ComplianceDocumentValue =
  | string
  | ComplianceDocumentFile
  | ComplianceDocumentFile[]
  | null
  | undefined;

export interface ComplianceTrainingCertificate {
  id: string | number;
  requirement_id?: string | number | null;
  requirementId?: string | number | null;
  certificate_name?: string | null;
  certificateName?: string | null;
  certificate_number?: string | null;
  certificateNumber?: string | null;
  issue_date?: string | null;
  issueDate?: string | null;
  expiry_date?: string | null;
  expiryDate?: string | null;
  document?: ComplianceDocumentValue;
  [key: string]: unknown;
}

export interface MissingTrainingRequirement {
  id: string | number;
  name: string;
  description?: string | null;
}

export interface ComplianceReferenceResponse {
  id?: string | number;
  reEmploy?: string | boolean | null;
  ratings?: string | null;
  detailReference?: string | null;
  refererName?: string | null;
  signatureDate?: string | null;
  createdAt?: string | null;
  [key: string]: unknown;
}

export interface ComplianceReference {
  id: string;
  companyName?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
  refereeName?: string | null;
  refereeEmail?: string | null;
  refereePhone?: string | null;
  refereeRelationship?: string | null;
  status?: string | null;
  responseStatus: "received" | "pending";
  responses: ComplianceReferenceResponse[];
}

export interface ComplianceSummaryDocument {
  documentType: "compliance_summary";
  generatedAt: string;
  application: {
    id: string;
    status?: string | null;
    submittedAt?: string | null;
  };
  applicant:
    | (Record<string, unknown> & {
        fullName?: string | null;
        first_name?: string | null;
        last_name?: string | null;
        email?: string | null;
      })
    | null;
  sections: {
    identityCompliance: ComplianceSummarySection & {
      values: ComplianceRecord;
    };
    rightToWork: ComplianceSummarySection & {
      applicantValues: ComplianceRecord;
      managerValues: ComplianceRecord;
    };
    dbs: ComplianceSummarySection & {
      managerValues: ComplianceRecord;
    };
    professionalMemberships: ComplianceSummarySection & {
      values: ComplianceRecord;
    };
  };
  trainingCertificates: {
    uploaded: ComplianceTrainingCertificate[];
    missingMandatoryRequirements: MissingTrainingRequirement[];
  };
  references: ComplianceReference[];
  summary: {
    uploadedCertificateCount: number;
    missingMandatoryCertificateCount: number;
    totalReferences: number;
    receivedReferenceResponses: number;
    pendingReferenceResponses: number;
  };
}
