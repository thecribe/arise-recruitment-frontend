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

/**
 * Retrieves all application phases.
 */
export const applicationDefinitionApi = {
  async getApplicationPhases() {
    const { data } = await apiClient.get<ApplicationPhase[]>(
      "/application/phases",
    );

    return data;
  },

  /**
   * Retrieves all sections belonging to a phase.
   */
  async getPhaseSections(phaseId: string) {
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
