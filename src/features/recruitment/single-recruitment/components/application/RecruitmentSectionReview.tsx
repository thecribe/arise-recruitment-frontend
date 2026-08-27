import { useState } from "react";

import { Edit3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";

import type { RecruitmentApplicationSectionDetails } from "@/features/recruitment/types/recruitment.types";

import RecruitmentApplicationFormProvider from "./RecruitmentApplicationFormProvider";
import RecruitmentRepeatableSection from "./RecruitmentRepeatableSection";

import RecruitmentSectionFields from "./RecruitmentSectionFields";
import RecruitmentSectionEditActions from "./RecruitmentSectionEditActions";
import RecruitmentSectionComments from "./RecruitmentSectionComments";
import { useCreateRecruitmentSectionComment } from "@/features/recruitment/hooks/useCreateRecruitmentSectionComment";
import { useUpdateRecruitmentSectionComment } from "@/features/recruitment/hooks/useUpdateRecruitmentSectionComment";
import { useDeleteRecruitmentSectionComment } from "@/features/recruitment/hooks/useDeleteRecruitmentSectionComment";
import RecruitmentSectionReviewActions from "./RecruitmentSectionReviewActions";
import { useUpdateRecruitmentApplicationSectionStatus } from "@/features/recruitment/hooks/useUpdateRecruitmentApplicationSectionStatus";

interface RecruitmentSectionReviewProps {
  section: RecruitmentApplicationSectionDetails;
  applicationId: string;
}

export default function RecruitmentSectionReview({
  section,
  applicationId,
}: RecruitmentSectionReviewProps) {
  const createCommentMutation = useCreateRecruitmentSectionComment();

  const updateCommentMutation = useUpdateRecruitmentSectionComment();

  const deleteCommentMutation = useDeleteRecruitmentSectionComment();
  const updateSectionStatusMutation =
    useUpdateRecruitmentApplicationSectionStatus();

  const [isEditing, setIsEditing] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<
    "approved" | "rejected" | "in_progress" | null
  >(null);

  const canManagerEdit = ["in_progress", "submitted", "rejected"].includes(
    section.status,
  );

  /**
   * Normalize repeatable values.
   */
  const entries =
    section.repeatable && Array.isArray(section.values)
      ? section.values.map((values, index) => ({
          id: `${section.id}-${index}`,
          values,
        }))
      : [];

  const handleSectionStatusUpdate = async (
    status: "approved" | "rejected" | "in_progress",
    comment?: string,
  ) => {
    if (!applicationId || !section) {
      return;
    }

    setUpdatingStatus(status);

    try {
      await updateSectionStatusMutation.mutateAsync({
        applicationId,
        sectionId: section.id,
        status,
        comment,
      });
    } finally {
      setUpdatingStatus(null);
    }
  };
  return (
    <RecruitmentApplicationFormProvider key={section.id} section={section}>
      <div className="space-y-6">
        {/* --------------------------------------------------------------- */}
        {/* Section heading */}
        {/* --------------------------------------------------------------- */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">
              {section.title}
            </h3>

            {section.description ? (
              <p className="mt-1 text-sm text-slate-500">
                {section.description}
              </p>
            ) : (
              <p className="mt-1 text-sm text-slate-500">
                Review the information submitted by the applicant.
              </p>
            )}
          </div>

          {canManagerEdit && !isEditing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Edit3 className="h-4 w-4" />}
              onClick={() => setIsEditing(true)}
            >
              Edit Application
            </Button>
          )}
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Submitted information */}
        {/* --------------------------------------------------------------- */}

        <GlassCard className="p-4 sm:p-6">
          {section.repeatable ? (
            <RecruitmentRepeatableSection
              sectionTitle={section.title}
              fields={section.fields ?? []}
              sectionId={section.id}
              entries={entries}
              isEditing={isEditing}
            />
          ) : (
            <RecruitmentSectionFields
              fields={section.fields ?? []}
              isEditing={isEditing}
            />
          )}
        </GlassCard>

        {/* --------------------------------------------------------------- */}
        {/* Review comments */}
        {/* --------------------------------------------------------------- */}

        <RecruitmentSectionComments
          comments={section.review?.comments ?? []}
          isAdding={createCommentMutation.isPending}
          updatingCommentId={
            updateCommentMutation.isPending
              ? (updateCommentMutation.variables?.commentId ?? null)
              : null
          }
          deletingCommentId={
            deleteCommentMutation.isPending
              ? (deleteCommentMutation.variables?.commentId ?? null)
              : null
          }
          onAddComment={async (comment) => {
            await createCommentMutation.mutateAsync({
              applicationId,
              sectionId: section.id,
              comment,
            });
          }}
          onUpdateComment={async (commentId, comment) => {
            await updateCommentMutation.mutateAsync({
              commentId,
              applicationId,
              sectionId: section.id,
              comment,
            });
          }}
          onDeleteComment={async (commentId) => {
            await deleteCommentMutation.mutateAsync({
              commentId,
            });
          }}
        />

        {/* --------------------------------------------------------------- */}
        {/* Actions */}
        {/* --------------------------------------------------------------- */}

        <div
          className="
    flex
    flex-col
    gap-3
    border-t
    border-slate-200
    pt-5
    sm:flex-row
    sm:items-center
    sm:justify-between
  "
        >
          {/* --------------------------------------------------------------- */}
          {/* Status actions */}
          {/* --------------------------------------------------------------- */}

          {!isEditing && (
            <RecruitmentSectionReviewActions
              sectionStatus={section.status}
              onApprove={() => handleSectionStatusUpdate("approved")}
              onReject={(comment) =>
                handleSectionStatusUpdate("rejected", comment)
              }
              onMarkInProgress={() => handleSectionStatusUpdate("in_progress")}
              isApproving={
                updatingStatus === "approved" &&
                updateSectionStatusMutation.isPending
              }
              isRejecting={
                updatingStatus === "rejected" &&
                updateSectionStatusMutation.isPending
              }
              isMarkingInProgress={
                updatingStatus === "in_progress" &&
                updateSectionStatusMutation.isPending
              }
            />
          )}

          {/* --------------------------------------------------------------- */}
          {/* Edit actions */}
          {/* --------------------------------------------------------------- */}

          {isEditing && (
            <div className="sm:ml-auto">
              <RecruitmentSectionEditActions
                sectionId={section.id}
                repeatable={section.repeatable}
                onCancel={() => setIsEditing(false)}
                onSave={(values) => {
                  console.log("Section values to save:", values, section.id);

                  setIsEditing(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </RecruitmentApplicationFormProvider>
  );
}
