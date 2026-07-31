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
import { env } from "@/config/env";
import { getMockApplicatApplication } from "@/mocks/db/application/services";

/**
 * Retrieves the current applicant's application.
 */
const mock = env.useMocks;
export const applicantApi = {
  async getApplicantApplication() {
    if (!mock) {
      const { data } = await apiClient.get<ApplicantApplication>(
        "/applicant/application",
      );
      return data;
    }
    const data = getMockApplicatApplication();
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
