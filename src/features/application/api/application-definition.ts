/**
 * -----------------------------------------------------------------------------
 * File: application-definition.api.ts
 *
 * Description:
 * Retrieves the static application definition.
 *
 * Responsibilities:
 * - Phases
 * - Sections
 * - Fields
 *
 * Notes:
 * Applicant progress is NOT returned here.
 * -----------------------------------------------------------------------------
 */

import { apiClient } from "@/api/client";
import type {
  // ApplicationField,
  ApplicationPhase,
  ApplicationSection,
} from "../types";
import { env } from "@/config/env";
import {
  getMockApplicationPhases,
  getMockApplicationSection,
} from "@/mocks/db/application/services";

/**
 * Retrieves all application phases.
 */
const mock = env.useMocks;
export const applicationApi = {
  async getApplicationPhases() {
    if (!mock) {
      const { data } = await apiClient.get<ApplicationPhase[]>(
        "/application/phases",
      );
      return data;
    }
    const data = getMockApplicationPhases();
    return data;
  },

  /**
   * Retrieves all sections belonging to a phase.
   */
  async getPhaseSections(phaseId: string) {
  
    if (mock) {
    
      const data = getMockApplicationSection(phaseId);

      return data;
    }
 
    const { data } = await apiClient.get<ApplicationSection[]>(
      `/application/phases/${phaseId}/sections`,
    );

    return data;
  },

  /**
   * Retrieves all fields belonging to a section.
   */
  // async getSectionFields(sectionId: string) {
  //   const { data } = await apiClient.get<ApplicationField[]>(
  //     `/application/sections/${sectionId}/fields`,
  //   );

  //   return data;
  // },
};
