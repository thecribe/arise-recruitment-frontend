import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  trainingCertificateApi,
  type CreateTrainingCertificatePayload,
  type UpdateTrainingCertificatePayload,
} from "../api/training-certificates.api";
import { trainingCertificateKeys } from "../api/training-certificates.keys";
import { notification } from "@/components/feedback/notification";
import type { TrainingCertificateSectionStatus } from "../sections/training/types/training-certificate.types";

export const useTrainingCertificates = (
  applicationId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: trainingCertificateKeys.list(applicationId),
    queryFn: () =>
      trainingCertificateApi.getTrainingCertificates(applicationId),
    enabled: Boolean(applicationId) && enabled,
  });
};

export const useTrainingCertificate = (
  applicationId: string,
  certificateId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: trainingCertificateKeys.detail(applicationId, certificateId),
    queryFn: () =>
      trainingCertificateApi.getTrainingCertificate(
        applicationId,
        certificateId,
      ),
    enabled: Boolean(applicationId) && Boolean(certificateId) && enabled,
  });
};

export const useCreateTrainingCertificate = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrainingCertificatePayload) =>
      trainingCertificateApi.createTrainingCertificate(applicationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(applicationId),
      });
      notification.success("Certificate uploaded successfully.");
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
          "Unable to upload certificate. Please try again.",
      );
    },
  });
};

export const useUpdateTrainingCertificate = (
  applicationId: string,
  certificateId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTrainingCertificatePayload) =>
      trainingCertificateApi.updateTrainingCertificate(
        applicationId,
        certificateId,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(applicationId),
      });

      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.detail(applicationId, certificateId),
      });
      notification.success("Certificate updated successfully.");
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
          "Unable to update certificate. Please try again.",
      );
    },
  });
};

export const useDeleteTrainingCertificate = (
  applicationId: string,
  certificateId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      trainingCertificateApi.deleteTrainingCertificate(
        applicationId,
        certificateId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(applicationId),
      });
      notification.success("Application section status updated successfully.");
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
          "Unable to update application section status. Please try again.",
      );
    },
  });
};

export const useTrainingCertificateSectionStatus = (
  applicationId: string,
  sectionId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: trainingCertificateKeys.status(applicationId, sectionId),
    queryFn: () =>
      trainingCertificateApi.getTrainingCertificateSectionStatus(
        applicationId,
        sectionId,
      ),
    enabled: Boolean(applicationId) && Boolean(sectionId) && enabled,
  });
};

export const useUpdateTrainingCertificateSectionStatus = (
  applicationId: string,
  sectionId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: TrainingCertificateSectionStatus) =>
      trainingCertificateApi.updateTrainingCertificateSectionStatus(
        applicationId,
        sectionId,
        { status: status as "approved" | "rejected" },
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.status(applicationId, sectionId),
      });

      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(applicationId),
      });
      notification.success(
        "Training certificate section's status updated successfully.",
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
          "Unable to update Training certificate section. Please try again.",
      );
    },
  });
};
