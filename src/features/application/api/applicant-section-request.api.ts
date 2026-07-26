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

import { apiClient } from "@/api/client";

/**
 * Applicant section values returned by the backend.
 */
export interface ApplicantSectionValuesResponse {
  sectionId: string;

  /**
   * Form values for the section.
   *
   * Repeatable sections return multiple records.
   */
  values: Record<string, unknown>[];
}

/**
 * Save draft request.
 */
export interface SaveSectionDraftRequest {
  sectionId: string;

  values: Record<string, unknown>[];
}

/**
 * Submit section request.
 */
export interface SubmitSectionRequest {
  sectionId: string;

  values: Record<string, unknown>[];
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
  async getApplicantSection(sectionId: string) {
    const { data } = await apiClient.get<ApplicantSectionValuesResponse>(
      `/applicant/sections/${sectionId}`, // TODO: Update endpoint
    );

    return data;
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

    const { data } = await apiClient.patch(
      `/applicant/sections/${sectionId}/draft`, // TODO: Update endpoint
      {
        values,
      },
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

    const { data } = await apiClient.post(
      `/applicant/sections/${sectionId}/submit`, // TODO: Update endpoint
      {
        values,
      },
    );

    return data;
  },
};
