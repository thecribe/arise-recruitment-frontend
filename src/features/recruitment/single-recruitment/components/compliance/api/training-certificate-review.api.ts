/**
 * -----------------------------------------------------------------------------
 * File: training-certificate-review.api.ts
 *
 * Description:
 * API functions for Training Certificate section review.
 * -----------------------------------------------------------------------------
 */

import { instance } from "@/api/client";
import type {
  TrainingCertificateReview,
  TrainingCertificateReviewResponse,
} from "../sections/training/types/training-certificate-review.types";

const getReview = async (
  applicationId: string,
  sectionId: string,
): Promise<TrainingCertificateReviewResponse> => {
  const response = await instance.get(
    `/recruitment-comment-sections/applications/${applicationId}/sections/${sectionId}/review`,
  );

  return response.data.data;
};

const approve = async (
  applicationId: string,
  sectionId: string,
): Promise<TrainingCertificateReview> => {
  const response = await instance.post(
    `/recruitment-comment-sections/applications/${applicationId}/sections/${sectionId}/approve`,
  );

  return response.data.data;
};

const reject = async (
  applicationId: string,
  sectionId: string,
): Promise<TrainingCertificateReview> => {
  const response = await instance.post(
    `/recruitment-comment-sections/applications/${applicationId}/sections/${sectionId}/reject`,
  );

  return response.data.data;
};

export const trainingCertificateReviewApi = {
  getReview,
  approve,
  reject,
};
