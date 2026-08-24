/**
 * -----------------------------------------------------------------------------
 * File: FilePreviewDialog.tsx
 *
 * Description:
 * Generic dialog for previewing files.
 *
 * Supports:
 * - Images
 * - PDFs
 * - Existing backend files
 * - Newly selected File objects
 * - Unsupported file fallback
 * -----------------------------------------------------------------------------
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FileIcon } from "lucide-react";
import { isImageFile, isPdfFile, type FormFile } from "./utils/file";
import { useFilePreviewUrl } from "./hooks/useFilePreviewUrl";

interface FilePreviewDialogProps {
  /**
   * File currently being previewed.
   */
  file: FormFile | null;

  /**
   * Controls dialog visibility.
   */
  open: boolean;

  /**
   * Called when dialog visibility changes.
   */
  onOpenChange: (open: boolean) => void;
}

export default function FilePreviewDialog({
  file,
  open,
  onOpenChange,
}: FilePreviewDialogProps) {
  /**
   * Hooks must always be called before conditional returns.
   *
   * The hook handles null safely.
   */
  const fileUrl = useFilePreviewUrl(file);

  if (!file) {
    return null;
  }

  const isImage = isImageFile(file);

  const isPdf = isPdfFile(file);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[90vh]
          min-w-2/3
          max-w-4xl
          overflow-hidden
          p-0
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* Header */}
        {/* -------------------------------------------------------------- */}

        <DialogHeader className="border-b border-slate-200 px-6 py-4">
          <DialogTitle className="truncate">{file.name}</DialogTitle>

          <DialogDescription>File preview</DialogDescription>
        </DialogHeader>

        {/* -------------------------------------------------------------- */}
        {/* Preview area */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            min-h-[300px]
            max-h-[75vh]
            overflow-auto
            bg-slate-50
            p-4
          "
        >
          {/* ------------------------------------------------------------ */}
          {/* Image preview */}
          {/* ------------------------------------------------------------ */}

          {isImage && fileUrl && (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
              "
            >
              <img
                src={fileUrl}
                alt={file.name}
                className="
                  max-h-[70vh]
                  max-w-full
                  rounded-lg
                  object-contain
                "
              />
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* PDF preview */}
          {/* ------------------------------------------------------------ */}

          {isPdf && fileUrl && (
            <iframe
              src={fileUrl}
              title={file.name}
              className="
                h-[70vh]
                w-full
                rounded-lg
                border
                border-slate-200
                bg-white
              "
            />
          )}

          {/* ------------------------------------------------------------ */}
          {/* Unsupported file */}
          {/* ------------------------------------------------------------ */}

          {!isImage && !isPdf && (
            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                gap-3
                text-center
                text-slate-500
              "
            >
              <FileIcon className="size-10" />

              <div className="space-y-1">
                <p className="font-medium text-slate-700">
                  Preview unavailable
                </p>

                <p className="text-sm">
                  This file type cannot be previewed in the browser.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
