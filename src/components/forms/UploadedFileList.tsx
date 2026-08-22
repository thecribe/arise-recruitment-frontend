/**
 * -----------------------------------------------------------------------------
 * File: UploadedFileList.tsx
 *
 * Description:
 * Displays documents already stored by the backend.
 *
 * Supports:
 * - Image preview
 * - PDF preview
 * - View action
 * - Delete action
 * - Responsive horizontal layout
 * -----------------------------------------------------------------------------
 */

import { Eye, FileText, Image as ImageIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FormUploadedFile } from "./types/file";

interface UploadedFileListProps {
  files: FormUploadedFile[];

  disabled?: boolean;

  readOnly?: boolean;

  onView?: (file: FormUploadedFile) => void;

  onDelete?: (file: FormUploadedFile) => void;
}

function getFileType(file: FormUploadedFile) {
  const mimeType = file.mimeType?.toLowerCase();

  if (mimeType?.startsWith("image/")) {
    return "image";
  }

  if (mimeType === "application/pdf") {
    return "pdf";
  }

  return "other";
}

function formatFileSize(size?: number) {
  if (!size) {
    return null;
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadedFileList({
  files,
  disabled = false,
  readOnly = false,
  onView,
  onDelete,
}: UploadedFileListProps) {
  if (!files.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500">Existing documents</p>

      <div className="flex flex-wrap gap-3">
        {files.map((file) => {
          const type = getFileType(file);

          const fileSize = formatFileSize(file.size);

          return (
            <div
              key={file.id}
              className="
                flex
                min-w-0
                max-w-full
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-white/70
                p-3
                shadow-sm
                sm:max-w-sm
              "
            >
              {/* ------------------------------------------------------------- */}
              {/* File icon / thumbnail */}
              {/* ------------------------------------------------------------- */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                "
              >
                {type === "image" ? (
                  <img
                    src={file.documentUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : type === "pdf" ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <ImageIcon className="h-5 w-5" />
                )}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* File information */}
              {/* ------------------------------------------------------------- */}

              <div className="min-w-0 flex-1">
                <p
                  title={file.name}
                  className="truncate text-sm font-medium text-slate-700"
                >
                  {file.name}
                </p>

                {fileSize && (
                  <p className="mt-0.5 text-xs text-slate-400">{fileSize}</p>
                )}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* Actions */}
              {/* ------------------------------------------------------------- */}

              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled}
                  onClick={() => onView?.(file)}
                  title="View document"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                {!readOnly && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() => onDelete?.(file)}
                    title="Delete document"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
