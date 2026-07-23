export const FIELD_TYPES = {
  TEXT: "text",
  PASSWORD: "password",

  EMAIL: "email",
  PHONE: "tel",
  NUMBER: "number",
  DATE: "date",
  TEXTAREA: "textarea",
// SWITCH, "switch",
  SELECT: "select",
  MULTISELECT: "multiselect",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  SIGNATURE: "signature",
  UPLOAD: "file",
} as const;

export type FieldType = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];
