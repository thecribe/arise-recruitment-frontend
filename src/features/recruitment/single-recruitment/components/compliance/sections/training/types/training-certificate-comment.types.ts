/**
 * -----------------------------------------------------------------------------
 * File: training-certificate-comment.types.ts
 *
 * Description:
 * Types used by the Training Certificates section review comments.
 *
 * Comments belong to the Training Certificates section of an application,
 * not to an individual training certificate.
 * -----------------------------------------------------------------------------
 */

export interface TrainingCertificateCommentCreatedBy {
  id: string;
  name: string;
}

export interface TrainingCertificateComment {
  id: string;
  application_id: string;
  section_id: string;
  comment: string;
  createdBy: TrainingCertificateCommentCreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrainingCertificateCommentPayload {
  comment: string;
}

export interface UpdateTrainingCertificateCommentPayload {
  comment: string;
}
