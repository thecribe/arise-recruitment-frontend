import { instance } from "@/api/client";
import type {
  TrainingCertificate,
  TrainingCertificateSectionStatusResponse,
  TrainingCertificatesResponse,
  UpdateTrainingCertificateSectionStatusPayload,
} from "../sections/training/types/training-certificate.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

export interface CreateTrainingCertificatePayload {
  requirementId?: string | null;
  certificateName: string;
  certificateNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  document: unknown;
}

export type UpdateTrainingCertificatePayload =
  Partial<CreateTrainingCertificatePayload>;

const getTrainingCertificates = async (
  applicationId: string,
): Promise<TrainingCertificatesResponse> => {
  const response = await instance.get(
    `/recruitment/training-certificates/applications/${applicationId}`,
  );

  return response.data.data;
};

const getTrainingCertificate = async (
  applicationId: string,
  certificateId: string,
): Promise<TrainingCertificate> => {
  const response = await instance.get(
    `/training-certificates/applications/${applicationId}/${certificateId}`,
  );

  return response.data.data;
};

const createTrainingCertificate = async (
  applicationId: string,
  data: CreateTrainingCertificatePayload,
): Promise<TrainingCertificate> => {
  const formData = payloadToFormData(data);

  const response = await instance.post(
    `/recruitment/training-certificates/applications/${applicationId}`,
    formData,
  );

  return response.data.data;
};

const updateTrainingCertificate = async (
  applicationId: string,
  certificateId: string,
  data: UpdateTrainingCertificatePayload,
): Promise<TrainingCertificate> => {
  const formData = payloadToFormData(data);
  const response = await instance.patch(
    `/recruitment/training-certificates/applications/${applicationId}/${certificateId}`,
    formData,
  );

  return response.data.data;
};

const deleteTrainingCertificate = async (
  applicationId: string,
  certificateId: string,
): Promise<void> => {
  await instance.delete(
    `/recruitment/training-certificates/applications/${applicationId}/${certificateId}`,
  );
};

const getTrainingCertificateSectionStatus = async (
  applicationId: string,
  sectionId: string,
): Promise<TrainingCertificateSectionStatusResponse> => {
  const response = await instance.get(
    `/recruitment/training-certificates/applications/${applicationId}/sections/${sectionId}/status`,
  );
  return response.data.data;
};

const updateTrainingCertificateSectionStatus = async (
  applicationId: string,
  sectionId: string,
  data: UpdateTrainingCertificateSectionStatusPayload,
): Promise<TrainingCertificateSectionStatusResponse> => {
  const response = await instance.patch(
    `/recruitment/training-certificates/applications/${applicationId}/sections/${sectionId}/status`,
    data,
  );

  return response.data.data;
};

export const trainingCertificateApi = {
  getTrainingCertificates,
  getTrainingCertificate,
  createTrainingCertificate,
  updateTrainingCertificate,
  deleteTrainingCertificate,
  getTrainingCertificateSectionStatus,
  updateTrainingCertificateSectionStatus,
};
