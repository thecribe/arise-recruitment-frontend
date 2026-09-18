/**
 * -----------------------------------------------------------------------------
 * File: training-certificate-comments.api.ts
 * -----------------------------------------------------------------------------
 */

import { instance } from "@/api/client";
import type {
  CreateTrainingCertificateCommentPayload,
  TrainingCertificateComment,
  UpdateTrainingCertificateCommentPayload,
} from "../sections/training/types/training-certificate-comment.types";

const getComments = async (
  applicationId: string,
  sectionId: string,
): Promise<TrainingCertificateComment[]> => {
  const response = await instance.get(
    `/recruitment/training-certificates/applications/${applicationId}/sections/${sectionId}/comments`,
  );

  return response.data.data;
};

const createComment = async (
  applicationId: string,
  sectionId: string,
  data: CreateTrainingCertificateCommentPayload,
): Promise<TrainingCertificateComment> => {
  const response = await instance.post(
    `/recruitment/training-certificates/applications/${applicationId}/sections/${sectionId}/comments`,
    data,
  );

  return response.data.data;
};

const updateComment = async (
  applicationId: string,
  sectionId: string,
  commentId: string,
  data: UpdateTrainingCertificateCommentPayload,
): Promise<TrainingCertificateComment> => {
  const response = await instance.patch(
    `/recruitment/training-certificates/applications/${applicationId}/sections/${sectionId}/comments/${commentId}`,
    data,
  );

  return response.data.data;
};

const deleteComment = async (
  applicationId: string,
  sectionId: string,
  commentId: string,
): Promise<void> => {
  await instance.delete(
    `/recruitment/training-certificates/applications/${applicationId}/sections/${sectionId}/comments/${commentId}`,
  );
};

export const trainingCertificateCommentsApi = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
