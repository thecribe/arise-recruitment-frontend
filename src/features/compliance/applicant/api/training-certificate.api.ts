import { instance } from "@/api/client";

import type {
  ApplicantTrainingCertificate,
  ApplicantTrainingCertificatesResponse,
  CreateTrainingCertificatePayload,
  SubmitTrainingCertificatesResponse,
  UpdateTrainingCertificatePayload,
} from "../types/training-certificate.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

const BASE_PATH = "/applicant-application/training-certificates";

const getTrainingCertificates = async (
  sectionId: string,
): Promise<ApplicantTrainingCertificatesResponse> => {
  const response = await instance.get(`${BASE_PATH}/${sectionId}`);

  return response.data.data;
};

const getTrainingCertificateById = async ({
  sectionId,
  certificateId,
}: {
  sectionId: string;
  certificateId: string;
}): Promise<ApplicantTrainingCertificate> => {
  const response = await instance.get(
    `${BASE_PATH}/${sectionId}/${certificateId}`,
  );

  return response.data.data;
};

const createTrainingCertificate = async ({
  sectionId,
  payload,
}: {
  sectionId: string;
  payload: CreateTrainingCertificatePayload;
}): Promise<ApplicantTrainingCertificate> => {
  const formData = payloadToFormData(payload);
  const response = await instance.post(`${BASE_PATH}/${sectionId}`, formData);

  return response.data.data;
};

const updateTrainingCertificate = async ({
  sectionId,
  certificateId,
  payload,
}: {
  sectionId: string;
  certificateId: string;
  payload: UpdateTrainingCertificatePayload;
}): Promise<ApplicantTrainingCertificate> => {
  const formData = payloadToFormData(payload);
  const response = await instance.patch(
    `${BASE_PATH}/${sectionId}/${certificateId}`,
    formData,
  );

  return response.data.data;
};

const deleteTrainingCertificate = async ({
  sectionId,
  certificateId,
}: {
  sectionId: string;
  certificateId: string;
}) => {
  const response = await instance.delete(
    `${BASE_PATH}/${sectionId}/${certificateId}`,
  );

  return response.data.data as {
    id: string;
    deleted: boolean;
  };
};

const submitTrainingCertificates = async (
  sectionId: string,
): Promise<SubmitTrainingCertificatesResponse> => {
  const response = await instance.post(`${BASE_PATH}/${sectionId}/submit`);

  return response.data.data;
};

export const trainingCertificateApi = {
  getTrainingCertificates,
  getTrainingCertificateById,
  createTrainingCertificate,
  updateTrainingCertificate,
  deleteTrainingCertificate,
  submitTrainingCertificates,
};

export default trainingCertificateApi;
