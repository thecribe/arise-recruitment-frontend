import { createPortal } from "react-dom";
import { X, FileText } from "lucide-react";
import { PDFViewer } from "@react-pdf/renderer";

import type {
  ApplicationDefinitionSection,
  ApplicationDocument,
} from "../types/document.types";

import ApplicationFormPdf from "./ApplicationFormPdf";

interface ApplicationFormPreviewModalProps {
  open: boolean;
  onClose: () => void;
  documents: ApplicationDocument;
  sections: ApplicationDefinitionSection[];
}

const ApplicationFormPreviewModal = ({
  open,
  onClose,
  documents,
  sections,
}: ApplicationFormPreviewModalProps) => {
  if (!open || typeof documents === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-form-preview-title"
    >
      <div className="flex h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-900/95 shadow-2xl shadow-blue-950/40">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden rounded-xl border border-blue-400/20 bg-blue-500/10 p-2 text-blue-300 sm:block">
              <FileText size={20} />
            </div>

            <div className="min-w-0">
              <h2
                id="application-form-preview-title"
                className="truncate text-sm font-semibold text-white sm:text-base"
              >
                Application Form Preview
              </h2>

              <p className="mt-1 truncate text-xs text-blue-100/50">
                Reference: {documents.application.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close application form preview"
            className="ml-3 rounded-xl border border-white/10 bg-white/5 p-2 text-blue-100/70 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <X size={19} />
          </button>
        </div>

        {/* PDF content */}
        <div className="min-h-0 flex-1 bg-slate-800/50 p-2 sm:p-4">
          <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-700/30">
            <PDFViewer
              width="100%"
              height="100%"
              showToolbar
              className="h-full w-full"
            >
              <ApplicationFormPdf document={documents} sections={sections} />
            </PDFViewer>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-white/[0.04] px-4 py-3 sm:px-6">
          <p className="hidden text-xs text-blue-100/40 sm:block">
            Review the document before downloading.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-blue-100 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ApplicationFormPreviewModal;
