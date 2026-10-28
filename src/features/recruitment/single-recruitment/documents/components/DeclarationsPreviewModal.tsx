import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { PDFViewer } from "@react-pdf/renderer";

import type {
  DeclarationSections,
  DeclarationValues,
} from "@/features/recruitment/types/declarations.types";
import DeclarationsPdf from "../pdf/DeclarationsPdf";

interface DeclarationsPreviewModalProps {
  open: boolean;
  onClose: () => void;
  sections: DeclarationSections;
  values: DeclarationValues;
}

const DeclarationsPreviewModal = ({
  open,
  onClose,
  sections,
  values,
}: DeclarationsPreviewModalProps) => {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="flex h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/90">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/70 px-4 py-3 sm:px-5 dark:border-slate-700/60 dark:bg-slate-900/70">
          <div className="min-w-0">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
              Applicant Documents
            </p>

            <h2 className="truncate text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
              Declaration Form
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close declaration preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF */}
        <div className="min-h-0 flex-1 bg-slate-100/70 p-1 dark:bg-slate-950">
          <PDFViewer
            width="100%"
            height="100%"
            showToolbar
            className="h-full w-full border-0"
          >
            <DeclarationsPdf sections={sections} values={values} />
          </PDFViewer>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-end border-t border-slate-200/70 bg-white/70 px-4 py-2.5 dark:border-slate-700/60 dark:bg-slate-900/70">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default DeclarationsPreviewModal;
