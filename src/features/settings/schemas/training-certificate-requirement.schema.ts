import { z } from "zod";

export const trainingCertificateRequirementSchema = z.object({
  name: z.string().trim().min(1, "Certificate name is required"),

  description: z.string().trim(),
});

export type TrainingCertificateRequirementSchemaValues = z.infer<
  typeof trainingCertificateRequirementSchema
>;
