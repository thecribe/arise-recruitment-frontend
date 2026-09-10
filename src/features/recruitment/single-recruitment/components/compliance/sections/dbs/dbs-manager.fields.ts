/**
 * -----------------------------------------------------------------------------
 * File: dbs-manager.fields.ts
 *
 * Description:
 *
 * Manager fields for the DBS Update Check compliance section.
 *
 * These fields are completed by the Recruitment Manager after reviewing the
 * applicant's DBS information.
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
 * DBS manager fields.
 * -----------------------------------------------------------------------------
 */

export const dbsManagerFields: FormField[] = [
  {
    id: "dbs-update-check",
    name: "dbsUpdateCheck",
    type: FIELD_TYPES.UPLOAD,
    label: "Upload DBS Update Check",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 1,
  },

  {
    id: "dbs-expiry-date",
    name: "expiryDate",
    type: FIELD_TYPES.DATE,
    label: "Expiry Date",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 2,
  },
];
