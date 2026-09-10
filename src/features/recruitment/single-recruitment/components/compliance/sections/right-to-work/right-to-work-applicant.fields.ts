import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

/**
 * -----------------------------------------------------------------------------
 * Right to Work status values.
 *
 * These values are used both by the select options and the visibility rules.
 * -----------------------------------------------------------------------------
 */

const RIGHT_TO_WORK_STATUS = {
  EU_CITIZEN_VISA: "eu_citizen_visa",
  SPOUSE_OF_EU_CITIZEN_VISA: "spouse_of_eu_citizen_visa",
  WORK_PERMIT: "work_permit",
  PERMIT_FREE_VISA: "permit_free_visa",
  RIGHT_OF_ABODE_UK: "right_of_abode_uk",
  DOCTOR_PRIOR_TO_1985: "doctor_prior_to_1985",
  STUDENT_VISA: "student_visa",
  BIOMETRIC_CARD: "biometric_card",
  BRITISH_PASSPORT: "british_passport",
  DEPENDENT_VISA: "dependent_visa",
  INDEFINITE_LEAVE_TO_REMAIN: "indefinite_leave_to_remain",
  LIMITED_LEAVE: "limited_leave",
  POST_STUDY_WORK_VISA: "post_study_work_visa",
  STUDENT_VISA_TERM_LETTER: "student_visa_term_letter",
  US_PASSPORT: "us_passport",
} as const;

/**
 * -----------------------------------------------------------------------------
 * Statuses that require Passport / VISA / BRP details.
 *
 * IMPORTANT:
 *
 * This list should represent the exact statuses that require the two
 * conditional fields.
 * -----------------------------------------------------------------------------
 */

const DOCUMENT_DETAIL_STATUSES = [
  RIGHT_TO_WORK_STATUS.EU_CITIZEN_VISA,
  RIGHT_TO_WORK_STATUS.SPOUSE_OF_EU_CITIZEN_VISA,
  RIGHT_TO_WORK_STATUS.PERMIT_FREE_VISA,
  RIGHT_TO_WORK_STATUS.STUDENT_VISA,
  RIGHT_TO_WORK_STATUS.BIOMETRIC_CARD,
  RIGHT_TO_WORK_STATUS.BRITISH_PASSPORT,
  RIGHT_TO_WORK_STATUS.DEPENDENT_VISA,
  RIGHT_TO_WORK_STATUS.POST_STUDY_WORK_VISA,
  RIGHT_TO_WORK_STATUS.STUDENT_VISA_TERM_LETTER,
  RIGHT_TO_WORK_STATUS.US_PASSPORT,
];

/**
 * -----------------------------------------------------------------------------
 * Applicant Right to Work fields.
 * -----------------------------------------------------------------------------
 */

export const rightToWorkApplicantFields: FormField[] = [
  {
    id: "right-to-work-status",
    name: "rightToWorkStatus",
    type: FIELD_TYPES.SELECT,
    label: "Your entitlement for working in the UK is based upon what status?",
    placeholder: "Select your status",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 1,

    options: [
      {
        label: "EU Citizen (Visa)",
        value: RIGHT_TO_WORK_STATUS.EU_CITIZEN_VISA,
      },
      {
        label: "Spouse of an EU Citizen (Visa)",
        value: RIGHT_TO_WORK_STATUS.SPOUSE_OF_EU_CITIZEN_VISA,
      },
      {
        label: "Work Permit",
        value: RIGHT_TO_WORK_STATUS.WORK_PERMIT,
      },
      {
        label: "Permit-free Visa",
        value: RIGHT_TO_WORK_STATUS.PERMIT_FREE_VISA,
      },
      {
        label: "Right of Abode in the UK",
        value: RIGHT_TO_WORK_STATUS.RIGHT_OF_ABODE_UK,
      },
      {
        label: "Admitted to UK as Doctor Prior to 1985",
        value: RIGHT_TO_WORK_STATUS.DOCTOR_PRIOR_TO_1985,
      },
      {
        label: "Student Visa",
        value: RIGHT_TO_WORK_STATUS.STUDENT_VISA,
      },
      {
        label: "Biometric Card",
        value: RIGHT_TO_WORK_STATUS.BIOMETRIC_CARD,
      },
      {
        label: "British Passport",
        value: RIGHT_TO_WORK_STATUS.BRITISH_PASSPORT,
      },
      {
        label: "Dependent Visa",
        value: RIGHT_TO_WORK_STATUS.DEPENDENT_VISA,
      },
      {
        label: "Indefinite Leave to Remain",
        value: RIGHT_TO_WORK_STATUS.INDEFINITE_LEAVE_TO_REMAIN,
      },
      {
        label: "Limited Leave",
        value: RIGHT_TO_WORK_STATUS.LIMITED_LEAVE,
      },
      {
        label: "Post Study Work Visa (PSW)",
        value: RIGHT_TO_WORK_STATUS.POST_STUDY_WORK_VISA,
      },
      {
        label: "Student Visa (with Term Letter)",
        value: RIGHT_TO_WORK_STATUS.STUDENT_VISA_TERM_LETTER,
      },
      {
        label: "US Passport",
        value: RIGHT_TO_WORK_STATUS.US_PASSPORT,
      },
    ],
  },

  {
    id: "passport-visa-brp-number",
    name: "passportVisaBrpNumber",
    type: FIELD_TYPES.TEXT,
    label: "Passport/VISA/BRP Number",
    placeholder: "Enter passport, visa or BRP number",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 2,

    visibleWhen: {
      rules: [
        {
          field: "rightToWorkStatus",
          operator: "in",
          value: DOCUMENT_DETAIL_STATUSES,
        },
      ],
    },
  },

  {
    id: "passport-visa-brp-expiry-date",
    name: "passportVisaBrpExpiryDate",
    type: FIELD_TYPES.DATE,
    label: "Passport/VISA/BRP/RTW Expiry Date",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 3,

    visibleWhen: {
      rules: [
        {
          field: "rightToWorkStatus",
          operator: "in",
          value: DOCUMENT_DETAIL_STATUSES,
        },
      ],
    },
  },

  {
    id: "share-code",
    name: "shareCode",
    type: FIELD_TYPES.TEXT,
    label: "Share Code",
    placeholder: "Enter share code",
    required: false,
    width: FIELD_WIDTH.FULL,
    order: 4,
  },
];
