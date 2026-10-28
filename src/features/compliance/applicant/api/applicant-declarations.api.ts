import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";
import type {
  DeclarationSections,
  DeclarationValues,
} from "@/features/recruitment/types/declarations.types";
import type { RecruitmentApplicationSectionStatus } from "../types/compliance.types";

const getDeclarations = async (): Promise<DeclarationSections> => {
  const response = await instance.get("/applicant-application/declarations");

  return response.data.data;
};

const getDeclarationValues = async (): Promise<DeclarationValues> => {
  const response = await instance.get(
    "/applicant-application/declarations/values",
  );

  return response.data.data;
};

const updateDeclaration = async (
  sectionId: string,
  values: Record<string, unknown>,
) => {
  const formData = payloadToFormData(values);
  const response = await instance.put(
    `/applicant-application/declarations/${sectionId}`,
    formData,
  );

  return response.data.data;
};

export interface ApplicantApplicationSectionStatus {
  sectionId: string;
  status: RecruitmentApplicationSectionStatus;
}

const getSectionStatus = async (
  sectionId: string,
): Promise<ApplicantApplicationSectionStatus> => {
  const response = await instance.get(
    `/applicant-application/declarations/${sectionId}/status`,
  );

  return response.data.data;
};

export const applicantDeclarationsApi = {
  getDeclarations,
  getDeclarationValues,
  updateDeclaration,
  getSectionStatus,
};
