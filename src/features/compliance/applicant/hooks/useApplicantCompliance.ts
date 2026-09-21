import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";

import { applicantComplianceApi } from "../api/applicant-compliance.api";

const applicantComplianceKeys = {
  all: ["applicant-compliance"] as const,

  sections: () => [...applicantComplianceKeys.all, "sections"] as const,

  section: (sectionId: string) =>
    [...applicantComplianceKeys.sections(), sectionId] as const,

  status: (sectionId: string) =>
    [...applicantComplianceKeys.section(sectionId), "status"] as const,
};

/**
 * Retrieve all compliance section statuses.
 */
export const useApplicantComplianceSections = () => {
  return useQuery({
    queryKey: applicantComplianceKeys.sections(),
    queryFn: applicantComplianceApi.getSections,
  });
};

/**
 * Retrieve a specific compliance section.
 */
export const useApplicantComplianceSection = (sectionId: string | null) => {
  return useQuery({
    queryKey: applicantComplianceKeys.section(sectionId ?? ""),
    queryFn: () => applicantComplianceApi.getSection(sectionId as string),
    enabled: Boolean(sectionId),
  });
};

/**
 * Save a section draft.
 */
export const useSaveApplicantComplianceDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      values,
    }: {
      sectionId: string;
      values: Record<string, unknown>;
    }) => applicantComplianceApi.saveDraft(sectionId, values),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: applicantComplianceKeys.sections(),
        }),
        queryClient.invalidateQueries({
          queryKey: applicantComplianceKeys.section(variables.sectionId),
        }),
      ]);

      notification.success("Compliance draft saved successfully.");
    },

    onError: () => {
      notification.error("Unable to save compliance draft.");
    },
  });
};

/**
 * Submit a section.
 */
export const useSubmitApplicantComplianceSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      values,
    }: {
      sectionId: string;
      values: Record<string, unknown>;
    }) => applicantComplianceApi.submitSection(sectionId, values),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: applicantComplianceKeys.sections(),
        }),
        queryClient.invalidateQueries({
          queryKey: applicantComplianceKeys.section(variables.sectionId),
        }),
      ]);

      notification.success("Compliance section submitted successfully.");
    },

    onError: () => {
      notification.error("Unable to submit compliance section.");
    },
  });
};

export { applicantComplianceKeys };
