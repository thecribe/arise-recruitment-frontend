// personal.sections.ts

import { contactDetailsSection } from "./contact-details.section";
import { educationSection } from "./education.section";
import { employmentHistorySection } from "./employment-history.section";
import { personalInformationSection } from "./personal-details.section";

export const personalPhaseSections = [
  personalInformationSection,
  contactDetailsSection,
  educationSection,
  employmentHistorySection,
].sort((a, b) => a.order - b.order);
