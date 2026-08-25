import { instance } from "@/api/client";
import type {
  RecruitmentApplicantDetail,
  RecruitmentApplicantListResponse,
  RecruitmentApplicantFilters,
  RecruitmentApplicationSectionDetails,
  RecruitmentDefaultData,
} from "../types/recruitment.types";

/**
 * -----------------------------------------------------------------------------
 * Get Recruitment default data.
 * -----------------------------------------------------------------------------
 */
const getRecruitmentDefaultData = async (): Promise<RecruitmentDefaultData> => {
  const response = await instance.get("/recruitment/default-data");

  return response.data.data;
};

/**
 * -----------------------------------------------------------------------------
 * Get Recruitment applicants.
 * -----------------------------------------------------------------------------
 */
const getRecruitmentApplicants = async (
  filters: RecruitmentApplicantFilters,
): Promise<RecruitmentApplicantListResponse> => {
  const response = await instance.get("/recruitment/applicants", {
    params: filters,
  });

  return response.data.data;
};

/**
 * -----------------------------------------------------------------------------
 * Get a single Recruitment applicant.
 * -----------------------------------------------------------------------------
 *
 * IMPORTANT:
 *
 * The `id` here is the ApplicantApplication ID.
 *
 * The response contains:
 *
 * - applicant profile
 * - job type
 * - application status
 * - latest status
 * - lightweight application structure
 *
 * It does NOT contain section fields or values.
 */
const getRecruitmentApplicant = async (
  applicationId: string,
): Promise<RecruitmentApplicantDetail> => {
  const response = await instance.get(
    `/recruitment/applicants/${applicationId}`,
  );

  return response.data.data;
};

/**
 * -----------------------------------------------------------------------------
 * Get a selected application section.
 * -----------------------------------------------------------------------------
 *
 * Only the selected section is requested.
 *
 * This prevents all application fields and values from being loaded when the
 * applicant page first opens.
 */
const getRecruitmentApplicantSection = async (
  applicationId: string,
  sectionId: string,
): Promise<RecruitmentApplicationSectionDetails> => {
  const response = await instance.get(
    `/recruitment/applicants/${applicationId}/sections/${sectionId}`,
  );
  return response.data.data;
};

/**
 * -----------------------------------------------------------------------------
 * Add a review comment to an application section.
 * -----------------------------------------------------------------------------
 */
async function createSectionComment(
  applicationId: string,
  sectionId: string,
  payload: {
    comment: string;
  },
) {
  const response = await instance.post(
    `/recruitment/applications/${applicationId}/sections/${sectionId}/comments`,
    payload,
  );

  return response.data;
}

/**
 * -----------------------------------------------------------------------------
 * Update an existing review comment.
 * -----------------------------------------------------------------------------
 */
async function updateSectionComment(
  commentId: string,
  applicationId: string,
  sectionId: string,
  payload: {
    comment: string;
  },
) {
  const response = await instance.patch(
    `/recruitment/applications/${applicationId}/sections/${sectionId}/comments/${commentId}`,
    payload,
  );

  return response.data;
}

/**
 * -----------------------------------------------------------------------------
 * Delete an existing review comment.
 * -----------------------------------------------------------------------------
 */
async function deleteSectionComment(commentId: string) {
  const response = await instance.delete(
    `/recruitment/section-comments/${commentId}`,
  );

  return response.data;
}

export const recruitmentApi = {
  getRecruitmentDefaultData,
  getRecruitmentApplicants,
  getRecruitmentApplicant,
  getRecruitmentApplicantSection,
  createSectionComment,
  updateSectionComment,
  deleteSectionComment,
};
