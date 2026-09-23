import { FileText, X } from "lucide-react";
import { createPortal } from "react-dom";

import type { ApplicantDocument } from "../types/document.types";

interface DocumentPreviewModalProps {
  previewDocument: ApplicantDocument | null;
  onClose: () => void;
}

const isPdf = (mimeType?: string | null) => mimeType?.includes("pdf");

const isImage = (mimeType?: string | null) =>
  Boolean(mimeType?.startsWith("image/"));

const DocumentPreviewModal = ({
  previewDocument,
  onClose,
}: DocumentPreviewModalProps) => {
  if (!previewDocument) {
    return null;
  }

  const canPreview =
    isPdf(previewDocument.mime_type) || isImage(previewDocument.mime_type);

  if (!canPreview) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2
                className="truncate text-sm font-semibold text-slate-800 sm:text-base"
                title={previewDocument.name}
              >
                {previewDocument.name}
              </h2>

              <p className="text-xs text-slate-500">
                {isPdf(previewDocument.mime_type) ? "PDF document" : "Image"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close document preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="min-h-0 flex-1 overflow-hidden bg-slate-100/70">
          {isPdf(previewDocument.mime_type) && (
            <iframe
              src={previewDocument.document_url}
              title={previewDocument.name}
              className="h-full w-full border-0"
            />
          )}

          {isImage(previewDocument.mime_type) && (
            <div className="flex h-full w-full items-center justify-center overflow-auto p-4 sm:p-8">
              <img
                src={previewDocument.document_url}
                alt={previewDocument.name}
                className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    window.document.body,
  );
};

export default DocumentPreviewModal;
