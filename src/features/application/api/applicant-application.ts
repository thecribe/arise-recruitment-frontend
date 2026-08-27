/**
 * -----------------------------------------------------------------------------
 * File: applicant-application.api.ts
 *
 * Description:
 * Retrieves applicant-specific application progress.
 * -----------------------------------------------------------------------------
 */

import { instance } from "@/api/client";
import type { ApplicantApplication } from "../types";

/**
 * Retrieves the current applicant's application.
 */

export const applicantApi = {
  async getApplicantApplication(): Promise<ApplicantApplication> {
    const response = await instance.get("/applicant-application");
    return response.data.data;
  },

  /**
   * Retrieves values entered for a section.
   */
  async getApplicantSection(sectionId: string) {
    const { data } = await instance.get(`/applicant/sections/${sectionId}`);
    return data;
  },

  async getSectionReviewComments(sectionId: string) {
    const response = await instance.get(
      `/applicant-application/sections/${sectionId}/review-comments`,
    );
    return response.data.data;
  },
};
