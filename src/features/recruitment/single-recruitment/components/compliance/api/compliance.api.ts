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
  console.log(values);
  const formData = payloadToFormData(values);

  const response = await instance.put(
    `/recruitment/compliance/${applicationId}/section/${sectionId}`,
    formData,
  );

  return response.data.data;
};

export const complianceApi = {
  getComplianceSection,
  updateComplianceSectionData,
};
