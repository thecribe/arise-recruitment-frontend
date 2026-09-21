import { instance } from "@/api/client";

import type {
  ApplicantReference,
  CreateApplicantReferencePayload,
  SubmitReferencesResponse,
  UpdateApplicantReferencePayload,
} from "../types/reference.types";

const BASE_PATH = "/applicant-application/references";

const getReferences = async (): Promise<ApplicantReference[]> => {
  const response = await instance.get(BASE_PATH);

  return response.data.data;
};

const getReferenceById = async (
  referenceId: string,
): Promise<ApplicantReference> => {
  const response = await instance.get(`${BASE_PATH}/${referenceId}`);

  return response.data.data;
};

const createReference = async (
  payload: CreateApplicantReferencePayload,
): Promise<ApplicantReference> => {
  const response = await instance.post(BASE_PATH, payload);

  return response.data.data;
};

const updateReference = async ({
  referenceId,
  payload,
}: {
  referenceId: string;
  payload: UpdateApplicantReferencePayload;
}): Promise<ApplicantReference> => {
  const response = await instance.patch(`${BASE_PATH}/${referenceId}`, payload);

  return response.data.data;
};

const deleteReference = async (
  referenceId: string,
): Promise<{ id: string; deleted: boolean }> => {
  const response = await instance.delete(`${BASE_PATH}/${referenceId}`);

  return response.data.data;
};

const submitReferences = async (): Promise<SubmitReferencesResponse> => {
  const response = await instance.post(`${BASE_PATH}/submit`);

  return response.data.data;
};

export const referenceApi = {
  getReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
  submitReferences,
};

export default referenceApi;
