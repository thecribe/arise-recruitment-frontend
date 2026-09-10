import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

/**
 * -----------------------------------------------------------------------------
 * Applicant Identity Compliance fields.
 *
 * These fields contain the identity information and supporting documents
 * submitted by the applicant for compliance verification.
 * -----------------------------------------------------------------------------
 */

export const identityComplianceApplicantFields: FormField[] = [
  {
    id: "proof-of-address",
    name: "proofOfAddress",
    type: FIELD_TYPES.UPLOAD,
    label: "Proof of Address",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 1,
    file: { multiple: true },
  },

  {
    id: "national-insurance-number",
    name: "nationalInsuranceNumber",
    type: FIELD_TYPES.TEXT,
    label: "National Insurance Number",
    placeholder: "Enter your National Insurance number",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 2,
  },

  {
    id: "proof-of-national-insurance-number",
    name: "proofOfNationalInsuranceNumber",
    type: FIELD_TYPES.UPLOAD,
    label: "Upload Proof of National Insurance Number",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 3,
    file: { multiple: true },
  },

  {
    id: "passport-size-photo",
    name: "passportSizePhoto",
    type: FIELD_TYPES.UPLOAD,
    label: "Passport Size Photo",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 4,
    file: { multiple: true },
  },

  {
    id: "birth-certificate",
    name: "birthCertificate",
    type: FIELD_TYPES.UPLOAD,
    label: "Birth Certificate",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 5,
    file: { multiple: true },
  },
];
