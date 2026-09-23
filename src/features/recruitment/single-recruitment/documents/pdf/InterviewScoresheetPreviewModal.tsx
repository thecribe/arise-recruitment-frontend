import { createPortal } from "react-dom";

import { PDFViewer } from "@react-pdf/renderer";

import { X } from "lucide-react";

import { InterviewScoresheetPdf } from "./InterviewScoresheetPdf";
import type { InterviewScoresheetDocument } from "../types/document.types";

interface InterviewScoresheetPreviewModalProps {
  open: boolean;
  onClose: () => void;
  documentData: InterviewScoresheetDocument | null;
}

export const InterviewScoresheetPreviewModal = ({
  open,
  onClose,
  documentData,
}: InterviewScoresheetPreviewModalProps) => {
  if (!open || !documentData) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-2 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Interview scoresheet preview"
    >
      <div className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/70 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Interview Scoresheet Preview
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {documentData.applicant?.fullName ?? "Applicant"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PDF viewer */}
        <div className="min-h-0 flex-1 bg-slate-200/60 p-1 dark:bg-slate-950/50 sm:p-3">
          <PDFViewer
            width="100%"
            height="100%"
            showToolbar
            className="rounded-lg"
          >
            <InterviewScoresheetPdf documentData={documentData} />
          </PDFViewer>
        </div>
      </div>
    </div>,
    document.body,
  );
};
