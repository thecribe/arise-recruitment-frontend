import { z } from "zod";

export const referenceSchema = z
  .object({
    companyName: z.string().trim().min(1, "Organisation name is required"),

    fromDate: z.string().min(1, "Start date is required"),

    toDate: z.string().min(1, "End date is required"),

    refereeName: z.string().trim().min(1, "Referee name is required"),

    refereeEmail: z
      .string()
      .trim()
      .email("Enter a valid referee email address"),

    refereePhone: z.string().trim().min(1, "Referee phone number is required"),

    refereeRelationship: z
      .string()
      .trim()
      .min(1, "Referee relationship is required"),
  })
  .refine(
    (data) => {
      if (!data.fromDate || !data.toDate) return true;

      return new Date(data.fromDate) <= new Date(data.toDate);
    },
    {
      message: "End date must be after the start date",
      path: ["toDate"],
    },
  );

export type ReferenceSchemaValues = z.infer<typeof referenceSchema>;
