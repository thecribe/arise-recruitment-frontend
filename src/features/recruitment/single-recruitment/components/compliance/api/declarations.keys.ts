export const declarationKeys = {
  all: ["declarations"] as const,

  definitions: (applicationId: string) =>
    [...declarationKeys.all, "definitions", applicationId] as const,

  values: (applicationId: string) =>
    [...declarationKeys.all, "values", applicationId] as const,
};

export const applicationSectionKeys = {
  all: ["application-sections"] as const,

  status: (applicationId: string, sectionId: string) =>
    [
      ...applicationSectionKeys.all,
      applicationId,
      sectionId,
      "status",
    ] as const,
};
