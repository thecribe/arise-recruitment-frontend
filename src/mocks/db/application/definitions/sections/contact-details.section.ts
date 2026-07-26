import { contactFields } from "../fields/contact.fields";
import type { ApplicationSection } from "@/features/application/types";

export const contactDetailsSection: ApplicationSection = {
  id: "section-contact-details",

  key: "contact-details",

  phaseId: "phase-personal",

  title: "Contact Details",

  description: "Provide your current contact information.",

  order: 2,

  //   type: "form",

  repeatable: false,

  fields: contactFields,
};
