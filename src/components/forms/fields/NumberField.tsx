/**
 * -----------------------------------------------------------------------------
 * File: NumberField.tsx
 *
 * Description:
 * Generic number field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";

import type { FieldComponentProps } from "./BaseField";

export default function NumberField({ field, prefix }: FieldComponentProps) {
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
            id={field.id}
            type="number"
            placeholder={field.placeholder}
            min={field.validation?.min ?? field.min}
            max={field.validation?.max ?? field.max}
            step={field.step}
            value={controller.value ?? ""}
            disabled={isDisabled}
            readOnly={isReadOnly}
            onBlur={controller.onBlur}
            name={controller.name}
            ref={controller.ref}
            onChange={(event) => {
              const value = event.target.value;

              controller.onChange(value === "" ? undefined : Number(value));
            }}
          />
        </FieldWrapper>
      )}
    />
  );
}
