/**
 * -----------------------------------------------------------------------------
 * File: recruitment.types.ts
 *
 * Description:
 * Shared types used throughout the Recruitment feature.
 *
 * Important:
 * The Recruitment feature deliberately separates lightweight application
 * summaries from detailed section data.
 *
 * The applicant list and applicant detail page should not load every field
 * value at once.
 *
 * Section fields, values and comments are loaded only when a Recruitment
 * Manager selects a particular section.
 * -----------------------------------------------------------------------------
 */

import type {
  ApplicationField,
  ApplicationPhase,
} from "@/features/application/types";

/**
 * -----------------------------------------------------------------------------
 * Job Type
 * -----------------------------------------------------------------------------
 */

export interface JobType {
  id: string;
  name: string;
}

/**
 * -----------------------------------------------------------------------------
 * Overall applicant application lifecycle status.
 *
 * This is used for applicant detail/header display and future manager actions.
 *
 * It is intentionally NOT part of RecruitmentApplicantFilters.
 * -----------------------------------------------------------------------------
 */
export type RecruitmentApplicantStatus =
  | "IN_PROGRESS"
  | "REJECTED"
  | "APPROVED";

/**
 * -----------------------------------------------------------------------------
 * Recruitment Default Data
 *
 * Used by the Recruitment applicant list/filtering UI.
 *
 * Job types come from the backend.
 * Application phases are provided from the application definition service.
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentDefaultData {
  jobTypes: JobType[];
  phases: ApplicationPhase[];
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment Applicant List Item
 * -----------------------------------------------------------------------------
 */
export interface RecruitmentApplicant {
  applicantId: string;
  applicationId: string;

  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  jobType: JobType | null;

  currentStage: ApplicationPhase | null;

  status: RecruitmentApplicantStatus;

  progress: number;

  submittedAt: string | null;

  createdAt: string;

  updatedAt: string;
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment Applicant Detail
 *
 * Used by:
 *
 * GET /recruitment/applicants/:id
 *
 * This is intentionally different from the list item.
 *
 * The detail response contains the lightweight application structure required
 * to initialise the applicant workspace.
 *
 * Section fields and applicant values are NOT returned here.
 * They are loaded lazily when a section is selected.
 * -----------------------------------------------------------------------------
 */
export interface RecruitmentApplicantDetail {
  applicant: {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string | null;

    address: string | null;

    postcode: string | null;
  };

  jobType: JobType | null;

  status: RecruitmentApplicantStatus;

  latestStatus: {
    id: string;

    previousStatus: RecruitmentApplicantStatus | null;

    status: RecruitmentApplicantStatus;

    reason: string | null;

    changedBy: string | null;

    createdAt: string;
  } | null;

  application: RecruitmentApplicantApplication;
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment Applicant Filters
 *
 * Filters used by the Recruitment applicant list.
 *
 * We intentionally do NOT filter by:
 *
 * - postal code
 * - generic applicant status
 *
 * The current application phase is used as the primary stage filter.
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentApplicantFilters {
  page?: number;

  pageSize?: number;

  search?: string;

  jobTypeId?: string;

  phaseId?: string;

  status?: RecruitmentApplicantStatus;
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment Applicant List Response
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentApplicantListResponse {
  data: RecruitmentApplicant[];

  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/**
 * =============================================================================
 * Recruitment Applicant Detail Types
 * =============================================================================
 *
 * These types are used after the manager opens a single applicant.
 *
 * The applicant detail response is intentionally lightweight.
 *
 * It contains:
 *
 * - applicant information
 * - application progress
 * - phases
 * - lightweight section summaries
 *
 * It does NOT contain:
 *
 * - section fields
 * - section values
 * - repeatable section entries
 * - comments
 *
 * Those are requested separately when a section is selected.
 * =============================================================================
 */

/**
 * -----------------------------------------------------------------------------
 * Application Section Status
 * -----------------------------------------------------------------------------
 */

export type RecruitmentApplicationSectionStatus =
  | "locked"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

/**
 * -----------------------------------------------------------------------------
 * Application Phase Status
 * -----------------------------------------------------------------------------
 */

export type RecruitmentApplicationPhaseStatus =
  | "locked"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

/**
 * -----------------------------------------------------------------------------
 * Application Section Summary
 *
 * Lightweight representation of a section.
 *
 * Used by the vertical section navigation.
 *
 * No fields or applicant values are loaded here.
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentApplicationSectionSummary {
  /**
   * Section definition ID.
   */
  id: string;

  /**
   * Display title.
   */
  title: string;

  /**
   * Current applicant progress/review status for the section.
   */
  status: RecruitmentApplicationSectionStatus;
}

/**
 * -----------------------------------------------------------------------------
 * Application Phase
 *
 * Contains only lightweight section summaries.
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentApplicationPhase {
  id: string;

  title: string;

  description?: string | null;

  order: number;

  status: RecruitmentApplicationPhaseStatus;

  sections: RecruitmentApplicationSectionSummary[];
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment Applicant Application
 *
 * Lightweight application information returned when the manager opens an
 * applicant.
 *
 * Detailed section information is deliberately excluded.
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentApplicantApplication {
  id: string;

  currentPhase: {
    id: string;

    title: string;

    description?: string | null;

    order: number;
  } | null;

  currentSection: {
    id: string;

    title: string;
  } | null;

  progress: number;

  submittedAt: string | null;

  createdAt?: string;

  updatedAt?: string;

  phases: RecruitmentApplicationPhase[];
}

export interface RecruitmentRepeatableSectionEntry {
  /**
   * Unique identifier for this submitted entry.
   */
  id: string;

  /**
   * Values belonging to this repeatable entry.
   *
   * Keys correspond to ApplicationField.name.
   */
  values: Record<string, unknown>;
}

/**
 * -----------------------------------------------------------------------------
 * Section Comment
 *
 * A section can have multiple comments throughout its review lifecycle.
 *
 * Comments are not stored directly on the section as one text value.
 * -----------------------------------------------------------------------------
 */

export interface RecruitmentSectionComment {
  id: string;

  comment: string;

  createdBy: {
    id: string;
    name: string;
  };

  createdAt: string;
}

/**
 * -----------------------------------------------------------------------------
 * Detailed Recruitment Application Section
 *
 * Returned only when the manager selects a particular section.
 *
 * Endpoint:
 *
 * GET /recruitment/applicants/:id/sections/:sectionId
 * -----------------------------------------------------------------------------
 */
export interface RecruitmentApplicationSectionDetails {
  id: string;

  phaseId: string;

  title: string;

  description?: string;

  order: number;

  status: RecruitmentApplicationSectionStatus;

  repeatable: boolean;

  minItems?: number;

  maxItems?: number;

  fields: ApplicationField[];

  values: Record<string, unknown> | Record<string, unknown>[];

  review: {
    comments: RecruitmentSectionComment[];
  };
}

/**
 * -----------------------------------------------------------------------------
 * Recruitment Section Comment
 * -----------------------------------------------------------------------------
 */
export interface RecruitmentSectionComment {
  id: string;

  comment: string;

  createdBy: {
    id: string;

    name: string;
  };

  createdAt: string;
}

/**
 * -----------------------------------------------------------------------------
 * Repeatable Section Entry
 * -----------------------------------------------------------------------------
 */
export interface RecruitmentRepeatableSectionEntry {
  id: string;

  values: Record<string, unknown>;
}
