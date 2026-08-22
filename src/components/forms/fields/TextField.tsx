/**
 * -----------------------------------------------------------------------------
 * File: TextField.tsx
 *
 * Description:
 * Generic text field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";

import type { FieldComponentProps } from "./BaseField";
import { Input } from "@/components/ui/input";

export default function TextField({ field, prefix }: FieldComponentProps) {
  const { control } = useFormContext();

  const { isDisabled, isReadOnly } = useFormFieldState(field);

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
          disabled={isDisabled}
        >
          <Input
            {...controller}
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            value={controller.value ?? ""}
            disabled={isDisabled}
            readOnly={isReadOnly}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white/70
              px-4
              py-3
              transition
              outline-none
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-200
              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:text-slate-500
            "
          />
        </FieldWrapper>
      )}
    />
  );
}
