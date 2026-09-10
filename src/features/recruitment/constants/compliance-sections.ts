/**
 * -----------------------------------------------------------------------------
 * File: compliance-sections.ts
 *
 * Description:
 * Configuration for Recruitment Applicant Compliance sections.
 * -----------------------------------------------------------------------------
 */

import type { ComplianceSection } from "../types/compliance.types";

export const complianceSections: ComplianceSection[] = [
  {
    id: "identity-compliance",
    label: "Identity Compliance",
    description: "Review and manage the applicant's Identity verification.",
  },
  {
    id: "right-to-work",
    label: "Right to Work",
    description:
      "Review and manage the applicant's right to work verification.",
  },
  {
    id: "dbs",
    label: "DBS Update Check",
    description: "Review and manage the applicant's DBS update verification.",
  },
  {
    id: "professional-memberships",
    label: "Professional Memberships",
    description:
      "Review and manage the applicant's Professional Membership verification.",
  },
  {
    id: "references",
    label: "References",
    description: "Review and manage applicant references.",
  },
  {
    id: "certificates",
    label: "Training Certificates",
    description: "Review mandatory and additional applicant certificates.",
  },
];
