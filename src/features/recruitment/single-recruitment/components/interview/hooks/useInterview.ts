import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createInterview,
  createInterviewNote,
  deleteInterviewNote,
  getInterview,
  getInterviewNotes,
  updateInterview,
  updateInterviewNote,
} from "../api/interview.api";

import type { InterviewFormValues } from "../types/interview.types";
import { notification } from "@/components/feedback/notification";

// -----------------------------------------------------------------------------
// Query Keys
// -----------------------------------------------------------------------------

export const interviewQueryKeys = {
  all: ["interviews"] as const,

  detail: (applicationId: string) =>
    [...interviewQueryKeys.all, "detail", applicationId] as const,

  notes: (interviewId: string) =>
    [...interviewQueryKeys.all, "notes", interviewId] as const,
};

// -----------------------------------------------------------------------------
// Error Helper
// -----------------------------------------------------------------------------

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  const axiosError = error as {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  return axiosError.response?.data?.message || fallbackMessage;
};

// -----------------------------------------------------------------------------
// Get Interview
// -----------------------------------------------------------------------------

export const useInterview = (applicationId: string) => {
  return useQuery({
    queryKey: interviewQueryKeys.detail(applicationId),
    queryFn: () => getInterview(applicationId),
    enabled: Boolean(applicationId),
  });
};

// -----------------------------------------------------------------------------
// Create Interview
// -----------------------------------------------------------------------------

export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: string;
      data: InterviewFormValues;
    }) => createInterview(applicationId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: interviewQueryKeys.detail(variables.applicationId),
      });

      notification.success("Interview scoresheet created successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to create interview scoresheet. Please try again.",
        ),
      );
    },
  });
};

// -----------------------------------------------------------------------------
// Update Interview
// -----------------------------------------------------------------------------

export const useUpdateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      data,
    }: {
      applicationId: string;
      data: Partial<InterviewFormValues>;
    }) => updateInterview(applicationId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: interviewQueryKeys.detail(variables.applicationId),
      });

      notification.success("Interview scoresheet updated successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to update interview scoresheet. Please try again.",
        ),
      );
    },
  });
};

// -----------------------------------------------------------------------------
// Get Interview Notes
// -----------------------------------------------------------------------------

export const useInterviewNotes = (interviewId: string) => {
  return useQuery({
    queryKey: interviewQueryKeys.notes(interviewId),
    queryFn: () => getInterviewNotes(interviewId),
    enabled: Boolean(interviewId),
  });
};

// -----------------------------------------------------------------------------
// Create Interview Note
// -----------------------------------------------------------------------------

export const useCreateInterviewNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      interviewId,
      content,
    }: {
      interviewId: string;
      content: string;
    }) => createInterviewNote(interviewId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: interviewQueryKeys.notes(variables.interviewId),
      });

      notification.success("Interview note added successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to add interview note. Please try again.",
        ),
      );
    },
  });
};

// -----------------------------------------------------------------------------
// Update Interview Note
// -----------------------------------------------------------------------------

export const useUpdateInterviewNote = (interviewId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, content }: { noteId: string; content: string }) =>
      updateInterviewNote(noteId, content),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: interviewQueryKeys.notes(interviewId),
      });

      notification.success("Interview note updated successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to update interview note. Please try again.",
        ),
      );
    },
  });
};

// -----------------------------------------------------------------------------
// Delete Interview Note
// -----------------------------------------------------------------------------

export const useDeleteInterviewNote = (interviewId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }: { noteId: string }) => deleteInterviewNote(noteId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: interviewQueryKeys.notes(interviewId),
      });

      notification.success("Interview note deleted successfully.");
    },

    onError: (error: unknown) => {
      notification.error(
        getErrorMessage(
          error,
          "Unable to delete interview note. Please try again.",
        ),
      );
    },
  });
};
