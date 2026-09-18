import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

import type {
  ManagerReference,
  ManagerReferencesResponse,
  ReferenceFormValues,
  ReferenceResponse,
  ReferenceResponseApiPayload,
  ReferenceResponseFormValues,
} from "@/features/recruitment/types/reference.types";

/**
 * ---------------------------------------------------------------------------
 * Get References
 * ---------------------------------------------------------------------------
 *
 * Manager:
 * GET /applications/:applicationId
 */
const getReferences = async (
  applicationId: string,
): Promise<ManagerReferencesResponse> => {
  const response = await instance.get(
    `/references/applications/${applicationId}`,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Create Reference
 * ---------------------------------------------------------------------------
 *
 * Applicant:
 * POST /applications/:applicationId
 */
const createReference = async (
  applicationId: string,
  values: ReferenceFormValues,
): Promise<ManagerReference> => {
  const response = await instance.post(
    `/references/applications/${applicationId}`,
    values,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Update Applicant Reference
 * ---------------------------------------------------------------------------
 *
 * Applicant:
 * PATCH /applications/:applicationId/:referenceId
 */
const updateReference = async (
  applicationId: string,
  referenceId: string,
  values: ReferenceFormValues,
): Promise<ManagerReference> => {
  const response = await instance.patch(
    `/references/applications/${applicationId}/${referenceId}`,
    values,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Update Manager Reference
 * ---------------------------------------------------------------------------
 *
 * Manager can edit a reference regardless of its current status.
 *
 * PATCH /applications/:applicationId/:referenceId/manager
 */
const updateManagerReference = async (
  applicationId: string,
  referenceId: string,
  values: ReferenceFormValues,
): Promise<ManagerReference> => {
  const response = await instance.patch(
    `/references/applications/${applicationId}/references/${referenceId}/manager`,
    values,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Submit References
 * ---------------------------------------------------------------------------
 *
 * Applicant submits the reference section.
 *
 * POST /applications/:applicationId/submit
 */
const submitReferences = async (
  applicationId: string,
): Promise<ManagerReferencesResponse> => {
  const response = await instance.post(
    `/references/applications/${applicationId}/references/submit`,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Get Reference Response
 * ---------------------------------------------------------------------------
 *
 * Manager:
 * GET /applications/:applicationId/:referenceId/response
 */
const getReferenceResponse = async (
  applicationId: string,
  referenceId: string,
): Promise<ReferenceResponse> => {
  const response = await instance.get(
    `/references/applications/${applicationId}/${referenceId}/response`,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Save Manager Reference Response
 * ---------------------------------------------------------------------------
 *
 * Manager fills the reference form on behalf of the referee.
 *
 * IMPORTANT:
 * This does NOT change the reference mail status.
 *
 * POST /applications/:applicationId/:referenceId/response
 */
const saveManagerReferenceResponse = async (
  applicationId: string,
  referenceId: string,
  values: ReferenceResponseApiPayload,
): Promise<ReferenceResponse> => {
  const formData = payloadToFormData(values);

  const response = await instance.post(
    `/references/applications/${applicationId}/${referenceId}/response`,
    formData,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Update Reference Status
 * ---------------------------------------------------------------------------
 *
 * Manager:
 * PATCH /applications/:applicationId/:referenceId/status
 */
const updateReferenceStatus = async (
  applicationId: string,
  referenceId: string,
  status: ManagerReference["status"],
): Promise<ManagerReference> => {
  const response = await instance.patch(
    `/references/applications/${applicationId}/${referenceId}/status`,
    {
      status,
    },
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Public Reference Response
 * ---------------------------------------------------------------------------
 *
 * This will eventually be used by the referee-facing page.
 *
 * POST /references/:referenceId/response
 *
 * Token validation will be handled by the backend middleware.
 */
const saveReferenceResponse = async (
  referenceId: string,
  values: ReferenceResponseFormValues,
): Promise<ReferenceResponse> => {
  const formData = payloadToFormData(values);

  const response = await instance.post(
    `/references/${referenceId}/response`,
    formData,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Refuse Reference
 * ---------------------------------------------------------------------------
 *
 * Public referee operation.
 *
 * POST /references/:referenceId/refuse
 */
const refuseReference = async (
  referenceId: string,
): Promise<ManagerReference> => {
  const response = await instance.post(`/references/${referenceId}/refuse`);

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Send Reference
 * ---------------------------------------------------------------------------
 */
const sendReference = async (applicationId: string, referenceId: string) => {
  const response = await instance.post(
    `/references/applications/${applicationId}/references/${referenceId}/send`,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Export API
 * ---------------------------------------------------------------------------
 */

export const referenceApi = {
  getReferences,
  createReference,
  updateReference,
  updateManagerReference,
  submitReferences,

  getReferenceResponse,
  saveManagerReferenceResponse,

  updateReferenceStatus,

  saveReferenceResponse,
  refuseReference,

  sendReference,
};
