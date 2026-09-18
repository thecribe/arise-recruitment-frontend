export interface TrainingCertificateDocument {
  document_url: string;
  id: string;
  mimetype: string;
  name: string;
  size: number;
}

export interface TrainingCertificate {
  id: string;
  applicationId: string;
  requirementId: string | null;

  certificateName: string;
  certificateNumber: string | null;

  issueDate: string | null;
  expiryDate: string | null;

  document: TrainingCertificateDocument | null;

  uploadedBy: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface TrainingCertificateRequirement {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingCertificatesResponse {
  requirements: TrainingCertificateRequirement[];
  certificates: TrainingCertificate[];
}

export type TrainingCertificateSectionStatus =
  | "locked"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export interface TrainingCertificateSectionStatusResponse {
  status: TrainingCertificateSectionStatus;
}

export interface UpdateTrainingCertificateSectionStatusPayload {
  status: "approved" | "rejected";
}
