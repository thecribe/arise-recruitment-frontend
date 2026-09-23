import { useState } from "react";

import { FileText } from "lucide-react";

import { useInterviewScoresheetDocument } from "../hooks/useInterviewScoresheetDocument";
import { InterviewScoresheetPreviewModal } from "../pdf/InterviewScoresheetPreviewModal";

interface InterviewScoresheetDocumentProps {
  applicationId: string;
}

export const InterviewScoresheetDocument = ({
  applicationId,
}: InterviewScoresheetDocumentProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {
    data: documentData,
    isLoading,
    isError,
    refetch,
  } = useInterviewScoresheetDocument(applicationId);

  const handleOpenPreview = () => {
    if (!documentData) return;

    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/20 bg-white/60 p-5 shadow-lg backdrop-blur-xl dark:bg-slate-900/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Interview Scoresheet
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  View the applicant's interview assessment and score.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isLoading || !documentData}
              onClick={handleOpenPreview}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Preview PDF"}
            </button>
          </div>

          {isError && (
            <div className="mt-4 flex flex-col gap-3 rounded-xl bg-red-50 p-4 dark:bg-red-950/30">
              <p className="text-sm text-red-600 dark:text-red-400">
                Unable to load the interview scoresheet.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="w-fit rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !documentData && !isError && (
            <div className="mt-4 rounded-xl bg-slate-100/70 p-4 dark:bg-slate-800/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No interview scoresheet is available for this applicant.
              </p>
            </div>
          )}

          {documentData && (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-blue-50/70 p-4 dark:bg-blue-950/30">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Interviewer
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {documentData.interview.interviewerName}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50/70 p-4 dark:bg-blue-950/30">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Interview Date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {documentData.interview.interviewDate}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50/70 p-4 dark:bg-blue-950/30">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Normalized Score
                </p>

                <p className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {documentData.interview.normalizedScore ?? "—"} /{" "}
                  {documentData.interview.totalScore}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <InterviewScoresheetPreviewModal
        open={isPreviewOpen}
        onClose={handleClosePreview}
        documentData={documentData ?? null}
      />
    </>
  );
};
