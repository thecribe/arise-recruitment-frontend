/**
 * -----------------------------------------------------------------------------
 * File: FormPassword.tsx
 * Description:
 * React Hook Form controlled password input.
 *
 * Responsibilities:
 * - Render password field.
 * - Toggle password visibility.
 * - Handle validation errors.
 * - Maintain consistent Airse styling.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { useController } from "react-hook-form";

import { Input } from "@/components/ui/input";

import FormFieldWrapper from "../FormFieldWrapper";

interface FormPasswordProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function FormPassword<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  helperText,
  disabled,
  icon,
}: FormPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const { field, fieldState } = useController({
    control,
    name,
  });

  return (
    <FormFieldWrapper
      id={field.name}
      label={label}
      required={required}
      helperText={helperText}
      error={fieldState.error?.message}
    >
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <Input
          {...field}
          id={field.name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          className={icon ? "pl-11 pr-12" : "pr-12"}
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            transition-colors
            hover:text-blue-600
          "
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </FormFieldWrapper>
  );
}
