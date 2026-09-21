export const trainingCertificateKeys = {
  all: ["training-certificates"] as const,

  lists: () => [...trainingCertificateKeys.all, "list"] as const,

  list: (sectionId: string) =>
    [...trainingCertificateKeys.lists(), sectionId] as const,

  details: () => [...trainingCertificateKeys.all, "detail"] as const,

  detail: (sectionId: string, certificateId: string) =>
    [...trainingCertificateKeys.details(), sectionId, certificateId] as const,
};
