/**
 * -----------------------------------------------------------------------------
 * File: reference-response.fields.ts
 *
 * Description:
 *
 * Fields for completing an Arise Nursing worker reference response.
 *
 * These fields are shared by:
 *
 * - Referee response
 * - Manager completing a reference on behalf of the referee
 *
 * -----------------------------------------------------------------------------
 */

import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
  type FormFieldOption,
} from "@/components/forms/types/field";

/**
 * -----------------------------------------------------------------------------
 * Rating options
 * -----------------------------------------------------------------------------
 */

const ratingOptions: FormFieldOption[] = [
  {
    label: "Excellent",
    value: "Excellent",
  },
  {
    label: "Very Good",
    value: "Very Good",
  },
  {
    label: "Good",
    value: "Good",
  },
  {
    label: "Satisfactory",
    value: "Satisfactory",
  },
];

export const referenceResponseFields: FormField[] = [
  {
    id: "reference-re-employ",
    name: "reEmploy",
    type: FIELD_TYPES.RADIO,
    label: "Would you re-employ this candidate?",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 1,
    options: [
      {
        label: "Yes",
        value: "Yes",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },

  {
    id: "reference-rating-suitability",
    name: "suitabilityToRole",
    type: FIELD_TYPES.RADIO,
    label: "Suitability to Role",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 2,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-knowledge",
    name: "knowledge",
    type: FIELD_TYPES.RADIO,
    label: "Knowledge",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 3,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-pressure",
    name: "abilityToWorkUnderPressure",
    type: FIELD_TYPES.RADIO,
    label: "Ability to Work Under Pressure",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 4,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-interpersonal",
    name: "interpersonalSkills",
    type: FIELD_TYPES.RADIO,
    label: "Interpersonal Skills",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 5,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-timekeeping",
    name: "timeKeeping",
    type: FIELD_TYPES.RADIO,
    label: "Time-keeping",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 6,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-consultation",
    name: "consultationSkills",
    type: FIELD_TYPES.RADIO,
    label: "Consultation Skills",
    helpText: "For example, patient feedback.",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 7,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-cooperation",
    name: "cooperationWithOtherStaff",
    type: FIELD_TYPES.RADIO,
    label: "Co-operation with Other Staff",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 8,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-presentation",
    name: "presentation",
    type: FIELD_TYPES.RADIO,
    label: "Presentation",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 9,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-trustworthiness",
    name: "trustworthiness",
    type: FIELD_TYPES.RADIO,
    label: "Trustworthiness",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 10,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-reliability",
    name: "reliability",
    type: FIELD_TYPES.RADIO,
    label: "Reliability",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 11,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-rating-computer",
    name: "computerSkills",
    type: FIELD_TYPES.RADIO,
    label: "Computer Skills",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 12,
    options: ratingOptions,
    metadata: {
      group: "ratings",
    },
  },

  {
    id: "reference-detail",
    name: "detailReference",
    type: FIELD_TYPES.TEXTAREA,
    label: "Detailed Reference / Additional Comments",
    placeholder: "Enter any additional comments about the candidate...",
    required: true,
    width: FIELD_WIDTH.FULL,
    rows: 6,
    order: 13,
  },

  {
    id: "reference-referer-name",
    name: "refererName",
    type: FIELD_TYPES.TEXT,
    label: "Print Name and Surname",
    placeholder: "Enter your full name",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 14,
  },

  {
    id: "reference-referer-signature",
    name: "refererSignature",
    type: FIELD_TYPES.SIGNATURE,
    label: "Signature",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 15,
  },

  {
    id: "reference-signature-date",
    name: "signatureDate",
    type: FIELD_TYPES.DATE,
    label: "Date",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 16,
  },
];
