/**
 * -----------------------------------------------------------------------------
 * File: register.schema.ts
 * Description:
 * Validation schema for applicant registration.
 * -----------------------------------------------------------------------------
 */

import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  email: z.string().email("Please enter a valid email address"),

  phoneNumber: z.string().min(10, "Please enter a valid phone number"),

  address: z.string().min(5, "Address is required"),

  postcode: z.string().min(3, "Postcode is required"),

  jobTypeId: z.string().min(1, "Please select a job type"),
  // jobTypeId: z.string().min(1, "Please select a job type"),

  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

export type RegisterFormValues = z.infer<typeof registerSchema>;
