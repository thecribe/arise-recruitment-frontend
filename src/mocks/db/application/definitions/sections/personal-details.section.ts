import type { ApplicationSection } from "@/features/application/types";
import { personalFields } from "../fields/personal.fields";

export const personalInformationSection: ApplicationSection = {
  id: "section-personal-information",

  key: "personal-information",

  phaseId: "phase-personal",

  title: "Personal Information",

  description:
    "Provide your personal information as it appears on official documents.",

  order: 1,

  //   type: "form",

  repeatable: false,

  fields: personalFields,
};
