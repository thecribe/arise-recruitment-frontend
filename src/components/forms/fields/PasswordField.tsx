/**
 * -----------------------------------------------------------------------------
 * File: PasswordField.tsx
 *
 * Description:
 * Generic password field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";

import type { FieldComponentProps } from "./BaseField";

export default function PasswordField({ field, prefix }: FieldComponentProps) {
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
          <Input
            {...controller}
            id={field.id}
            type="password"
            placeholder={field.placeholder}
            autoComplete="new-password"
            value={controller.value ?? ""}
            disabled={isDisabled}
            readOnly={isReadOnly}
          />
        </FieldWrapper>
      )}
    />
  );
}
