import { z } from "zod";

const userDetailsSchema = {
  first_name: z.string().trim().min(1, "First name is required."),
  last_name: z.string().trim().min(1, "Last name is required."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  phone_number: z.string(),
  address: z.string(),
  postcode: z.string(),
};

export const userCreateSchema = z.object({
  ...userDetailsSchema,
  password: z.string().min(8, "Password must be at least 8 characters."),
  role_id: z.string().min(1, "Please select a role."),
});

export const userUpdateSchema = z.object(userDetailsSchema);

export type UserCreateFormInput = z.input<typeof userCreateSchema>;
export type UserCreateFormOutput = z.output<typeof userCreateSchema>;

export type UserUpdateFormInput = z.input<typeof userUpdateSchema>;
export type UserUpdateFormOutput = z.output<typeof userUpdateSchema>;
