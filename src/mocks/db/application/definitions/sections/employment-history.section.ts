import type { ApplicationSection } from "@/features/application/types";
import { employmentFields } from "../fields/employment.fields";

export const employmentHistorySection: ApplicationSection = {
  id: "section-employment-history",

  key: "employment-history",

  phaseId: "phase-personal",

  title: "Employment History",

  description: "Provide your previous employment history.",

  order: 4,

  //   type: "form",

  repeatable: true,

  minItems: 0,

  maxItems: 50,

  fields: employmentFields,
};
