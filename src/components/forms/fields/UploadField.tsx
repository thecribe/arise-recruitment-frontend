/**
 * -----------------------------------------------------------------------------
 * File: UploadField.tsx
 *
 * Description:
 * Generic file upload field integrated with React Hook Form.
 *
 * Supports:
 * - Single and multiple uploads
 * - Existing backend files
 * - Newly selected File objects
 * - Image/PDF preview
 * - Existing file deletion callbacks
 * - Local removal of newly selected files
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Eye, FileIcon, FileText, ImageIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";

import { useFormRendererContext } from "../context/FormRendererContext";

import type { FieldComponentProps } from "./BaseField";

import type { FormFile } from "../utils/file";

import { isExistingFile, isImageFile, isPdfFile } from "../utils/file";
import FilePreviewDialog from "../FilePreviewDialog";

export default function UploadField({ field, prefix }: FieldComponentProps) {
  const { control } = useFormContext();

  const { isDisabled, isReadOnly } = useFormFieldState(field);

  const { onDeleteFile } = useFormRendererContext();

  const [previewFile, setPreviewFile] = useState<FormFile | null>(null);

  if (!field.name) {
    return null;
  }

  const fieldName = prefix ? `${prefix}.${field.name}` : field.name;

  const multiple = field.file?.multiple ?? false;

  const isLocked = isDisabled || isReadOnly;

  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        render={({ field: controller, fieldState }) => {
          /**
           * Normalize the form value.
           *
           * The field may contain:
           *
           * - null
           * - File
           * - FormUploadedFile
           * - Array<File | FormUploadedFile>
           */
          const files: FormFile[] = !controller.value
            ? []
            : Array.isArray(controller.value)
              ? controller.value
              : [controller.value];

          const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            if (isLocked) {
              return;
            }

            const selectedFiles = Array.from(event.target.files ?? []);

            if (!selectedFiles.length) {
              return;
            }

            const nextValue = multiple
              ? [...files, ...selectedFiles]
              : selectedFiles[0];

            controller.onChange(nextValue);

            /**
             * Allows the same file to be selected again
             * after being removed.
             */
            event.target.value = "";
          };

          const handleRemove = (file: FormFile, index: number) => {
            if (isLocked) {
              return;
            }

            /**
             * Existing backend file.
             *
             * The consuming feature owns the API deletion.
             */
            if (isExistingFile(file)) {
              onDeleteFile?.(file);
            }

            const remainingFiles = files.filter(
              (_, fileIndex) => fileIndex !== index,
            );

            controller.onChange(
              multiple ? remainingFiles : (remainingFiles[0] ?? null),
            );
          };

          return (
            <FieldWrapper
              id={field.id}
              label={field.label}
              required={field.required}
              helpText={field.helpText}
              error={fieldState.error?.message}
              width={field.width}
              disabled={isLocked}
            >
              <div className="space-y-4">
                {/* Upload input */}

                {!isReadOnly && (
                  <Input
                    id={field.id}
                    type="file"
                    disabled={isLocked}
                    multiple={multiple}
                    accept={field.file?.accept?.join(",")}
                    className="
                      w-full
                      min-w-0
                      border-slate-300
                      file:mr-4
                      file:rounded-md
                      file:border-0
                      file:bg-blue-50
                      file:px-3
                      file:py-2
                      file:text-sm
                      file:font-medium
                      file:text-blue-700
                    "
                    onChange={handleFileChange}
                  />
                )}

                {/* File list */}

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => {
                      const isImage = isImageFile(file);

                      const isPdf = isPdfFile(file);

                      return (
                        <div
                          key={
                            isExistingFile(file)
                              ? file.id
                              : `${file.name}-${file.lastModified}`
                          }
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-white/70
                            p-3
                          "
                        >
                          {/* File icon */}

                          <div
                            className="
                              flex
                              size-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-blue-50
                              text-blue-600
                            "
                          >
                            {isImage ? (
                              <ImageIcon className="size-5" />
                            ) : isPdf ? (
                              <FileText className="size-5" />
                            ) : (
                              <FileIcon className="size-5" />
                            )}
                          </div>

                          {/* File information */}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {file.name}
                            </p>

                            {file instanceof File && (
                              <p className="text-xs text-slate-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>

                          {/* View */}

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setPreviewFile(file)}
                          >
                            <Eye className="size-4" />
                          </Button>

                          {/* Delete */}

                          {!isLocked && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemove(file, index)}
                            >
                              <Trash2 className="size-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </FieldWrapper>
          );
        }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* File preview dialog */}
      {/* ---------------------------------------------------------------- */}

      <FilePreviewDialog
        file={previewFile}
        open={Boolean(previewFile)}
        onOpenChange={(open) => {
          if (!open) {
            setPreviewFile(null);
          }
        }}
      />
    </>
  );
}
