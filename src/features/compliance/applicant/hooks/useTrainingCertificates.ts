import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";

import trainingCertificateApi from "../api/training-certificate.api";
import { trainingCertificateKeys } from "../api/training-certificate.keys";

import type {
  CreateTrainingCertificatePayload,
  UpdateTrainingCertificatePayload,
} from "../types/training-certificate.types";

/**
 * Fetch applicant training certificates.
 */
export const useApplicantTrainingCertificates = (
  sectionId: string | undefined,
) => {
  return useQuery({
    queryKey: trainingCertificateKeys.list(sectionId ?? ""),

    queryFn: () =>
      trainingCertificateApi.getTrainingCertificates(sectionId as string),

    enabled: Boolean(sectionId),
  });
};

/**
 * Fetch a single training certificate.
 */
export const useApplicantTrainingCertificate = ({
  sectionId,
  certificateId,
}: {
  sectionId: string | undefined;
  certificateId: string | undefined;
}) => {
  return useQuery({
    queryKey: trainingCertificateKeys.detail(
      sectionId ?? "",
      certificateId ?? "",
    ),

    queryFn: () =>
      trainingCertificateApi.getTrainingCertificateById({
        sectionId: sectionId as string,
        certificateId: certificateId as string,
      }),

    enabled: Boolean(sectionId && certificateId),
  });
};

/**
 * Create a training certificate.
 */
export const useCreateApplicantTrainingCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      payload,
    }: {
      sectionId: string;
      payload: CreateTrainingCertificatePayload;
    }) =>
      trainingCertificateApi.createTrainingCertificate({
        sectionId,
        payload,
      }),

    onSuccess: (_, variables) => {
      notification.success("Training certificate added successfully.");

      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(variables.sectionId),
      });
    },

    onError: () => {
      notification.error("Failed to add training certificate.");
    },
  });
};

/**
 * Update a training certificate.
 */
export const useUpdateApplicantTrainingCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      certificateId,
      payload,
    }: {
      sectionId: string;
      certificateId: string;
      payload: UpdateTrainingCertificatePayload;
    }) =>
      trainingCertificateApi.updateTrainingCertificate({
        sectionId,
        certificateId,
        payload,
      }),

    onSuccess: (certificate, variables) => {
      notification.success("Training certificate updated successfully.");

      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(variables.sectionId),
      });

      queryClient.setQueryData(
        trainingCertificateKeys.detail(variables.sectionId, certificate.id),
        certificate,
      );
    },

    onError: () => {
      notification.error("Failed to update training certificate.");
    },
  });
};

/**
 * Delete a training certificate.
 */
export const useDeleteApplicantTrainingCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sectionId,
      certificateId,
    }: {
      sectionId: string;
      certificateId: string;
    }) =>
      trainingCertificateApi.deleteTrainingCertificate({
        sectionId,
        certificateId,
      }),

    onSuccess: (_, variables) => {
      notification.success("Training certificate deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(variables.sectionId),
      });
    },

    onError: () => {
      notification.error("Failed to delete training certificate.");
    },
  });
};

/**
 * Submit training certificates.
 *
 * The backend validates mandatory requirements.
 */
export const useSubmitApplicantTrainingCertificates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: string) =>
      trainingCertificateApi.submitTrainingCertificates(sectionId),

    onSuccess: (result, sectionId) => {
      notification.success("Training certificates submitted successfully.");

      queryClient.invalidateQueries({
        queryKey: trainingCertificateKeys.list(sectionId),
      });
    },

    onError: () => {
      notification.error("Failed to submit training certificates.");
    },
  });
};
