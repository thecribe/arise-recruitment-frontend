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

import { Trash2 } from "lucide-react";

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

                {signature && signature.document_url && (
                  <div
                    className="
      flex
      min-w-0
      items-center
      gap-3
      rounded-xl
      border
      border-blue-200/60
      bg-white/50
      p-3
      backdrop-blur-sm
      dark:border-blue-400/20
      dark:bg-white/5
    "
                  >
                    {/* Signature Preview */}
                    <div
                      className="
        flex
        h-16
        w-24
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-lg
        border
        border-blue-100/70
        bg-white
        dark:border-blue-400/20
        dark:bg-slate-800
      "
                    >
                      <img
                        src={signature.document_url}
                        alt="Signature"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>

                    {/* Signature Information */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                        {signature.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Signature document
                      </p>
                    </div>

                    {/* Remove */}
                    {!isLocked && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        aria-label="Remove signature"
                        className="shrink-0 hover:bg-red-50 dark:hover:bg-red-500/10"
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

                {!signature?.document_url && !isLocked && (
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
