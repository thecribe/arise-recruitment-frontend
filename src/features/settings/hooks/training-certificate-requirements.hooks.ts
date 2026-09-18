import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { trainingCertificateRequirementApi } from "../api/training-certificate-requirements.api";
import { settingsKeys } from "../api/settings.keys";

import type { TrainingCertificateRequirementFormValues } from "../types/training-certificate-requirement.types";
import { notification } from "@/components/feedback/notification";

/**
 * ---------------------------------------------------------------------------
 * Get Training Certificate Requirements
 * ---------------------------------------------------------------------------
 */
export const useTrainingCertificateRequirements = (enabled = true) => {
  return useQuery({
    queryKey: settingsKeys.trainingCertificateRequirementList(),

    queryFn:
      trainingCertificateRequirementApi.getTrainingCertificateRequirements,

    enabled,
  });
};

/**
 * ---------------------------------------------------------------------------
 * Create Training Certificate Requirement
 * ---------------------------------------------------------------------------
 */
export const useCreateTrainingCertificateRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TrainingCertificateRequirementFormValues) =>
      trainingCertificateRequirementApi.createTrainingCertificateRequirement(
        values,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsKeys.trainingCertificateRequirementList(),
      });
      notification.success(
        "Training certificate requirement created successfully.",
      );
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to create training certificate requirement. Please try again.",
      );
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Update Training Certificate Requirement
 * ---------------------------------------------------------------------------
 */
export const useUpdateTrainingCertificateRequirement = (
  requirementId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TrainingCertificateRequirementFormValues) =>
      trainingCertificateRequirementApi.updateTrainingCertificateRequirement(
        requirementId,
        values,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsKeys.trainingCertificateRequirementList(),
      });
      notification.success(
        "Training certificate requirement updated successfully.",
      );
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update training certificate requirement. Please try again.",
      );
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Update Training Certificate Requirement Status
 * ---------------------------------------------------------------------------
 */
export const useUpdateTrainingCertificateRequirementStatus = (
  requirementId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (active: boolean) =>
      trainingCertificateRequirementApi.updateTrainingCertificateRequirementStatus(
        requirementId,
        active,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsKeys.trainingCertificateRequirementList(),
      });
      notification.success(
        "Training certificate requirement status updated successfully.",
      );
    },

    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      notification.error(
        axiosError.response?.data?.message ||
          "Unable to update training certificate requirement status. Please try again.",
      );
    },
  });
};
