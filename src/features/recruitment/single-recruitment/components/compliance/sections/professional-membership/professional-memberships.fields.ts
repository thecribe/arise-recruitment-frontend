/**
 * -----------------------------------------------------------------------------
 * File: professional-memberships.fields.ts
 *
 * Description:
 *
 * Applicant fields for the Professional Memberships compliance section.
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
 * Professional Membership fields.
 * -----------------------------------------------------------------------------
 */

export const professionalMembershipFields: FormField[] = [
  {
    id: "professional-body-type",
    name: "professionalBodyType",
    type: FIELD_TYPES.TEXT,
    label: "Professional Body/Type",
    placeholder: "Enter professional body or membership type",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 1,
  },

  {
    id: "professional-membership-pin",
    name: "pin",
    type: FIELD_TYPES.TEXT,
    label: "PIN",
    placeholder: "Enter PIN",
    required: false,
    width: FIELD_WIDTH.HALF,
    order: 2,
  },

  {
    id: "professional-membership-renewal-date",
    name: "renewalDate",
    type: FIELD_TYPES.DATE,
    label: "Renewal Date",
    required: false,
    width: FIELD_WIDTH.HALF,
    order: 3,
  },

  {
    id: "professional-membership-card",
    name: "membershipCard",
    type: FIELD_TYPES.UPLOAD,
    label: "Upload your membership card",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 4,
  },
];
