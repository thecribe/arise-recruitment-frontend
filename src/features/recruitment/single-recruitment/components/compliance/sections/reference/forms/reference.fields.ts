/**
 * -----------------------------------------------------------------------------
 * File: reference.fields.ts
 *
 * Description:
 *
 * Fields for creating and editing an applicant reference.
 *
 * These fields represent the reference details itself and do not contain
 * the referee's completed reference response.
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
 * Reference fields
 * -----------------------------------------------------------------------------
 */

export const referenceFields: FormField[] = [
  {
    id: "reference-company-name",
    name: "companyName",
    type: FIELD_TYPES.TEXT,
    label: "Name of Organisation",
    placeholder: "Enter the organisation name",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 1,
  },

  {
    id: "reference-from-date",
    name: "fromDate",
    type: FIELD_TYPES.DATE,
    label: "Dates Worked From",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 2,
  },

  {
    id: "reference-to-date",
    name: "toDate",
    type: FIELD_TYPES.DATE,
    label: "Dates Worked To",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 3,
  },

  {
    id: "reference-referee-name",
    name: "refereeName",
    type: FIELD_TYPES.TEXT,
    label: "Referee Name and Surname",
    placeholder: "Enter referee's full name",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 4,
  },

  {
    id: "reference-referee-relationship",
    name: "refereeRelationship",
    type: FIELD_TYPES.TEXT,
    label: "Referee Relationship",
    placeholder: "e.g. Line Manager, Supervisor",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 5,
  },

  {
    id: "reference-referee-email",
    name: "refereeEmail",
    type: FIELD_TYPES.EMAIL,
    label: "Referee Email Address",
    placeholder: "Enter referee's professional email",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 6,
    helpText: "Please provide the referee's professional email address.",
  },

  {
    id: "reference-referee-phone",
    name: "refereePhone",
    type: FIELD_TYPES.PHONE,
    label: "Referee Phone Number",
    placeholder: "Enter referee's phone number",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 7,
  },
];
