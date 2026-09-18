import {
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  UserRound,
  X,
} from "lucide-react";

import { createPortal } from "react-dom";
import type { TrainingCertificate } from "../types/training-certificate.types";

interface TrainingCertificateViewModalProps {
  open: boolean;
  certificate: TrainingCertificate | null;
  onClose: () => void;
}

const TrainingCertificateViewModal = ({
  open,
  certificate,
  onClose,
}: TrainingCertificateViewModalProps) => {
  if (!open || !certificate) {
    return null;
  }

  const certificateDocument = certificate.document;

  const formatDate = (date: string | null) => {
    if (!date || date === "0000-00-00") {
      return "Not provided";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const isImage = certificateDocument?.mimetype?.startsWith("image/");

  const isPdf = certificateDocument?.mimetype === "application/pdf";

  return createPortal(
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-blue-950/30
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          border border-blue-200/60
          bg-white/90
          shadow-2xl
          shadow-blue-950/20
          backdrop-blur-2xl
          dark:border-blue-400/20
          dark:bg-slate-900/90
        "
      >
        {/* Header */}
        <div
          className="
            flex shrink-0
            items-center justify-between gap-4
            border-b border-blue-100/70
            px-5 py-4
            dark:border-blue-400/20
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-blue-100/70
                text-blue-700
                dark:bg-blue-500/10
                dark:text-blue-300
              "
            >
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
                {certificate.certificateName}
              </h2>

              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Training certificate
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              bg-blue-50/50
              text-slate-500
              transition
              hover:bg-blue-100/70
              hover:text-blue-700
              dark:bg-blue-500/10
              dark:text-slate-400
              dark:hover:bg-blue-500/20
              dark:hover:text-blue-300
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Details */}
            <aside
              className="
                border-b border-blue-100/70
                bg-blue-50/20
                p-5
                lg:border-b-0
                lg:border-r
                dark:border-blue-400/10
                dark:bg-blue-500/5
              "
            >
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Certificate
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                    {certificate.certificateName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Certificate Number
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {certificate.certificateNumber || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Issue Date
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                    {formatDate(certificate.issueDate)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Expiry Date
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CalendarDays className="h-4 w-4 text-blue-500" />
                    {formatDate(certificate.expiryDate)}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Uploaded By
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <UserRound className="h-4 w-4 text-blue-500" />
                    {certificate.uploadedBy || "Applicant"}
                  </div>
                </div>
              </div>
            </aside>

            {/* Document */}
            <div className="min-w-0 p-5">
              <div
                className="
                  flex min-h-[420px]
                  items-center justify-center
                  overflow-hidden
                  rounded-2xl
                  border border-blue-100/70
                  bg-slate-50/70
                  dark:border-blue-400/10
                  dark:bg-slate-950/30
                "
              >
                {!certificateDocument ? (
                  <div className="px-6 py-10 text-center">
                    <FileText className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />

                    <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                      No document available
                    </p>
                  </div>
                ) : isImage ? (
                  <img
                    src={certificateDocument.document_url}
                    alt={certificate.certificateName}
                    className="
                      max-h-[65vh]
                      max-w-full
                      object-contain
                    "
                  />
                ) : isPdf ? (
                  <iframe
                    src={certificateDocument.document_url}
                    title={certificate.certificateName}
                    className="h-[65vh] w-full"
                  />
                ) : (
                  <div className="px-6 py-10 text-center">
                    <FileText className="mx-auto h-10 w-10 text-blue-500" />

                    <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
                      {certificateDocument.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      This file type cannot be previewed.
                    </p>

                    <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
                      <a
                        href={certificateDocument.document_url}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-blue-600
                          px-4 py-2.5
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-blue-500
                        "
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open Document
                      </a>

                      <a
                        href={certificateDocument.document_url}
                        download={certificateDocument.name}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border border-blue-200/60
                          bg-white/60
                          px-4 py-2.5
                          text-sm
                          font-medium
                          text-blue-700
                          transition
                          hover:bg-blue-50
                          dark:border-blue-400/20
                          dark:bg-slate-900/30
                          dark:text-blue-300
                          dark:hover:bg-blue-500/10
                        "
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            flex shrink-0
            justify-end
            border-t border-blue-100/70
            bg-blue-50/20
            px-5 py-4
            dark:border-blue-400/20
            dark:bg-blue-500/5
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border border-blue-200/60
              bg-white/60
              px-4 py-2.5
              text-sm font-medium
              text-slate-700
              transition
              hover:bg-blue-50/70
              sm:w-auto
              dark:border-blue-400/20
              dark:bg-slate-900/30
              dark:text-slate-200
              dark:hover:bg-blue-500/10
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TrainingCertificateViewModal;
