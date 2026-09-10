import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

export const rightToWorkManagerFields: FormField[] = [
  {
    id: "right-to-work-update-check",
    name: "rightToWorkUpdateCheck",
    type: FIELD_TYPES.UPLOAD,
    label: "Upload Right to Work Update Check",
    required: false,
    width: FIELD_WIDTH.FULL,
    order: 1,

    file: {
      accept: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
      maxSizeMB: 10,
      multiple: true,
    },
  },
  {
    id: "check-date",
    name: "checkDate",
    type: FIELD_TYPES.DATE,
    label: "Date of Right to Work Check",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 2,
  },
  {
    id: "rtw-expiry-date",
    name: "rightToWorkExpiryDate",
    type: FIELD_TYPES.DATE,
    label: "Right to Work Expiry Date",
    required: true,
    width: FIELD_WIDTH.HALF,
    order: 3,
  },
];
