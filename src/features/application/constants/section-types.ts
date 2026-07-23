export const SECTION_TYPES = {
  SINGLE: "single",
  REPEATABLE: "repeatable",
  READONLY: "readonly",
  REVIEW: "review",
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];
