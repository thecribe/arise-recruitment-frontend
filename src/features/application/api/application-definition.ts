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

import { instance } from "@/api/client";
import type {
  ApplicationPhase,
  ApplicationSection,
} from "../types";



/**
 * Retrieves all application phases.
 */

export const applicationApi = {
  async getApplicationPhases(): Promise<ApplicationPhase[]> {
      const response = await instance.get(
        "/application-definitions/phases"
      );
    
    return response.data.data;
  },

  /**
   * Retrieves all sections belonging to a phase.
   */
  async getPhaseSections(phaseId: string):Promise<ApplicationSection[]> {
    const response = await instance.get(
      `/application-definitions/phases/${phaseId}/sections`,
    );
    return response.data.data;
  },


};
