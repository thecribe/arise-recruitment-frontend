/**
 * -----------------------------------------------------------------------------
 * File: file.ts
 *
 * Description:
 * Generic helpers for working with new and existing uploaded files.
 * -----------------------------------------------------------------------------
 */

import type { FormUploadedFile } from "../types/file";

export type FormFile = File | FormUploadedFile;

export function isExistingFile(value: unknown): value is FormUploadedFile {
  return typeof value === "object" && value !== null && "document_url" in value;
}

export function isImageFile(file: FormFile): boolean {
  if (file instanceof File) {
    return file.type.startsWith("image/");
  }

  return (
    file.mimeType?.startsWith("image/") ??
    /\.(png|jpg|jpeg|gif|webp)$/i.test(file.name)
  );
}

export function isPdfFile(file: FormFile): boolean {
  if (file instanceof File) {
    return file.type === "application/pdf";
  }

  return file.mimeType === "application/pdf" || /\.pdf$/i.test(file.name);
}

export function getFileUrl(file: FormFile): string {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }

  return file.document_url;
}
