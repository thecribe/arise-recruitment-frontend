/**
 * -----------------------------------------------------------------------------
 * File: PasswordField.tsx
 *
 * Description:
 * Generic password field integrated with React Hook Form.
 * Supports toggling password visibility.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import FieldWrapper from "../FieldWrapper";
import { useFormFieldState } from "../hooks/useFormFieldState";
import type { FieldComponentProps } from "./BaseField";

export default function PasswordField({ field, prefix }: FieldComponentProps) {
  const { control } = useFormContext();
  const { isDisabled, isReadOnly } = useFormFieldState(field);
  const [isVisible, setIsVisible] = useState(false);

  if (!field.name) {
    return null;
  }

  const fieldName = prefix ? `${prefix}.${field.name}` : field.name;

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: controller, fieldState }) => (
        <FieldWrapper
          id={field.id}
          label={field.label}
          required={field.required}
          helpText={field.helpText}
          error={fieldState.error?.message}
          width={field.width}
          disabled={isDisabled || isReadOnly}
        >
          <div className="relative">
            <Input
              {...controller}
              id={field.id}
              type={isVisible ? "text" : "password"}
              placeholder={field.placeholder}
              autoComplete="new-password"
              value={controller.value ?? ""}
              disabled={isDisabled}
              readOnly={isReadOnly}
              className="pr-11"
            />

            <button
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
              disabled={isDisabled || isReadOnly}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-md
                p-1
                text-slate-500
                transition
                hover:bg-blue-50
                hover:text-blue-600
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FieldWrapper>
      )}
    />
  );
}
