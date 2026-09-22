import { useQuery } from "@tanstack/react-query";

import {
  getInterviewDefinition,
  getInterviewSectionFields,
  getInterviewSections,
} from "../api/interview-definition.api";

export const interviewDefinitionKeys = {
  all: ["interview-definition"] as const,

  definition: () => [...interviewDefinitionKeys.all, "full"] as const,

  sections: () => [...interviewDefinitionKeys.all, "sections"] as const,

  sectionFields: (sectionId: string) =>
    [...interviewDefinitionKeys.all, "section-fields", sectionId] as const,
};

/**
 * Fetch the complete interview definition.
 */
export const useInterviewDefinition = () => {
  return useQuery({
    queryKey: interviewDefinitionKeys.definition(),
    queryFn: getInterviewDefinition,
  });
};

/**
 * Fetch interview sections.
 */
export const useInterviewSections = () => {
  return useQuery({
    queryKey: interviewDefinitionKeys.sections(),
    queryFn: getInterviewSections,
  });
};

/**
 * Fetch fields for one interview section.
 */
export const useInterviewSectionFields = (sectionId: string) => {
  return useQuery({
    queryKey: interviewDefinitionKeys.sectionFields(sectionId),
    queryFn: () => getInterviewSectionFields(sectionId),
    enabled: Boolean(sectionId),
  });
};
