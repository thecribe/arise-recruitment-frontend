import { instance } from "@/api/client";
import type {
  ApplicationDocument,
  ApplicationDefinitionSection,
} from "../types/document.types";

export const getApplicationFormDocument = async (
  applicationId: string,
): Promise<ApplicationDocument> => {
  const response = await instance.get(
    `/documents/${applicationId}/application-form`,
  );

  return response.data.data;
};

export const getApplicationFormSections = async (
  phaseId: string,
): Promise<ApplicationDefinitionSection[]> => {
  const response = await instance.get(
    `/application-definitions/phases/${phaseId}/sections`,
  );

  return response.data.data;
};
