/**
 * -----------------------------------------------------------------------------
 * File: SignatureField.tsx
 *
 * Description:
 * Generic signature field.
 *
 * Supports:
 * - Existing backend signatures
 * - Newly created signature PNG files
 * - Previewing signatures
 * - Removing existing signatures
 * - Read-only and disabled modes
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Eye, FileSignature, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SignaturePad } from "@/components/signature";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";
import { useFormRendererContext } from "../context/FormRendererContext";

import type { FieldComponentProps } from "./BaseField";
import type { FormFile } from "../utils/file";

import { isExistingFile } from "../utils/file";
import FilePreviewDialog from "../FilePreviewDialog";

export default function SignatureField({ field, prefix }: FieldComponentProps) {
  const { control } = useFormContext();

  const { isDisabled, isReadOnly } = useFormFieldState(field);

  const { onDeleteFile } = useFormRendererContext();

  const [previewFile, setPreviewFile] = useState<FormFile | null>(null);

  if (!field.name) {
    return null;
  }

  const fieldName = prefix ? `${prefix}.${field.name}` : field.name;

  const isLocked = isDisabled || isReadOnly;

  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        render={({ field: controller, fieldState }) => {
          const signature = (controller.value as FormFile | null) ?? null;

          const handleDelete = () => {
            if (!signature || isLocked) {
              return;
            }

            /**
             * Existing backend signature.
             *
             * The consuming feature handles API deletion.
             */
            if (isExistingFile(signature)) {
              onDeleteFile?.(signature);
            }

            controller.onChange(null);
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
                {/* ------------------------------------------------------ */}
                {/* Existing/new signature display */}
                {/* ------------------------------------------------------ */}

                {signature && (
                  <div
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
                      <FileSignature className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-700">
                        {signature.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        Signature document
                      </p>
                    </div>

                    {/* Preview */}

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setPreviewFile(signature)}
                    >
                      <Eye className="size-4" />
                    </Button>

                    {/* Remove */}

                    {!isLocked && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------ */}
                {/* Signature pad */}
                {/* Only show when there is no signature */}
                {/* ------------------------------------------------------ */}

                {!signature && !isLocked && (
                  <div className="w-full min-w-0 overflow-hidden rounded-2xl">
                    <SignaturePad
                      value={null}
                      onChange={controller.onChange}
                      disabled={isDisabled}
                    />
                  </div>
                )}
              </div>
            </FieldWrapper>
          );
        }}
      />

      {/* Preview dialog */}

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
