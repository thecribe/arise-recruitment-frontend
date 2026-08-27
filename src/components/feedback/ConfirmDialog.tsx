/**
 * -----------------------------------------------------------------------------
 * File: ConfirmDialog.tsx
 *
 * Description:
 * Reusable site-wide confirmation dialog.
 *
 * Supports:
 *
 * - Confirmation actions
 * - Destructive actions
 * - Loading states
 * - Custom titles and descriptions
 * - Custom confirm button text
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;

  title: string;

  description?: string;

  confirmLabel?: string;

  cancelLabel?: string;

  variant?: "default" | "destructive" | "warning";

  isLoading?: boolean;

  onConfirm: () => void;

  onCancel: () => void;

  children?: ReactNode;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  const iconConfig = {
    default: {
      containerClass: "bg-blue-100 text-blue-600",
      icon: null,
    },

    warning: {
      containerClass: "bg-amber-100 text-amber-600",
      icon: <AlertTriangle className="h-5 w-5" />,
    },

    destructive: {
      containerClass: "bg-red-100 text-red-600",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
  };

  const currentVariant = iconConfig[variant];

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* --------------------------------------------------------------- */}
      {/* Backdrop */}
      {/* --------------------------------------------------------------- */}

      <button
        type="button"
        aria-label="Close dialog"
        disabled={isLoading}
        onClick={onCancel}
        className="
          absolute
          inset-0
          cursor-default
          bg-slate-950/40
          backdrop-blur-sm
        "
      />

      {/* --------------------------------------------------------------- */}
      {/* Dialog */}
      {/* --------------------------------------------------------------- */}

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/40
          bg-white/80
          p-5
          shadow-2xl
          backdrop-blur-xl
          sm:p-6
        "
      >
        <div className="flex gap-4">
          {/* Icon */}

          {currentVariant.icon && (
            <div
              className={cn(
                `
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                `,
                currentVariant.containerClass,
              )}
            >
              {currentVariant.icon}
            </div>
          )}

          {/* Content */}

          <div className="min-w-0 flex-1">
            <h2
              id="confirm-dialog-title"
              className="text-base font-semibold text-slate-900 sm:text-lg"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            )}

            {children && <div className="mt-4">{children}</div>}
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Actions */}
        {/* --------------------------------------------------------------- */}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            disabled={isLoading}
            leftIcon={
              isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : undefined
            }
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
