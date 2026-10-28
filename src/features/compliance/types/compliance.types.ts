export interface ComplianceSectionData {
  [key: string]: unknown;
}

export interface ComplianceCertificate {
  id: string;
  certificateName: string;
  certificateNumber: string | null;
  issueDate: string | null;
  expiryDate: string | null;
}

export interface MissingTrainingCertificate {
  requirementId: string;
  name: string;
  description: string | null;
  uploaded: false;
  certificates: [];
}

export interface TrainingRequirement {
  requirementId: string;
  name: string;
  description: string | null;
  uploaded: boolean;
  certificates: ComplianceCertificate[];
}

export interface TrainingCompliance {
  requiredCount: number;
  uploadedCount: number;
  missingCount: number;
  missingCertificates: MissingTrainingCertificate[];
  requirements: TrainingRequirement[];
}

export interface ReferenceCompliance {
  total: number;
  responsesReceived: number;
  outstanding: number;
}

export interface ApplicantComplianceDetails {
  identity: ComplianceSectionData | null;
  rightToWork: ComplianceSectionData | null;
  dbs: ComplianceSectionData | null;
  professionalMemberships: ComplianceSectionData | null;
  training: TrainingCompliance;
  references: ReferenceCompliance;
}

export interface ComplianceApplicant {
  id: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  jobType: {
    id: string;
    name: string;
  } | null;
  compliance: ApplicantComplianceDetails;
}

export interface CompliancePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ComplianceFilters {
  page: number;
  limit: number;
  search: string;
  job_type_id: string;
}

export interface ComplianceApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ComplianceTrainingRequirement {
  id: string;
  name: string;
  description: string | null;
}

export interface ComplianceListResponse {
  data: ComplianceApplicant[];
  pagination: CompliancePagination;
  trainingRequirements: ComplianceTrainingRequirement[];
}
