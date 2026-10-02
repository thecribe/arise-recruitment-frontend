import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";
import type { ComplianceSectionData } from "@/features/recruitment/types/compliance.types";

const getComplianceSection = async (
  applicationId: string,

  sectionId: string,
): Promise<ComplianceSectionData> => {
  const response = await instance.get(
    `/recruitment/compliance/${applicationId}/section/${sectionId}`,
  );
  return response.data.data;
};

const updateComplianceSectionData = async (
  applicationId: string,
  sectionId: string,
  values: unknown,
) => {
  const formData = payloadToFormData(values);

  const response = await instance.put(
    `/recruitment/compliance/${applicationId}/section/${sectionId}`,
    formData,
  );

  return response.data.data;
};

const verifyDbs = async (
  applicationId: string,
  payload: {
    disclosureNumber: string;
    dateOfBirth: string;
    surname: string;
  },
): Promise<unknown> => {
  const response = await instance.post(
    `/recruitment/compliance/${applicationId}/verify-dbs`,
    payload,
  );

  return response.data.data;
};

const verifyRightToWork = async (
  applicationId: string,
  payload: {
    shareCode: string;
    dateOfBirth: string;
  },
): Promise<unknown> => {
  const response = await instance.post(
    `/recruitment/compliance/${applicationId}/verify-right-to-work`,
    payload,
  );

  return response.data.data;
};
export const complianceApi = {
  getComplianceSection,
  updateComplianceSectionData,
  verifyDbs,
  verifyRightToWork,
};
