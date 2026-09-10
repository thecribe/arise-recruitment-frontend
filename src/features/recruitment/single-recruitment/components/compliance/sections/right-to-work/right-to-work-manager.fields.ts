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
];
