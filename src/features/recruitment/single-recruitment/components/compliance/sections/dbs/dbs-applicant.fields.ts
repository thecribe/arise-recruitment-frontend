/**
 * -----------------------------------------------------------------------------
 * File: dbs-applicant.fields.ts
 *
 * Description:
 *
 * Applicant fields for the DBS Update Check compliance section.
 *
 * -----------------------------------------------------------------------------
 */

import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

/**
 * -----------------------------------------------------------------------------
 * DBS applicant fields.
 * -----------------------------------------------------------------------------
 */

export const dbsApplicantFields: FormField[] = [
  {
    id: "dbs-disclosure-number",
    name: "disclosureNumber",
    type: FIELD_TYPES.TEXT,
    label: "Disclosure Number",
    placeholder: "Enter your DBS disclosure number",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 1,
  },

  {
    id: "dbs-issue-date",
    name: "issueDate",
    type: FIELD_TYPES.DATE,
    label: "Issue Date",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 2,
  },

  {
    id: "dbs-clear",
    name: "clear",
    type: FIELD_TYPES.RADIO,
    label: "Is the DBS certificate clear?",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 3,
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },

  {
    id: "dbs-updated-service",
    name: "registeredWithUpdatedService",
    type: FIELD_TYPES.RADIO,
    label: "Is this certificate registered with the updated service?",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 4,
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },

  {
    id: "current-dbs-disclosure",
    name: "currentDbsDisclosure",
    type: FIELD_TYPES.UPLOAD,
    label: "Upload your Current DBS Disclosure",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 5,
  },
];
