import { instance } from "@/api/client";
import type {
  TrainingCertificateRequirement,
  TrainingCertificateRequirementFormValues,
  TrainingCertificateRequirementsResponse,
} from "../types/training-certificate-requirement.types";

/**
 * ---------------------------------------------------------------------------
 * Get Training Certificate Requirements
 * ---------------------------------------------------------------------------
 *
 * Top Admin:
 * GET /training-certificate-requirements
 */
const getTrainingCertificateRequirements =
  async (): Promise<TrainingCertificateRequirementsResponse> => {
    const response = await instance.get("/training-certificate-requirements");

    return response.data.data;
  };

/**
 * ---------------------------------------------------------------------------
 * Create Training Certificate Requirement
 * ---------------------------------------------------------------------------
 *
 * Top Admin:
 * POST /training-certificate-requirements
 */
const createTrainingCertificateRequirement = async (
  values: TrainingCertificateRequirementFormValues,
): Promise<TrainingCertificateRequirement> => {
  const response = await instance.post(
    "/training-certificate-requirements",
    values,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Update Training Certificate Requirement
 * ---------------------------------------------------------------------------
 *
 * Top Admin:
 * PATCH /training-certificate-requirements/:requirementId
 */
const updateTrainingCertificateRequirement = async (
  requirementId: string,
  values: TrainingCertificateRequirementFormValues,
): Promise<TrainingCertificateRequirement> => {
  const response = await instance.patch(
    `/training-certificate-requirements/${requirementId}`,
    values,
  );

  return response.data.data;
};

/**
 * ---------------------------------------------------------------------------
 * Update Training Certificate Requirement Status
 * ---------------------------------------------------------------------------
 *
 * Top Admin:
 * PATCH /training-certificate-requirements/:requirementId/status
 */
const updateTrainingCertificateRequirementStatus = async (
  requirementId: string,
  active: boolean,
): Promise<TrainingCertificateRequirement> => {
  const response = await instance.patch(
    `/training-certificate-requirements/${requirementId}/status`,
    { active },
  );

  return response.data.data;
};

export const trainingCertificateRequirementApi = {
  getTrainingCertificateRequirements,
  createTrainingCertificateRequirement,
  updateTrainingCertificateRequirement,
  updateTrainingCertificateRequirementStatus,
};
