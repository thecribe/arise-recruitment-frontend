import { instance } from "@/api/client";

import type {
  ApplicationStatusResponse,
  UpdateApplicationStatusPayload,
} from "../types/application-status.types";

const getApplicationStatus = async (
  applicantId: string,
): Promise<ApplicationStatusResponse | null> => {
  const response = await instance.get(
    `/users/${applicantId}/application-status`,
  );

  return response.data.data;
};

const updateApplicationStatus = async (
  applicantId: string,
  payload: UpdateApplicationStatusPayload,
): Promise<ApplicationStatusResponse> => {
  const response = await instance.patch(
    `/users/${applicantId}/application-status`,
    payload,
  );

  return response.data.data;
};

export const applicationStatusApi = {
  getApplicationStatus,
  updateApplicationStatus,
};
