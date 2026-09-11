import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

const getComplianceManagerSection = async (
  applicationId: string,
  sectionId: string,
) => {
  const response = await instance.get(
    `/recruitment/compliance/manager/${applicationId}/section/${sectionId}`,
  );

  return response.data.data;
};

const updateComplianceManagerSectionData = async (
  applicationId: string,
  sectionId: string,
  values: unknown,
) => {
  const formData = payloadToFormData(values);

  const response = await instance.put(
    `/recruitment/compliance/manager/${applicationId}/section/${sectionId}`,
    formData,
  );

  return response.data.data;
};

export const complianceManagerApi = {
  getComplianceManagerSection,
  updateComplianceManagerSectionData,
};
