import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  ReferenceFormValues,
  ManagerReference,
  ReferenceResponseApiPayload,
} from "@/features/recruitment/types/reference.types";
import { referenceApi } from "../api/reference.api";
import { referenceKeys } from "../api/reference.keys";
import { notification } from "@/components/feedback/notification";

/**
 * ---------------------------------------------------------------------------
 * Get Manager References
 * ---------------------------------------------------------------------------
 */

export const useManagerReferences = (applicationId: string, enabled = true) => {
  return useQuery({
    queryKey: referenceKeys.list(applicationId),
    queryFn: () => referenceApi.getReferences(applicationId),
    enabled: Boolean(applicationId) && enabled,
  });
};

/**
 * ---------------------------------------------------------------------------
 * Get Reference Response
 * ---------------------------------------------------------------------------
 */

export const useReferenceResponse = (
  applicationId: string,
  referenceId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: referenceKeys.response(applicationId, referenceId),
    queryFn: () =>
      referenceApi.getReferenceResponse(applicationId, referenceId),
    enabled: Boolean(applicationId) && Boolean(referenceId) && enabled,
  });
};

/**
 * ---------------------------------------------------------------------------
 * Create Reference
 * ---------------------------------------------------------------------------
 */

export const useCreateReference = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReferenceFormValues) =>
      referenceApi.createReference(applicationId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });

      notification.success("Reference created successfully.");
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
          "Unable to create reference. Please try again.",
      );
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Update Applicant Reference
 * ---------------------------------------------------------------------------
 */

export const useUpdateReference = (
  applicationId: string,
  referenceId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReferenceFormValues) =>
      referenceApi.updateReference(applicationId, referenceId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });
      notification.success("Reference Updated successfully.");
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
          "Unable to Updated reference. Please try again.",
      );
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Update Manager Reference
 * ---------------------------------------------------------------------------
 */

export const useUpdateManagerReference = (
  applicationId: string,
  referenceId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReferenceFormValues) =>
      referenceApi.updateManagerReference(applicationId, referenceId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Submit References
 * ---------------------------------------------------------------------------
 */

export const useSubmitReferences = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => referenceApi.submitReferences(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Save Manager Reference Response
 * ---------------------------------------------------------------------------
 */

export const useSaveManagerReferenceResponse = (
  applicationId: string,
  referenceId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReferenceResponseApiPayload) =>
      referenceApi.saveManagerReferenceResponse(
        applicationId,
        referenceId,
        values,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });

      queryClient.invalidateQueries({
        queryKey: referenceKeys.response(applicationId, referenceId),
      });
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Update Reference Status
 * ---------------------------------------------------------------------------
 */

export const useUpdateReferenceStatus = (
  applicationId: string,
  referenceId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: ManagerReference["status"]) =>
      referenceApi.updateReferenceStatus(applicationId, referenceId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });

      queryClient.invalidateQueries({
        queryKey: referenceKeys.response(applicationId, referenceId),
      });
    },
  });
};

/**
 * ---------------------------------------------------------------------------
 * Send Reference
 * ---------------------------------------------------------------------------
 */
export const useSendReference = (
  applicationId: string,
  referenceId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => referenceApi.sendReference(applicationId, referenceId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: referenceKeys.list(applicationId),
      });
    },
  });
};
