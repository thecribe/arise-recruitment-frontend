/**
 * -----------------------------------------------------------------------------
 * File: FormFieldWrapper.tsx
 * Description:
 * Shared wrapper for form controls.
 *
 * Responsibilities:
 * - Render label.
 * - Display required indicator.
 * - Display helper text.
 * - Display validation error.
 * - Keep spacing consistent across all form controls.
 * -----------------------------------------------------------------------------
 */

import { cn } from "@/lib/utils";

interface FormFieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export default function FormFieldWrapper({
  id,
  label,
  required = false,
  helperText,
  error,
  className,
  children,
}: FormFieldWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {/* Label */}
      <label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-medium text-slate-700"
      >
        {label}

        {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input */}
      {children}

      {/* Helper Text */}
      {!error && helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}

      {/* Validation Error */}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
