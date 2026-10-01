import { z } from "zod";

export const profileSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  phone_number: z.string().trim().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
  postcode: z.string().trim().min(1, "Postcode is required"),
  profile_img: z.union([z.instanceof(File), z.string(), z.null()]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const updateEmailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters"),
    confirmPassword: z.string().min(1, "Please confirm the password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
