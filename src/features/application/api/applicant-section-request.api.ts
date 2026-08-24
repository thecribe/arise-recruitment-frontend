/**
 * -----------------------------------------------------------------------------
 * File: application-section.api.ts
 *
 * Description:
 * Applicant section API.
 *
 * Responsible for:
 * - Retrieving applicant section values
 * - Saving section drafts
 * - Submitting completed sections
 *
 * NOTE:
 * Update the endpoints below to match the backend implementation.
 * -----------------------------------------------------------------------------
 */

import { instance } from "@/api/client";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

/**
 * Applicant section values returned by the backend.
 */
export interface ApplicantSectionValuesResponse {
  sectionId: string;
  applicantId?: string;
  status?: string;

  /**
   * Form values for the section.
   *
   * Repeatable sections return multiple records.
   */
  values: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Save draft request.
 */
export interface SaveSectionDraftRequest {
  sectionId: string;

  values: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Submit section request.
 */
export interface SubmitSectionRequest {
  sectionId: string;

  values: Record<string, unknown> | Record<string, unknown>[];
}

export const applicationSectionApi = {
  /**
   * ---------------------------------------------------------------------------
   * Retrieves the applicant's saved values for a section.
   *
   * TODO:
   * Replace endpoint with backend route.
   * ---------------------------------------------------------------------------
   */
  async getApplicantSection(
    sectionId: string,
  ): Promise<ApplicantSectionValuesResponse> {
    const response = await instance.get(
      `/applicant-application/sections/${sectionId}/values`, // TODO: Update endpoint
    );
    return response.data.data;
  },

  /**
   * ---------------------------------------------------------------------------
   * Saves a section as draft.
   *
   * TODO:
   * Replace endpoint with backend route.
   * ---------------------------------------------------------------------------
   */
  async saveDraft(payload: SaveSectionDraftRequest) {
    const { sectionId, values } = payload;

    const formData = payloadToFormData(values);


    const { data } = await instance.patch(
      `/applicant-application/sections/${sectionId}/values`, // TODO: Update endpoint
      formData,
    );

    return data;
  },

  /**
   * ---------------------------------------------------------------------------
   * Submits a completed section.
   *
   * TODO:
   * Replace endpoint with backend route.
   * ---------------------------------------------------------------------------
   */
  async submitSection(payload: SubmitSectionRequest) {
    const { sectionId, values } = payload;

    const { data } = await instance.post(
      `/applicant-application/sections/${sectionId}/submit`, // TODO: Update endpoint
      {
        values,
      },
    );

    return data;
  },
};
