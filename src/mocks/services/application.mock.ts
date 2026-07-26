import { delay } from "../utils";
import { useMockDbStore } from "../db";
import { personalPhaseSections } from "../db/application/definitions/sections";

export const applicationMockService = {
  async getApplicationDefinition() {
    await delay();

    return useMockDbStore.getState().db.applicationDefinition;
  },

  async getApplicantApplication(applicantId: string) {
    await delay();

    return (
      useMockDbStore
        .getState()
        .db.applicantApplications.find((x) => x.applicantId === applicantId) ??
      null
    );
  },

  getPhaseSections(phaseId: string) {
    switch (phaseId) {
      case "phase-personal":
        return personalPhaseSections;

      //   case "phase-professional":
      //     return professionalSections;

      default:
        return [];
    }
  },
};
