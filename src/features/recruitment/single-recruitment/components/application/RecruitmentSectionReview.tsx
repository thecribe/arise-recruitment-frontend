import { useState } from "react";

import { CheckCircle2, Edit3, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";

import type { RecruitmentApplicationSectionDetails } from "@/features/recruitment/types/recruitment.types";

import RecruitmentApplicationFormProvider from "./RecruitmentApplicationFormProvider";
import RecruitmentRepeatableSection from "./RecruitmentRepeatableSection";

import RecruitmentSectionFields from "./RecruitmentSectionFields";
import RecruitmentSectionEditActions from "./RecruitmentSectionEditActions";

interface RecruitmentSectionReviewProps {
  section: RecruitmentApplicationSectionDetails;
}

export default function RecruitmentSectionReview({
  section,
}: RecruitmentSectionReviewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const isApproved = section.status === "approved";

  const isRejected = section.status === "rejected";

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

          {!isApproved && !isEditing && (
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

        {section.review?.comments.length > 0 ? (
          <div className="space-y-3">
            {section.review.comments.map((comment) => (
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
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    {comment.createdBy.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
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
        )}

        {/* --------------------------------------------------------------- */}
        {/* Actions */}
        {/* --------------------------------------------------------------- */}

        {!isApproved && (
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
            {/* Review actions */}

            {!isEditing && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {!isRejected && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    leftIcon={<XCircle className="h-4 w-4" />}
                  >
                    Reject Section
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  leftIcon={<CheckCircle2 className="h-4 w-4" />}
                >
                  Approve Section
                </Button>
              </div>
            )}

            {/* Edit actions */}

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
        )}
      </div>
    </RecruitmentApplicationFormProvider>
  );
}
