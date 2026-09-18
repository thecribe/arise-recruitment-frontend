export const settingsKeys = {
  all: ["settings"] as const,

  trainingCertificateRequirements: () =>
    [...settingsKeys.all, "training-certificate-requirements"] as const,

  trainingCertificateRequirementList: () =>
    [...settingsKeys.trainingCertificateRequirements(), "list"] as const,
};
