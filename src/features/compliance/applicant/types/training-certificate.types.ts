export type TrainingCertificateSectionStatus =
  | "locked"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export interface TrainingCertificateRequirement {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrainingCertificateDocument {
  url?: string;
  name?: string;
  type?: string;
  size?: number;
  [key: string]: unknown;
}

export interface ApplicantTrainingCertificate {
  id: string;
  application_id: string;
  requirement_id: string | null;
  certificate_name: string;
  certificate_number: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  document: TrainingCertificateDocument | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicantTrainingCertificateComment {
  id: string;
  application_id: string;
  section_id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicantTrainingCertificatesResponse {
  sectionId: string;
  status: TrainingCertificateSectionStatus;
  requirements: TrainingCertificateRequirement[];
  certificates: ApplicantTrainingCertificate[];
  comments: ApplicantTrainingCertificateComment[];
}

export interface CreateTrainingCertificatePayload {
  requirementId?: string | null;
  certificateName: string;
  certificateNumber?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  document?: TrainingCertificateDocument | null;
}

export type UpdateTrainingCertificatePayload =
  Partial<CreateTrainingCertificatePayload>;

export interface SubmitTrainingCertificatesResponse {
  sectionId: string;
  status: "submitted";
}
