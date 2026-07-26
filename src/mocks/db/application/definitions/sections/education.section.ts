import type { ApplicationSection } from "@/features/application/types";
import { educationFields } from "../fields/education.fields";

export const educationSection: ApplicationSection = {
  id: "section-education",

  key: "education",

  phaseId: "phase-personal",

  title: "Education",

  description: "Add all relevant educational qualifications.",

  order: 3,

  //   type: "form",

  repeatable: true,

  minItems: 1,

  maxItems: 20,

  fields: educationFields,
};
