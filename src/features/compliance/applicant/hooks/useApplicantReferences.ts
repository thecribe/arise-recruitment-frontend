import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";

import referenceApi from "../api/reference.api";

import type {
  CreateApplicantReferencePayload,
  UpdateApplicantReferencePayload,
} from "../types/reference.types";
import { referenceKeys } from "../api/reference.keys";

/**
 * Get all applicant references.
 */
export const useApplicantReferences = () => {
  return useQuery({
    queryKey: referenceKeys.list(),
    queryFn: referenceApi.getReferences,
  });
};

/**
 * Get one applicant reference.
 */
export const useApplicantReference = (referenceId: string | undefined) => {
  return useQuery({
    queryKey: referenceKeys.detail(referenceId ?? ""),
    queryFn: () => referenceApi.getReferenceById(referenceId as string),
    enabled: Boolean(referenceId),
  });
};

/**
 * Create a reference.
 */
export const useCreateApplicantReference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateApplicantReferencePayload) =>
      referenceApi.createReference(payload),

    onSuccess: () => {
      notification.success("Reference added successfully.");

      queryClient.invalidateQueries({
        queryKey: referenceKeys.lists(),
      });
    },

    onError: () => {
      notification.error("Failed to add reference.");
    },
  });
};

/**
 * Update an individual reference.
 */
export const useUpdateApplicantReference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      referenceId,
      payload,
    }: {
      referenceId: string;
      payload: UpdateApplicantReferencePayload;
    }) =>
      referenceApi.updateReference({
        referenceId,
        payload,
      }),

    onSuccess: (reference) => {
      notification.success("Reference updated successfully.");

      queryClient.invalidateQueries({
        queryKey: referenceKeys.lists(),
      });

      queryClient.setQueryData(referenceKeys.detail(reference.id), reference);
    },

    onError: () => {
      notification.error("Failed to update reference.");
    },
  });
};

/**
 * Delete an individual reference.
 */
export const useDeleteApplicantReference = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referenceId: string) =>
      referenceApi.deleteReference(referenceId),

    onSuccess: () => {
      notification.success("Reference deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: referenceKeys.lists(),
      });
    },

    onError: () => {
      notification.error("Failed to delete reference.");
    },
  });
};

/**
 * Submit all eligible references.
 *
 * The backend decides which statuses are eligible.
 */
export const useSubmitApplicantReferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: referenceApi.submitReferences,

    onSuccess: (result) => {
      notification.success(
        `${result.submittedCount} reference(s) submitted successfully.`,
      );

      queryClient.invalidateQueries({
        queryKey: referenceKeys.lists(),
      });
    },

    onError: () => {
      notification.error("Failed to submit references.");
    },
  });
};
