export const trainingCertificateKeys = {
  all: ["training-certificates"] as const,

  list: (applicationId: string) =>
    [...trainingCertificateKeys.all, "list", applicationId] as const,

  detail: (applicationId: string, certificateId: string) =>
    [
      ...trainingCertificateKeys.all,
      "detail",
      applicationId,
      certificateId,
    ] as const,

  status: (applicationId: string, sectionId: string) =>
    [
      ...trainingCertificateKeys.all,
      "status",
      applicationId,
      sectionId,
    ] as const,
};
