/**
 * -----------------------------------------------------------------------------
 * File: types.ts
 *
 * Description:
 * Mock database schema.
 * -----------------------------------------------------------------------------
 */

import type { ApplicantSectionValuesResponse } from "@/features/application/api/applicant-section-request.api";
import type {
  ApplicantApplication,
  ApplicantPhaseRecord,
  ApplicantSectionRecord,
  ApplicationPhase,
  SectionStatus,
} from "@/features/application/types";
import type { AuthUser } from "@/features/auth/types/auth.types";

export interface RecruitmentReview {
  id: string;

  applicantId: string;

  phaseId: string;

  sectionId?: string;

  comment: string;

  approved: boolean;

  createdBy: string;

  createdAt: string;
}

export interface ComplianceDocument {
  id: string;

  applicantId: string;

  name: string;

  fileName: string;

  uploadedBy: string;

  uploadedAt: string;

  expiresAt?: string;
}

export interface StaffMember {
  id: string;

  applicantId: string;

  employeeNumber: string;

  startDate: string;

  active: boolean;
}

export interface AppSettings {
  companyName: string;

  allowRegistration: boolean;

  maintenanceMode: boolean;
}

export interface AuditLog {
  id: string;

  action: string;

  entity: string;

  entityId: string;

  userId: string;

  createdAt: string;
}

// export interface MockDatabase {
//   users: AuthUser[];

//   applicationDefinition: ApplicationPhase | null;

//   applicantApplications: ApplicantApplication[];

//   applicantSectionRecords: ApplicantSectionRecord[];

//   applicantPhaseRecords: ApplicantPhaseRecord[];

//   applicantSectionValues: ApplicantSectionValuesResponse[];
//   recruitmentReviews: RecruitmentReview[];

//   complianceDocuments: ComplianceDocument[];

//   staff: StaffMember[];

//   settings: AppSettings;

//   auditLogs: AuditLog[];
// }

export interface ApplicantScenario {
  application: ApplicantApplication;

  phaseRecords: ApplicantPhaseRecord[];

  sectionRecords: ApplicantSectionRecord[];

  sectionValues: ApplicantSectionValuesResponse[];
}

/**
 * -----------------------------------------------------------------------------
 * File: applicant-section-data.ts
 *
 * Description:
 * Represents the data entered by an applicant for a single application section.
 *
 * This model is loaded only when a section becomes active.
 *
 * Notes:
 * - Contains no field definitions.
 * - Contains no section metadata.
 * - Supports both single and repeatable sections.
 * -----------------------------------------------------------------------------
 */

export interface ApplicantSectionData {
  applicantId: string;

  sectionId: string;

  status: SectionStatus;

  values: SectionValues;
}

export type SectionValues = Record<string, unknown> | Record<string, unknown>[];

export interface MockDatabase {
  applicationDefinition: any;

  applicantApplications: ApplicantApplication[];

  applicantSectionData: ApplicantSectionData[];
}
