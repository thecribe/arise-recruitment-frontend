import { z } from "zod";

const optionalText = z.string().trim().optional().default("");

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine(
    (value) => value === "" || z.email().safeParse(value).success,
    "Enter a valid email address.",
  );

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine((value) => {
    if (!value) return true;

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Enter a valid website URL beginning with http:// or https://.");

export const generalSettingsSchema = z.object({
  organisation_name: z
    .string()
    .trim()
    .min(1, "Organisation name is required.")
    .max(255),
  site_name: z.string().trim().min(1, "Site name is required.").max(255),
  description: optionalText,
  website_url: optionalUrl,
  organisation_email: z
    .string()
    .trim()
    .min(1, "Organisation email is required.")
    .email("Enter a valid email address."),
  recruitment_email: optionalEmail,
  telephone: optionalText,
  address: optionalText,
  country: optionalText,
  postcode: optionalText,
  logo: z.unknown().nullable().optional(),
  favicon: z.unknown().nullable().optional(),
});

export type GeneralSettingsSchemaValues = z.infer<typeof generalSettingsSchema>;
