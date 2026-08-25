/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentSectionComments.tsx
 *
 * Description:
 * Displays and manages Recruitment Manager review comments
 * for an application section.
 *
 * Supports:
 * - Add multiple comments
 * - Edit comments
 * - Delete comments
 *
 * Persistence is owned by the parent component.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import {
  Check,
  MessageSquarePlus,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { RecruitmentSectionComment } from "@/features/recruitment/types/recruitment.types";

interface RecruitmentSectionCommentsProps {
  comments?: RecruitmentSectionComment[];

  /**
   * Create a new comment.
   */
  onAddComment: (comment: string) => Promise<void> | void;

  /**
   * Update an existing comment.
   */
  onUpdateComment: (commentId: string, comment: string) => Promise<void> | void;

  /**
   * Delete an existing comment.
   */
  onDeleteComment: (commentId: string) => Promise<void> | void;

  isAdding?: boolean;

  updatingCommentId?: string | null;

  deletingCommentId?: string | null;
}

export default function RecruitmentSectionComments({
  comments = [],
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  isAdding = false,
  updatingCommentId = null,
  deletingCommentId = null,
}: RecruitmentSectionCommentsProps) {
  const [isCreating, setIsCreating] = useState(false);

  const [newComment, setNewComment] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [editingValue, setEditingValue] = useState("");

  /**
   * ---------------------------------------------------------------------------
   * Add comment
   * ---------------------------------------------------------------------------
   */

  const handleAddComment = async () => {
    const comment = newComment.trim();

    if (!comment || isAdding) {
      return;
    }

    await onAddComment(comment);

    setNewComment("");
    setIsCreating(false);
  };

  /**
   * ---------------------------------------------------------------------------
   * Start editing
   * ---------------------------------------------------------------------------
   */

  const handleStartEdit = (comment: RecruitmentSectionComment) => {
    setEditingCommentId(comment.id);

    setEditingValue(comment.comment);

    setIsCreating(false);
  };

  /**
   * ---------------------------------------------------------------------------
   * Cancel editing
   * ---------------------------------------------------------------------------
   */

  const handleCancelEdit = () => {
    setEditingCommentId(null);

    setEditingValue("");
  };

  /**
   * ---------------------------------------------------------------------------
   * Save edited comment
   * ---------------------------------------------------------------------------
   */

  const handleSaveEdit = async (commentId: string) => {
    const comment = editingValue.trim();

    if (!comment || updatingCommentId) {
      return;
    }

    await onUpdateComment(commentId, comment);

    setEditingCommentId(null);

    setEditingValue("");
  };

  /**
   * ---------------------------------------------------------------------------
   * Delete comment
   * ---------------------------------------------------------------------------
   */

  const handleDelete = async (commentId: string) => {
    if (deletingCommentId) {
      return;
    }

    await onDeleteComment(commentId);
  };

  return (
    <div className="space-y-4">
      {/* --------------------------------------------------------------- */}
      {/* Header */}
      {/* --------------------------------------------------------------- */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">
            Review Comments
          </h4>

          <p className="mt-1 text-xs text-slate-500">
            Add comments and feedback for this section.
          </p>
        </div>

        {!isCreating && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<MessageSquarePlus className="h-4 w-4" />}
            onClick={() => {
              setIsCreating(true);
              setEditingCommentId(null);
            }}
          >
            Add Comment
          </Button>
        )}
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Add comment */}
      {/* --------------------------------------------------------------- */}

      {isCreating && (
        <div
          className="
            rounded-2xl
            border
            border-blue-100
            bg-blue-50/40
            p-4
            sm:p-5
          "
        >
          <Textarea
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            placeholder="Write a review comment..."
            rows={4}
            disabled={isAdding}
          />

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<X className="h-4 w-4" />}
              disabled={isAdding}
              onClick={() => {
                setIsCreating(false);
                setNewComment("");
              }}
            >
              Cancel
            </Button>

            <Button
              type="button"
              size="sm"
              leftIcon={<Save className="h-4 w-4" />}
              disabled={!newComment.trim() || isAdding}
              onClick={handleAddComment}
            >
              {isAdding ? "Saving..." : "Save Comment"}
            </Button>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------- */}
      {/* Comments */}
      {/* --------------------------------------------------------------- */}

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => {
            const isEditingComment = editingCommentId === comment.id;

            const isUpdating = updatingCommentId === comment.id;

            const isDeleting = deletingCommentId === comment.id;

            return (
              <div
                key={comment.id}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50/60
                  p-4
                "
              >
                <div className="flex gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        {comment.createdBy.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {!isEditingComment && (
                    <div className="flex shrink-0 items-start gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => handleStartEdit(comment)}
                        aria-label="Edit comment"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => handleDelete(comment.id)}
                        aria-label="Delete comment"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>

                {isEditingComment ? (
                  <div className="mt-3">
                    <Textarea
                      value={editingValue}
                      onChange={(event) => setEditingValue(event.target.value)}
                      rows={4}
                      disabled={isUpdating}
                    />

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        leftIcon={<X className="h-4 w-4" />}
                        disabled={isUpdating}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        leftIcon={<Check className="h-4 w-4" />}
                        disabled={!editingValue.trim() || isUpdating}
                        onClick={() => handleSaveEdit(comment.id)}
                      >
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {comment.comment}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        !isCreating && (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-200
              p-5
              text-center
            "
          >
            <p className="text-sm text-slate-500">No review comments yet.</p>
          </div>
        )
      )}
    </div>
  );
}
