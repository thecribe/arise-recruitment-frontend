import { z } from "zod";

const ratingSchema = z.enum(["Excellent", "Very Good", "Good", "Satisfactory"]);

export const referenceResponseSchema = z.object({
  reEmploy: z.enum(["Yes", "No"], {
    message: "Please select whether you would re-employ the candidate",
  }),

  suitabilityToRole: ratingSchema,
  knowledge: ratingSchema,
  abilityToWorkUnderPressure: ratingSchema,
  interpersonalSkills: ratingSchema,
  timeKeeping: ratingSchema,
  consultationSkills: ratingSchema,
  cooperationWithOtherStaff: ratingSchema,
  presentation: ratingSchema,
  trustworthiness: ratingSchema,
  reliability: ratingSchema,
  computerSkills: ratingSchema,

  detailReference: z.string().trim().min(1, "Detailed reference is required"),

  refererName: z.string().trim().min(1, "Print name and surname is required"),

  refererSignature: z.unknown().nullable(),

  signatureDate: z.string().min(1, "Signature date is required"),
});

export type ReferenceResponseSchemaValues = z.infer<
  typeof referenceResponseSchema
>;
