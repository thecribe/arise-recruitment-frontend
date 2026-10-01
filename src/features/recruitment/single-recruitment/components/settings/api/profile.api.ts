import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

import type {
  ProfileFormValues,
  UpdateEmailPayload,
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

export const profileApi = {
  updateProfile,
  updateEmail,
  updatePassword,
  getProfile,
  updateJobType,
};
