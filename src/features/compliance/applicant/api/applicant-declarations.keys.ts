export const applicantDeclarationKeys = {
  all: ["applicant-declarations"] as const,

  definitions: () => [...applicantDeclarationKeys.all, "definitions"] as const,

  values: () => [...applicantDeclarationKeys.all, "values"] as const,
};

export const applicantApplicationSectionKeys = {
  all: ["applicant-application-sections"] as const,

  status: (sectionId: string) =>
    [...applicantApplicationSectionKeys.all, "status", sectionId] as const,
};
