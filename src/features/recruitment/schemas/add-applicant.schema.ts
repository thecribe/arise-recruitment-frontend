import { applicantDetailsSchema } from "@/features/auth/schemas/register.schema.ts";
import type z from "zod";

export const addApplicantSchema = applicantDetailsSchema;

export type AddApplicantFormValues = z.infer<typeof addApplicantSchema>;
