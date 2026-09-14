/**
 * ---------------------------------------------------------------------------
 * Reference Types
 * ---------------------------------------------------------------------------
 *
 * Types used by the References feature.
 *
 * The reference workflow is separate from the ComplianceSectionProvider.
 *
 * Manager and applicant reference views should use these shared domain types,
 * while their UI components remain separated.
 *
 * ---------------------------------------------------------------------------
 */

/**
 * ---------------------------------------------------------------------------
 * Reference Status
 * ---------------------------------------------------------------------------
 *
 * Represents the recruitment manager's decision/workflow state for a
 * particular reference.
 *
 * This is separate from ReferenceMailStatus.
 */
export type ReferenceStatus =
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

/**
 * ---------------------------------------------------------------------------
 * Reference Mail Status
 * ---------------------------------------------------------------------------
 *
 * Represents the lifecycle of the reference request email.
 *
 * This must NOT be used for manager approval/rejection.
 */
export type ReferenceMailStatus =
  | "Not sent"
  | "Pending"
  | "Received"
  | "Refused";

/**
 * ---------------------------------------------------------------------------
 * Reference Rating
 * ---------------------------------------------------------------------------
 *
 * Rating options used by the reference form.
 */
export type ReferenceRating =
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Satisfactory";

/**
 * ---------------------------------------------------------------------------
 * Reference
 * ---------------------------------------------------------------------------
 *
 * Represents a reference supplied for an applicant.
 *
 * This contains the reference details but not the full reference response.
 */
export interface Reference {
  id: string;

  applicationId?: string;

  companyName: string | null;

  fromDate: string | null;
  toDate: string | null;

  refereeName: string | null;
  refereeEmail: string | null;
  refereePhone: string | null;
  refereeRelationship: string | null;

  status: ReferenceStatus;

  mailStatus: ReferenceMailStatus;

  /**
   * Indicates whether a response exists for this reference.
   *
   * The actual response should be fetched separately when required.
   */
  hasResponse: boolean;

  createdAt?: string;
  updatedAt?: string;
}

/**
 * ---------------------------------------------------------------------------
 * Manager Reference
 * ---------------------------------------------------------------------------
 *
 * Manager-facing reference representation.
 */
export type ManagerReference = Reference;

/**
 * ---------------------------------------------------------------------------
 * Applicant Reference
 * ---------------------------------------------------------------------------
 *
 * Applicant-facing reference representation.
 */
export type ApplicantReference = Reference;

/**
 * ---------------------------------------------------------------------------
 * Reference List Response
 * ---------------------------------------------------------------------------
 */

export type ManagerReferencesResponse = ManagerReference[];

/**
 * ---------------------------------------------------------------------------
 * Reference Form Values
 * ---------------------------------------------------------------------------
 *
 * Fields used when creating/editing the reference itself.
 *
 * Candidate name and candidate job title are intentionally not included here.
 * Those values come from the applicant/application.
 */
export interface ReferenceFormValues {
  companyName: string;

  fromDate: string;
  toDate: string;

  refereeName: string;
  refereeEmail: string;
  refereePhone: string;
  refereeRelationship: string;
}

/**
 * ---------------------------------------------------------------------------
 * Reference Rating Values
 * ---------------------------------------------------------------------------
 *
 * Rating criteria taken from the supplied Arise Nursing reference form.
 *
 * The form contains:
 *
 * - Suitability to Role
 * - Knowledge
 * - Ability to work under pressure
 * - Interpersonal Skills
 * - Time-keeping
 * - Consultation skills (e.g. patient feedback)
 * - Co-operation with other staff
 * - Presentation
 * - Trustworthiness
 * - Reliability
 * - Computer Skills
 */
export interface ReferenceRatings {
  suitabilityToRole: ReferenceRating;

  knowledge: ReferenceRating;

  abilityToWorkUnderPressure: ReferenceRating;

  interpersonalSkills: ReferenceRating;

  timeKeeping: ReferenceRating;

  consultationSkills: ReferenceRating;

  cooperationWithOtherStaff: ReferenceRating;

  presentation: ReferenceRating;

  trustworthiness: ReferenceRating;

  reliability: ReferenceRating;

  computerSkills: ReferenceRating;
}

/**
 * ---------------------------------------------------------------------------
 * Reference Signature
 * ---------------------------------------------------------------------------
 *
 * Structured representation of the uploaded referee signature.
 *
 * The exact storage shape can be adjusted to the backend upload response.
 */
export interface ReferenceSignature {
  url?: string;

  name?: string;

  type?: string;

  size?: number;

  [key: string]: unknown;
}

/**
 * ---------------------------------------------------------------------------
 * Reference Response
 * ---------------------------------------------------------------------------
 *
 * Represents the completed reference questionnaire.
 */
export interface ReferenceResponse {
  id: number;

  referenceId: string;

  /**
   * Would you re-employ?
   */
  reEmploy: "Yes" | "No";

  /**
   * Skill / rating responses.
   */
  ratings: ReferenceRatings;

  /**
   * Detailed reference / additional comments.
   */
  detailReference: string | null;

  /**
   * Print Name and Surname.
   */
  refererName: string | null;

  /**
   * Uploaded referee signature.
   */
  refererSignature: ReferenceSignature | null;

  /**
   * Date on which the referee signed the reference.
   */
  signatureDate: string | null;

  createdAt: string;

  updatedAt: string;
}

/**
 * ---------------------------------------------------------------------------
 * Reference Response Form Values
 * ---------------------------------------------------------------------------
 *
 * React Hook Form values used when completing the reference response.
 */
export interface ReferenceResponseFormValues {
  reEmploy: "Yes" | "No";

  suitabilityToRole: ReferenceRating;
  knowledge: ReferenceRating;
  abilityToWorkUnderPressure: ReferenceRating;
  interpersonalSkills: ReferenceRating;
  timeKeeping: ReferenceRating;
  consultationSkills: ReferenceRating;
  cooperationWithOtherStaff: ReferenceRating;
  presentation: ReferenceRating;
  trustworthiness: ReferenceRating;
  reliability: ReferenceRating;
  computerSkills: ReferenceRating;

  detailReference: string;
  refererName: string;
  refererSignature: unknown;
  signatureDate: string;
}

/**
 * ---------------------------------------------------------------------------
 * Manager Reference Action
 * ---------------------------------------------------------------------------
 *
 * Actions available from the manager reference table.
 */
export type ManagerReferenceAction =
  | "view"
  | "edit"
  | "view_response"
  | "fill_response"
  | "send"
  | "review"
  | "create";

/**
 * ---------------------------------------------------------------------------
 * Reference Action Handler
 * ---------------------------------------------------------------------------
 *
 * Useful for strongly typing the action callback used by the action dropdown.
 */
export type ManagerReferenceActionHandler = (
  action: ManagerReferenceAction,
  reference: ManagerReference,
) => void;

export interface ReferenceResponseApiPayload {
  reEmploy: "Yes" | "No";

  ratings: Record<string, unknown>;

  detailReference: string;

  refererName: string;

  refererSignature: unknown;

  signatureDate: string;
}
