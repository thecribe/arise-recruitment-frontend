/**
 * -----------------------------------------------------------------------------
 * File: TextAreaField.tsx
 *
 * Description:
 * Generic textarea field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";

import type { FieldComponentProps } from "./BaseField";

export default function TextAreaField({ field, prefix }: FieldComponentProps) {
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
          disabled={isDisabled || isReadOnly}
        >
          <Textarea
            {...controller}
            id={field.id}
            placeholder={field.placeholder}
            rows={field.rows ?? 5}
            value={controller.value ?? ""}
            disabled={isDisabled}
            readOnly={isReadOnly}
            className="resize-y border-slate-300"
          />
        </FieldWrapper>
      )}
    />
  );
}
