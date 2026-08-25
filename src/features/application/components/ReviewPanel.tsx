/**
 * -----------------------------------------------------------------------------
 * File: ReviewPanel.tsx
 *
 * Description:
 * Applicant-facing review panel for an application section.
 *
 * Displays:
 *
 * - Current section review status
 * - Status guidance
 * - Recruitment manager comments
 * - Comment history
 * - Edited state
 * - Review timestamps
 *
 * Comments are displayed independently of section status.
 * -----------------------------------------------------------------------------
 */

import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileEdit,
  Loader2,
  MessageSquare,
  RefreshCcw,
} from "lucide-react";

import { useApplicationContext } from "../context/ApplicationContext";
import { SECTION_STATUS } from "../constants/section-status";

import { useSectionReviewComments } from "../hooks/useSectionReviewComments";

export default function ReviewPanel() {
  const { activeApplicantSection } = useApplicationContext();

  const status = activeApplicantSection.status;

  /**
   * ---------------------------------------------------------------------------
   * Fetch section review comments.
   *
   * The backend resolves the authenticated applicant and application.
   * The frontend only provides the current section ID.
   * ---------------------------------------------------------------------------
   */

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useSectionReviewComments(activeApplicantSection.sectionId);

  /**
   * ---------------------------------------------------------------------------
   * Hide only when the section is locked.
   *
   * Comments themselves are independent of section status.
   * ---------------------------------------------------------------------------
   */

  if (status === SECTION_STATUS.LOCKED) {
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   * Status configuration.
   * ---------------------------------------------------------------------------
   */

  const config = {
    [SECTION_STATUS.SUBMITTED]: {
      icon: Clock3,

      title: "Awaiting Review",

      description:
        "Your information has been submitted and is currently waiting to be reviewed by the recruitment team.",

      containerClass: "border-amber-200/80 bg-amber-50/70 text-amber-950",

      iconContainerClass: "border-amber-200 bg-amber-100 text-amber-600",

      badgeClass: "border-amber-200 bg-amber-100 text-amber-700",
    },

    [SECTION_STATUS.IN_PROGRESS]: {
      icon: FileEdit,

      title: "Action Required",

      description:
        "This section is currently being worked on. Please review any feedback from the recruitment team and update your information if necessary.",

      containerClass: "border-blue-200/80 bg-blue-50/70 text-blue-950",

      iconContainerClass: "border-blue-200 bg-blue-100 text-blue-600",

      badgeClass: "border-blue-200 bg-blue-100 text-blue-700",
    },

    [SECTION_STATUS.APPROVED]: {
      icon: CheckCircle2,

      title: "Section Approved",

      description:
        "The recruitment team has reviewed and approved this section. No further action is currently required.",

      containerClass: "border-emerald-200/80 bg-emerald-50/70 text-emerald-950",

      iconContainerClass: "border-emerald-200 bg-emerald-100 text-emerald-600",

      badgeClass: "border-emerald-200 bg-emerald-100 text-emerald-700",
    },

    [SECTION_STATUS.REJECTED]: {
      icon: AlertCircle,

      title: "Changes Requested",

      description:
        "The recruitment team requires changes to the information in this section. Please review the feedback below and update your submission.",

      containerClass: "border-red-200/80 bg-red-50/70 text-red-950",

      iconContainerClass: "border-red-200 bg-red-100 text-red-600",

      badgeClass: "border-red-200 bg-red-100 text-red-700",
    },
  };

  const current = config[status];

  /**
   * Fallback protection.
   */

  if (!current) {
    return null;
  }
  console.log(comments);
  const StatusIcon = current.icon;

  /**
   * ---------------------------------------------------------------------------
   * Determine whether a comment was edited.
   * ---------------------------------------------------------------------------
   */

  const isCommentEdited = (createdAt?: string, updatedAt?: string): boolean => {
    if (!createdAt || !updatedAt) {
      return false;
    }

    return new Date(updatedAt).getTime() > new Date(createdAt).getTime();
  };

  return (
    <div className="space-y-5">
      {/* --------------------------------------------------------------------- */}
      {/* Current review status */}
      {/* --------------------------------------------------------------------- */}

      <section
        className={`
          overflow-hidden
          rounded-2xl
          border
          backdrop-blur-sm
          ${current.containerClass}
        `}
      >
        <div className="p-5 sm:p-6">
          <div className="flex gap-4">
            {/* Status icon */}

            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                ${current.iconContainerClass}
              `}
            >
              <StatusIcon className="h-5 w-5" />
            </div>

            {/* Status content */}

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold sm:text-lg">
                  {current.title}
                </h3>

                <span
                  className={`
                    w-fit
                    rounded-full
                    border
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    ${current.badgeClass}
                  `}
                >
                  {status.replace("_", " ")}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 opacity-80">
                {current.description}
              </p>

              {/* Approved date */}

              {status === SECTION_STATUS.APPROVED &&
                activeApplicantSection.approvedAt && (
                  <div className="mt-4 flex items-center gap-2 text-xs opacity-70">
                    <CheckCircle2 className="h-4 w-4" />

                    <span>
                      Approved on{" "}
                      {new Date(
                        activeApplicantSection.approvedAt,
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Recruitment feedback */}
      {/* --------------------------------------------------------------------- */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200/80
          bg-white/70
          shadow-sm
          backdrop-blur-xl
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-slate-200/70
            px-5
            py-4
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
              "
            >
              <MessageSquare className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                Recruitment Feedback
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Messages and updates from the recruitment team.
              </p>
            </div>
          </div>

          {!isLoading && comments.length > 0 && (
            <span
              className="
                rounded-full
                bg-slate-100
                px-2.5
                py-1
                text-xs
                font-medium
                text-slate-600
              "
            >
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          )}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Loading */}
        {/* ----------------------------------------------------------------- */}

        {isLoading && (
          <div className="flex items-center justify-center gap-3 px-5 py-10">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />

            <span className="text-sm text-slate-500">
              Loading recruitment feedback...
            </span>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Error */}
        {/* ----------------------------------------------------------------- */}

        {!isLoading && isError && (
          <div className="px-5 py-8 text-center sm:px-6">
            <AlertCircle className="mx-auto h-8 w-8 text-red-400" />

            <p className="mt-3 text-sm font-medium text-slate-700">
              Unable to load recruitment feedback.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Empty */}
        {/* ----------------------------------------------------------------- */}

        {!isLoading && !isError && comments.length === 0 && (
          <div className="px-5 py-10 text-center sm:px-6">
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-slate-50
                text-slate-400
              "
            >
              <MessageSquare className="h-6 w-6" />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-700">
              No feedback yet
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Any comments or feedback from the recruitment team will appear
              here.
            </p>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Comments */}
        {/* ----------------------------------------------------------------- */}

        {!isLoading && !isError && comments.length > 0 && (
          <div className="divide-y divide-slate-100">
            {comments.map(
              (
                comment: {
                  createdAt: string;
                  updatedAt: string;
                  id: string;
                  comment: string;
                },
                index: number,
              ) => {
                if (!comment) return null;
                const edited = isCommentEdited(
                  comment.createdAt,
                  comment.updatedAt,
                );

                return (
                  <article
                    key={comment.id}
                    className="
                    relative
                    px-5
                    py-5
                    transition-colors
                    hover:bg-slate-50/70
                    sm:px-6
                  "
                  >
                    {/* Timeline indicator */}

                    <div className="flex gap-4">
                      <div
                        className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-50
                        text-xs
                        font-semibold
                        text-blue-600
                      "
                      >
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        {/* Comment metadata */}

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-800">
                              Recruitment Team
                            </p>

                            {edited && (
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <RefreshCcw className="h-3 w-3" />
                                Edited
                              </span>
                            )}
                          </div>

                          <time className="text-xs text-slate-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </time>
                        </div>

                        {/* Comment */}

                        <div
                          className="
                          mt-3
                          rounded-xl
                          border
                          border-slate-100
                          bg-slate-50/80
                          p-4
                        "
                        >
                          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        )}
      </section>
    </div>
  );
}
