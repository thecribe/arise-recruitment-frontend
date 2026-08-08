import type { ApplicationSection } from "@/features/application/types";
import { applicantApplicationSeed } from "./applicants/applicant-application.seed";
import { personalPhaseSections } from "./definitions/sections";
import { applicantSectionData } from "./applicants/section-data";

export const getMockApplicationPhases = () => {
  return  ;
};

export const getMockApplicationSection = (phaseId: string) => {
  return personalPhaseSections.filter(
    (section: ApplicationSection) => section.phaseId === phaseId,
  );
};

//APPLICANTS

export const getMockApplicatApplication = () => {
  return applicantApplicationSeed;
};

export const getApplicantFieldData = (sectionId: string) => {
  return applicantSectionData.find(
    (section) => section.sectionId === sectionId,
  );
};
