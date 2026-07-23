import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import {
  FIELD_WIDTH,
  FIELD_WIDTH_CLASS,
  type FieldWidth,
} from "../types/field-width";

interface FieldWrapperProps extends PropsWithChildren {
  id: string;
  label: string;

  required?: boolean;
  helpText?: string;
  error?: string;

  width?: FieldWidth;

  className?: string;

  disabled?: boolean;
  hidden?: boolean;
}

export default function FieldWrapper({
  id,
  label,
  required = false,
  helpText,
  error,
  width = FIELD_WIDTH.FULL,
  className,
  disabled = false,
  hidden = false,
  children,
}: FieldWrapperProps) {
  if (hidden) return null;

  return (
    <div
      className={cn(
        FIELD_WIDTH_CLASS[width],
        "min-w-0 space-y-2",
        disabled && "opacity-70",
        className,
      )}
    >
      <label
        htmlFor={id}
        className={cn(
          "block break-words text-sm font-medium leading-6 text-slate-700",
          disabled && "cursor-not-allowed",
        )}
      >
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {helpText && (
        <p className="break-words text-xs text-slate-500">{helpText}</p>
      )}

      {error && (
        <p
          role="alert"
          className="break-words text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
