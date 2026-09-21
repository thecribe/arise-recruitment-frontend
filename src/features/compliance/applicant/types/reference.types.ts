export type ApplicantReferenceStatus =
  | "in_progress"
  | "submitted"
  | "rejected"
  | "approved";

export interface ApplicantReference {
  id: string;
  applicationId: string;
  companyName: string | null;
  fromDate: string | null;
  toDate: string | null;
  refereeName: string | null;
  refereeEmail: string | null;
  refereePhone: string | null;
  refereeRelationship: string | null;
  status: ApplicantReferenceStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateApplicantReferencePayload {
  companyName?: string;
  fromDate?: string;
  toDate?: string;
  refereeName?: string;
  refereeEmail?: string;
  refereePhone?: string;
  refereeRelationship?: string;
}

export type UpdateApplicantReferencePayload = CreateApplicantReferencePayload;

export interface SubmitReferencesResponse {
  submittedCount: number;
  references: ApplicantReference[];
}
