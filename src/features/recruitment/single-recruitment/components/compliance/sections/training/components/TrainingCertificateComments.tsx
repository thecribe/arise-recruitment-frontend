/**
 * -----------------------------------------------------------------------------
 * File: TrainingCertificateComments.tsx
 *
 * Description:
 * Container for Training Certificate section review comments.
 *
 * Responsibilities:
 * - Fetch Training Certificate comments
 * - Create comments
 * - Update comments
 * - Delete comments
 * - Manage mutation state
 *
 * The actual comment UI is handled by RecruitmentSectionComments.
 *
 * Comments belong to the RecruitmentCommentSection identified by sectionId.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";
import {
  useAddTrainingCertificateComment,
  useDeleteTrainingCertificateComment,
  useTrainingCertificateComments,
  useUpdateTrainingCertificateComment,
} from "../../../hooks/useTrainingCertificateComments";
import RecruitmentSectionComments from "../../../../application/RecruitmentSectionComments";
import { Loader2 } from "lucide-react";

interface TrainingCertificateCommentsProps {
  applicationId: string;
  sectionId: string;
}

const TrainingCertificateComments = ({
  applicationId,
  sectionId,
}: TrainingCertificateCommentsProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useTrainingCertificateComments(
    applicationId,
    sectionId,
  );

  const addComment = useAddTrainingCertificateComment(applicationId, sectionId);

  const updateComment = useUpdateTrainingCertificateComment(
    applicationId,
    sectionId,
    editingCommentId ?? "",
  );

  const deleteComment = useDeleteTrainingCertificateComment(
    applicationId,
    sectionId,
    deletingCommentId ?? "",
  );

  const comments = data ?? [];

  const handleAddComment = async (comment: string) => {
    await addComment.mutateAsync({ comment });
  };

  const handleUpdateComment = async (commentId: string, comment: string) => {
    setEditingCommentId(commentId);

    try {
      await updateComment.mutateAsync({ comment });
    } finally {
      setEditingCommentId(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment.mutateAsync();
    } finally {
      setDeletingCommentId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-blue-100/70 bg-white/40 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

          <p className="mt-3 text-sm font-medium text-slate-700">
            Loading review comments...
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Please wait while the training certificate comments are loaded.
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 backdrop-blur-xl">
        <p className="text-sm font-medium text-red-700">
          Unable to load review comments.
        </p>

        <p className="mt-1 text-xs text-red-600">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <RecruitmentSectionComments
      comments={comments}
      onAddComment={handleAddComment}
      onUpdateComment={handleUpdateComment}
      onDeleteComment={handleDeleteComment}
      isAdding={addComment.isPending}
      updatingCommentId={updateComment.isPending ? editingCommentId : null}
      deletingCommentId={deleteComment.isPending ? deletingCommentId : null}
    />
  );
};

export default TrainingCertificateComments;
