/**
 * -----------------------------------------------------------------------------
 * File: applicant-application.api.ts
 *
 * Description:
 * Retrieves applicant-specific application progress.
 * -----------------------------------------------------------------------------
 */

import { apiClient } from "@/api/client";
import type { ApplicantApplication } from "../types";

/**
 * Retrieves the current applicant's application.
 */

export const applicantApi = {
  async getApplicantApplication() {
    const { data } = await apiClient.get<ApplicantApplication>(
      "/applicant/application",
    );

    return data;
  },

  /**
   * Retrieves values entered for a section.
   */
  async getApplicantSection(sectionId: string) {
    const { data } = await apiClient.get(`/applicant/sections/${sectionId}`);

    return data;
  },
};
