import type { FormField } from "@/components/forms/types/field";
import { dbsApplicantFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/dbs/dbs-applicant.fields";
import { identityComplianceApplicantFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/identity-compliance/identity-compliance-applicant.fields";
import { professionalMembershipFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/professional-membership/professional-memberships.fields";
import { rightToWorkApplicantFields } from "@/features/recruitment/single-recruitment/components/compliance/sections/right-to-work/right-to-work-applicant.fields";

export const APPLICANT_COMPLIANCE_SECTIONS = [
  {
    key: "right-to-work",
    title: "Right to Work",
    description:
      "Provide the information and documents required to verify your right to work.",
  },
  {
    key: "dbs",
    title: "DBS Check",
    description: "Complete the information required for your DBS verification.",
  },
  {
    key: "professional-memberships",
    title: "Professional Memberships",
    description:
      "Provide your relevant professional registration and membership details.",
  },
  {
    key: "identity-compliance",
    title: "Identity Compliance",
    description: "Provide the required information for identity verification.",
  },
] as const;

export type ApplicantComplianceSectionKey =
  (typeof APPLICANT_COMPLIANCE_SECTIONS)[number]["key"];

/**
 * Field definitions for each applicant compliance section.
 *
 * Replace the empty arrays with the actual FormField definitions.
 */
const COMPLIANCE_FIELDS: Record<ApplicantComplianceSectionKey, FormField[]> = {
  "right-to-work": rightToWorkApplicantFields,

  dbs: dbsApplicantFields,

  "professional-memberships": professionalMembershipFields,

  "identity-compliance": identityComplianceApplicantFields,
};

/**
 * Retrieve fields for a compliance section.
 */
export const getApplicantComplianceFields = (
  sectionId: ApplicantComplianceSectionKey,
): FormField[] => {
  return COMPLIANCE_FIELDS[sectionId] ?? [];
};
