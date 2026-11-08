import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

import type {
  ProfileFormValues,
  UpdateEmailPayload,
  UpdateOwnPasswordPayload,
  UpdatePasswordPayload,
} from "../types/profile.types";

const updateProfile = async (
  applicantId: string,
  values: ProfileFormValues,
) => {
  const formData = payloadToFormData(values);
  const response = await instance.patch(
    `/users/${applicantId}/profile`,
    formData,
  );
  return response.data.data;
};

const updateEmail = async (applicantId: string, values: UpdateEmailPayload) => {
  const response = await instance.patch(`/users/${applicantId}/email`, values);

  return response.data.data;
};

const updatePassword = async (
  applicantId: string,
  values: UpdatePasswordPayload,
) => {
  const response = await instance.patch(
    `/users/${applicantId}/password`,
    values,
  );

  return response.data.data;
};

const getProfile = async (applicantId: string) => {
  const response = await instance.get(`/users/${applicantId}/profile`);

  return response.data.data;
};

const updateJobType = async (
  applicantId: string,
  values: { job_type_id: string },
) => {
  const response = await instance.patch(
    `/users/${applicantId}/job-type`,
    values,
  );

  return response.data.data;
};

/**
 * Get the authenticated user's profile.
 */
const getOwnProfile = async () => {
  const response = await instance.get("/single-user/profile");
  return response.data.data;
};

/**
 * Update the authenticated user's profile.
 */
const updateOwnProfile = async (values: ProfileFormValues) => {
  const formData = payloadToFormData(values);

  const response = await instance.patch("/single-user/profile", formData);

  return response.data.data;
};

/**
 * Update the authenticated user's password.
 */
const updateOwnPassword = async (values: UpdateOwnPasswordPayload) => {
  const response = await instance.patch("/single-user/password", values);

  return response.data.data;
};

export const profileApi = {
  updateProfile,
  updateEmail,
  updatePassword,
  getProfile,
  updateJobType,
  getOwnProfile,
  updateOwnProfile,
  updateOwnPassword,
};
