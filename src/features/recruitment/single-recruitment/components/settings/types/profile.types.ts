import type { UpdateOwnPasswordFormValues } from "../schema/profile.schema";

export interface ProfileFormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  postcode: string;
  profile_img: File | string | null;
}

export interface UpdateEmailPayload {
  email: string;
}

export interface UpdatePasswordPayload {
  password: string;
}

export type UpdateOwnPasswordPayload = Pick<
  UpdateOwnPasswordFormValues,
  "currentPassword" | "newPassword"
>;
