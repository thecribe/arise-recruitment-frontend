export interface TrainingCertificateRequirement {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingCertificateRequirementFormValues {
  name: string;
  description: string;
}

export interface TrainingCertificateRequirementsResponse {
  requirements: TrainingCertificateRequirement[];
}
