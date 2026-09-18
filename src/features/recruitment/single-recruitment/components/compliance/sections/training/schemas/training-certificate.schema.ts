import { z } from "zod";

export const trainingCertificateSchema = z
  .object({
    certificateName: z.string().trim(),
    certificateNumber: z.string().trim(),
    issueDate: z.string(),
    expiryDate: z.string(),
    document: z.unknown(),
  })
  .refine(
    (data) => {
      if (!data.issueDate || !data.expiryDate) {
        return true;
      }

      return new Date(data.issueDate) <= new Date(data.expiryDate);
    },
    {
      message: "Expiry date must be after the issue date.",
      path: ["expiryDate"],
    },
  );

export type TrainingCertificateSchemaValues = z.infer<
  typeof trainingCertificateSchema
>;
