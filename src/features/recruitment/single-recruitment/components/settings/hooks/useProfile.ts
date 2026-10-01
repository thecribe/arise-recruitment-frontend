import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/components/feedback/notification";

import { profileApi } from "../api/profile.api";
import { profileKeys } from "../api/profile.keys";

import type {
  ProfileFormValues,
  UpdateEmailPayload,
  UpdatePasswordPayload,
} from "../types/profile.types";

const getErrorMessage = (error: unknown, fallback: string) => {
  const axiosError = error as {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  return axiosError.response?.data?.message || fallback;
};

/**
 * Update applicant profile details.
 */
export const useUpdateProfile = (applicantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ProfileFormValues) =>
      profileApi.updateProfile(applicantId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.detail(applicantId),
      });

      notification.success("Profile updated successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(error, "Unable to update profile. Please try again."),
      );
    },
  });
};

/**
 * Update applicant email.
 */
export const useUpdateProfileEmail = (applicantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: UpdateEmailPayload) =>
      profileApi.updateEmail(applicantId, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.detail(applicantId),
      });

      notification.success("Email updated successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(error, "Unable to update email. Please try again."),
      );
    },
  });
};

/**
 * Update applicant password.
 */
export const useUpdateProfilePassword = (applicantId: string) => {
  return useMutation({
    mutationFn: (values: UpdatePasswordPayload) =>
      profileApi.updatePassword(applicantId, values),

    onSuccess: () => {
      notification.success("Password updated successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(error, "Unable to update password. Please try again."),
      );
    },
  });
};

export const useProfile = (applicantId: string) => {
  return useQuery({
    queryKey: profileKeys.detail(applicantId),
    queryFn: () => profileApi.getProfile(applicantId),
    enabled: Boolean(applicantId),
  });
};

export const useUpdateJobType = (applicantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: { job_type_id: string }) =>
      profileApi.updateJobType(applicantId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", applicantId],
      });
      notification.success("Job type updated successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(error, "Unable to update job type. Please try again."),
      );
    },
  });
};
