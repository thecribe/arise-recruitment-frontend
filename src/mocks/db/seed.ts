

import { applicantApplicationSeed } from "./application/applicants/applicant-application.seed";
import { applicantSectionData } from "./application/applicants/section-data";
import { applicationDefinitionSeed } from "./application/definitions/application-definition.seed";
import type { MockDatabase } from "./types";

export const mockDatabaseSeed: MockDatabase = {
  applicationDefinition: applicationDefinitionSeed,

  applicantApplications: [applicantApplicationSeed],

  applicantSectionData: applicantSectionData
};
