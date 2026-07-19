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

  jobType: z.string().min(1, "Please select a job type"),

  // password: z.string().min(8, "Password must contain at least 8 characters"),

  // confirmPassword: z.string().min(8, "Please confirm your password"),

  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

export type RegisterFormValues = z.infer<typeof registerSchema>;
