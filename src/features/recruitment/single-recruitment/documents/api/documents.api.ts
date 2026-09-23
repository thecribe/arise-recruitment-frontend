import { instance } from "@/api/client";
import type {
  ApplicationDocument,
  ApplicationDefinitionSection,
  InterviewScoresheetDocument,
  ApplicantDocument,
} from "../types/document.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

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

// -----------------------------------------------------------------------------
// Interview Scoresheet
// -----------------------------------------------------------------------------

export const getInterviewScoresheetDocument = async (
  applicationId: string,
): Promise<InterviewScoresheetDocument | null> => {
  const response = await instance.get(
    `/documents/${applicationId}/interview-scoresheet`,
  );

  return response.data.data;
};

// -----------------------------------------------------------------------------
// Applicant Documents
// -----------------------------------------------------------------------------

export const getApplicantDocuments = async (
  applicationId: string,
): Promise<ApplicantDocument[]> => {
  const response = await instance.get(
    `/documents/${applicationId}/applicant-documents`,
  );

  return response.data.data;
};

export const uploadApplicantDocuments = async (
  applicationId: string,
  files: File[],
): Promise<ApplicantDocument[]> => {
  const formData = payloadToFormData({ documents: files });
  const response = await instance.post(
    `/documents/${applicationId}/applicant-documents`,
    formData,
  );

  return response.data.data;
};

export const deleteApplicantDocument = async (
  applicationId: string,
  documentId: string,
): Promise<ApplicantDocument> => {
  const response = await instance.delete(
    `/documents/${applicationId}/applicant-documents/${documentId}`,
  );

  return response.data.data;
};
