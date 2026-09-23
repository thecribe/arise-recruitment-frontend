import { useRef, useState } from "react";
import {
  Download,
  File,
  FileText,
  Image,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { useApplicantDocuments } from "../hooks/useApplicantDocuments";
import { useUploadApplicantDocuments } from "../hooks/useUploadApplicantDocuments";
import { useDeleteApplicantDocument } from "../hooks/useDeleteApplicantDocument";

import type { ApplicantDocument } from "../types/document.types";
import DocumentPreviewModal from "./DocumentPreviewModal";

interface UploadedDocumentsDocumentProps {
  applicationId: string;
}

const formatFileSize = (size?: number | null) => {
  if (!size) return "Unknown size";

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const getFileIcon = (mimeType?: string | null) => {
  if (!mimeType) {
    return <File className="h-5 w-5" />;
  }

  if (mimeType.startsWith("image/")) {
    return <Image className="h-5 w-5" />;
  }

  if (
    mimeType === "application/pdf" ||
    mimeType.includes("word") ||
    mimeType.includes("document")
  ) {
    return <FileText className="h-5 w-5" />;
  }

  return <File className="h-5 w-5" />;
};

const getFileTypeLabel = (mimeType?: string | null) => {
  if (!mimeType) return "Document";

  if (mimeType === "application/pdf") {
    return "PDF";
  }

  if (mimeType.includes("word")) {
    return "Word";
  }

  if (mimeType.startsWith("image/")) {
    return "Image";
  }

  return "Document";
};

const UploadedDocumentsDocument = ({
  applicationId,
}: UploadedDocumentsDocumentProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [documentToDelete, setDocumentToDelete] =
    useState<ApplicantDocument | null>(null);
  const [documentToPreview, setDocumentToPreview] =
    useState<ApplicantDocument | null>(null);

  const {
    data: documents = [],
    isLoading,
    isError,
  } = useApplicantDocuments(applicationId);

  const uploadMutation = useUploadApplicantDocuments();
  const deleteMutation = useDeleteApplicantDocument();

  const addFiles = (files: File[]) => {
    if (!files.length) return;

    setPendingFiles((current) => {
      const existingKeys = new Set(
        current.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
      );

      const newFiles = files.filter(
        (file) =>
          !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`),
      );

      return [...current, ...newFiles];
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(Array.from(event.target.files));
    }

    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files) {
      addFiles(Array.from(event.dataTransfer.files));
    }
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  const handleUpload = async () => {
    if (!pendingFiles.length || uploadMutation.isPending) {
      return;
    }

    await uploadMutation.mutateAsync({
      applicationId,
      files: pendingFiles,
    });

    setPendingFiles([]);
  };

  const handleDelete = async () => {
    if (!documentToDelete || deleteMutation.isPending) {
      return;
    }

    await deleteMutation.mutateAsync({
      applicationId,
      documentId: documentToDelete.id,
    });

    setDocumentToDelete(null);
  };

  const isPreviewableDocument = (mimeType?: string | null) => {
    return (
      mimeType === "application/pdf" || Boolean(mimeType?.startsWith("image/"))
    );
  };
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Uploaded Documents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Documents uploaded by the recruitment manager for this applicant.
          </p>
        </div>

        <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          {documents.length} {documents.length === 1 ? "document" : "documents"}
        </div>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          "rounded-2xl border border-dashed p-5 transition-all",
          isDragging
            ? "border-blue-400 bg-blue-50/80"
            : "border-blue-200 bg-white/40 hover:border-blue-300 hover:bg-white/60",
        ].join(" ")}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Upload className="h-5 w-5" />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            Upload applicant documents
          </h3>

          <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
            Drag and drop files here, or select files from your computer.
            Multiple documents can be uploaded at once.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <Upload className="h-4 w-4" />
            Select Documents
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Pending files */}
      {pendingFiles.length > 0 && (
        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Files ready to upload
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                {pendingFiles.length}{" "}
                {pendingFiles.length === 1 ? "file" : "files"} selected
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPendingFiles([])}
              className="text-xs font-medium text-slate-500 transition hover:text-red-600"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2">
            {pendingFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/70 px-3 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  {getFileIcon(file.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {file.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removePendingFile(index)}
                  disabled={uploadMutation.isPending}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploadMutation.isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Documents
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Existing documents */}
      <div className="mt-6 min-h-0 flex-1">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Applicant Documents
          </h3>
        </div>

        {isLoading && (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-blue-100 bg-white/40">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              Loading documents...
            </div>
          </div>
        )}

        {isError && !isLoading && (
          <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5 text-center">
            <p className="text-sm font-medium text-red-700">
              Unable to load applicant documents.
            </p>

            <p className="mt-1 text-xs text-red-600">
              Please refresh the page and try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && documents.length === 0 && (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-blue-100 bg-white/40 px-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <File className="h-5 w-5" />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-700">
              No documents uploaded
            </p>

            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Uploaded applicant documents will appear here.
            </p>
          </div>
        )}

        {!isLoading && !isError && documents.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white/50 backdrop-blur-sm">
            {/* Desktop header */}
            <div className="hidden grid-cols-[minmax(0,1fr)_100px_120px_110px] gap-4 border-b border-blue-100 bg-blue-50/50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:grid">
              <span>Document</span>
              <span>Type</span>
              <span>Date</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-blue-50">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_100px_120px_110px] sm:items-center sm:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      {getFileIcon(document.mime_type)}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="truncate text-sm font-medium text-slate-800"
                        title={document.name}
                      >
                        {document.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {formatFileSize(document.size)}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    <span className="sm:hidden">Type: </span>
                    {getFileTypeLabel(document.mime_type)}
                  </div>

                  <div className="text-xs text-slate-500">
                    <span className="sm:hidden">Uploaded: </span>
                    {formatDate(document.createdAt)}
                  </div>

                  <div className="flex items-center justify-start gap-1 sm:justify-end">
                    {isPreviewableDocument(document.mime_type) && (
                      <button
                        type="button"
                        onClick={() => setDocumentToPreview(document)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        title="View document"
                        aria-label={`View ${document.name}`}
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    )}

                    <a
                      href={document.document_url}
                      download={document.name}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                      title="Download document"
                      aria-label={`Download ${document.name}`}
                    >
                      <Download className="h-4 w-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setDocumentToDelete(document)}
                      disabled={deleteMutation.isPending}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete document"
                      aria-label={`Delete ${document.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {documentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/90 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-semibold text-slate-900">
                  Delete document?
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  This will remove{" "}
                  <span className="font-medium text-slate-700">
                    {documentToDelete.name}
                  </span>{" "}
                  from this applicant's documents.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDocumentToDelete(null)}
                disabled={deleteMutation.isPending}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Delete Document
              </button>
            </div>
          </div>
        </div>
      )}

      <DocumentPreviewModal
        previewDocument={documentToPreview}
        onClose={() => setDocumentToPreview(null)}
      />
    </div>
  );
};

export default UploadedDocumentsDocument;
