import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

interface TrainingCertificateFieldsOptions {
  includeCertificateName?: boolean;
}

export const getTrainingCertificateFields = ({
  includeCertificateName = false,
}: TrainingCertificateFieldsOptions = {}): FormField[] => {
  const fields: FormField[] = [];

  if (includeCertificateName) {
    fields.push({
      id: "training-certificate-name",
      name: "certificateName",
      type: FIELD_TYPES.TEXT,
      label: "Certificate Name",
      placeholder: "Enter certificate name",
      required: true,
      width: FIELD_WIDTH.FULL,
      order: 1,
    });
  }

  fields.push(
    {
      id: "training-certificate-number",
      name: "certificateNumber",
      type: FIELD_TYPES.TEXT,
      label: "Certificate Number",
      placeholder: "Enter certificate number",
      width: FIELD_WIDTH.HALF,
      order: 2,
    },
    {
      id: "training-certificate-issue-date",
      name: "issueDate",
      type: FIELD_TYPES.DATE,
      label: "Issue Date",
      width: FIELD_WIDTH.HALF,
      order: 3,
    },
    {
      id: "training-certificate-expiry-date",
      name: "expiryDate",
      type: FIELD_TYPES.DATE,
      label: "Expiry Date",
      helpText: "Leave blank if the certificate does not expire.",
      width: FIELD_WIDTH.HALF,
      order: 4,
    },
    {
      id: "training-certificate-document",
      name: "document",
      type: FIELD_TYPES.UPLOAD,
      label: "Certificate Document",
      helpText: "Upload a copy of the training certificate.",
      required: true,
      width: FIELD_WIDTH.FULL,
      order: 5,
      file: {
        accept: ["application/pdf", "image/jpeg", "image/png"],
        maxSizeMB: 10,
        multiple: false,
      },
    },
  );

  return fields;
};
