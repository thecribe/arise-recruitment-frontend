/**
 * -----------------------------------------------------------------------------
 * File: application-definition.keys.ts
 *
 * Description:
 * Centralized React Query keys for the application definition.
 *
 * These resources are relatively static and shared across applicants.
 * -----------------------------------------------------------------------------
 */

export const applicationDefinitionKeys = {
  all: ["application-definition"] as const,

  phases: () => [...applicationDefinitionKeys.all, "phases"] as const,

  sections: (phaseId: string) =>
    [...applicationDefinitionKeys.all, "sections", phaseId] as const,

  fields: (sectionId: string) =>
    [...applicationDefinitionKeys.all, "fields", sectionId] as const,
};
