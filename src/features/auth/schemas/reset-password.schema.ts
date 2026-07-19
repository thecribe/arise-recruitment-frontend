/**
 * -----------------------------------------------------------------------------
 * File: reset-password.schema.ts
 * Description:
 * Validation schema for resetting password.
 * -----------------------------------------------------------------------------
 */

import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must contain at least 8 characters"),

    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
