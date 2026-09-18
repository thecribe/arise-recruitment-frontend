import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

export const trainingCertificateRequirementFields: FormField[] = [
  {
    id: "training-certificate-requirement-name",
    name: "name",
    type: FIELD_TYPES.TEXT,
    label: "Certificate Name",
    placeholder: "e.g. Basic Life Support",
    required: true,
    width: FIELD_WIDTH.FULL,
    order: 1,
  },
  {
    id: "training-certificate-requirement-description",
    name: "description",
    type: FIELD_TYPES.TEXTAREA,
    label: "Description",
    placeholder: "Describe the certificate requirement",
    helpText:
      "Provide any additional information applicants should know about this certificate.",
    rows: 4,
    width: FIELD_WIDTH.FULL,
    order: 2,
  },
];
