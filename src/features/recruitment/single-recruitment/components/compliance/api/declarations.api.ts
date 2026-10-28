import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";
import type { ApplicationSectionStatus } from "@/features/compliance/applicant/components/declarations/application-section-status";

import type {
  DeclarationSections,
  DeclarationValues,
} from "@/features/recruitment/types/declarations.types";

const getDeclarations = async (
  applicationId: string,
): Promise<DeclarationSections> => {
  const response = await instance.get(`/declarations/${applicationId}`);

  return response.data.data;
};

const getDeclarationValues = async (
  applicationId: string,
): Promise<DeclarationValues> => {
  const response = await instance.get(`/declarations/${applicationId}/values`);

  return response.data.data;
};

const updateDeclaration = async (
  applicationId: string,
  sectionId: string,
  values: Record<string, unknown>,
) => {
  const formData = payloadToFormData(values);

  const response = await instance.put(
    `/declarations/${applicationId}/${sectionId}`,
    formData,
  );

  return response.data.data;
};

export interface ApplicationSectionStatusResponse {
  sectionId: string;
  status: ApplicationSectionStatus;
  updatedAt?: string;
}

const getSectionStatus = async (
  applicationId: string,
  sectionId: string,
): Promise<ApplicationSectionStatusResponse> => {
  const response = await instance.get(
    `/declarations/${applicationId}/${sectionId}/status`,
  );

  return response.data.data;
};

const updateSectionStatus = async (
  applicationId: string,
  sectionId: string,
  status: ApplicationSectionStatus,
): Promise<ApplicationSectionStatusResponse> => {
  const response = await instance.patch(
    `/declarations/${applicationId}/${sectionId}/status`,
    { status },
  );

  return response.data.data;
};

export const declarationsApi = {
  getDeclarations,
  getDeclarationValues,
  updateDeclaration,
  getSectionStatus,
  updateSectionStatus,
};
