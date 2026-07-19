/**
 * -----------------------------------------------------------------------------
 * File: login.schema.ts
 * Description:
 * Validation schema for the login form.
 *
 * Responsibilities:
 * - Validate email.
 * - Validate password.
 * - Infer the form value type.
 * -----------------------------------------------------------------------------
 */

import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),

  password: z.string().min(1, "Password is required."),

  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
