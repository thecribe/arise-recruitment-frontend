import { instance } from "@/api/client";

import type {
  ApplicantComplianceSaveResponse,
  ApplicantComplianceSectionResponse,
  ApplicantComplianceSectionStatusResponse,
} from "../types/applicant-compliance-api.types";

import type { ApplicantComplianceSection } from "../types/compliance.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

const BASE_URL = "/applicant-application/compliance/sections";

/**
 * Backend response wrapper.
 *
 * Adjust this if your ApiResponse uses a different data property.
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * Retrieve all compliance sections.
 */
const getSections = async (): Promise<ApplicantComplianceSection[]> => {
  const response =
    await instance.get<ApiResponse<ApplicantComplianceSection[]>>(BASE_URL);

  return response.data.data;
};

/**
 * Retrieve a specific compliance section.
 */
const getSection = async (
  sectionId: string,
): Promise<ApplicantComplianceSectionResponse> => {
  const response = await instance.get<
    ApiResponse<ApplicantComplianceSectionResponse>
  >(`${BASE_URL}/${sectionId}`);

  return response.data.data;
};

/**
 * Save a compliance section draft.
 */
const saveDraft = async (
  sectionId: string,
  values: Record<string, unknown>,
): Promise<ApplicantComplianceSaveResponse> => {
  const formData = payloadToFormData(values);
  const response = await instance.patch<
    ApiResponse<ApplicantComplianceSaveResponse>
  >(`${BASE_URL}/${sectionId}/draft`, formData);

  return response.data.data;
};

/**
 * Submit a compliance section.
 */
const submitSection = async (
  sectionId: string,
  values: Record<string, unknown>,
): Promise<ApplicantComplianceSaveResponse> => {
  const formData = payloadToFormData(values);
  const response = await instance.post<
    ApiResponse<ApplicantComplianceSaveResponse>
  >(`${BASE_URL}/${sectionId}/submit`, formData);

  return response.data.data;
};

/**
 * Retrieve a section's status.
 */
const getSectionStatus = async (
  sectionId: string,
): Promise<ApplicantComplianceSectionStatusResponse> => {
  const response = await instance.get<
    ApiResponse<ApplicantComplianceSectionStatusResponse>
  >(`${BASE_URL}/${sectionId}/status`);

  return response.data.data;
};

export const applicantComplianceApi = {
  getSections,
  getSection,
  getSectionStatus,
  saveDraft,
  submitSection,
};
