import { z } from "zod";

export const roleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Role name must contain at least 2 characters.")
    .max(100, "Role name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .default(""),

  permissionIds: z
    .array(z.string().uuid("Invalid permission selected."))
    .default([]),
});

export type RoleFormInput = z.input<typeof roleSchema>;
export type RoleFormValues = z.output<typeof roleSchema>;
