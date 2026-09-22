import { instance } from "@/api/client";
import type {
  Interview,
  InterviewFormValues,
  InterviewNote,
} from "../types/interview.types";
import payloadToFormData from "@/components/forms/utils/payloadToFormData";

/**
 * --------------------------------------------------------------------------
 * API Response
 * --------------------------------------------------------------------------
 */

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * --------------------------------------------------------------------------
 * Interview API
 * --------------------------------------------------------------------------
 */

const INTERVIEW_BASE_URL = "/applicant-application/interview";

export const getInterview = async (
  applicationId: string,
): Promise<Interview> => {
  const response = await instance.get<ApiResponse<Interview>>(
    `${INTERVIEW_BASE_URL}/${applicationId}`,
  );

  return response.data.data;
};

export const createInterview = async (
  applicationId: string,
  data: InterviewFormValues,
): Promise<Interview> => {
  const formData = payloadToFormData(data);
  const response = await instance.post<ApiResponse<Interview>>(
    `${INTERVIEW_BASE_URL}/${applicationId}`,
    formData,
  );

  return response.data.data;
};

export const updateInterview = async (
  applicationId: string,
  data: Partial<InterviewFormValues>,
): Promise<Interview> => {
  const formData = payloadToFormData(data);
  const response = await instance.patch<ApiResponse<Interview>>(
    `${INTERVIEW_BASE_URL}/${applicationId}`,
    formData,
  );

  return response.data.data;
};

/**
 * --------------------------------------------------------------------------
 * Interview Notes API
 * --------------------------------------------------------------------------
 */

export const getInterviewNotes = async (
  interviewId: string,
): Promise<InterviewNote[]> => {
  const response = await instance.get<ApiResponse<InterviewNote[]>>(
    `${INTERVIEW_BASE_URL}/${interviewId}/notes`,
  );
  console.log(response.data);
  return response.data.data;
};

export const createInterviewNote = async (
  interviewId: string,
  content: string,
): Promise<InterviewNote> => {
  const response = await instance.post<ApiResponse<InterviewNote>>(
    `${INTERVIEW_BASE_URL}/${interviewId}/notes`,
    { content },
  );

  return response.data.data;
};

export const updateInterviewNote = async (
  noteId: string,
  content: string,
): Promise<InterviewNote> => {
  const response = await instance.patch<ApiResponse<InterviewNote>>(
    `${INTERVIEW_BASE_URL}/notes/${noteId}`,
    { content },
  );

  return response.data.data;
};

export const deleteInterviewNote = async (
  noteId: string,
): Promise<{ id: string; deleted: boolean }> => {
  const response = await instance.delete<
    ApiResponse<{ id: string; deleted: boolean }>
  >(`${INTERVIEW_BASE_URL}/notes/${noteId}`);

  return response.data.data;
};
