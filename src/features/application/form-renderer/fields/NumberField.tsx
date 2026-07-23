/**
 * -----------------------------------------------------------------------------
 * File: NumberField.tsx
 * Description:
 * Dynamic number field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";

export default function NumberField({ field, prefix }: FieldComponentProps) {
  const { control } = useApplicationForm();

  const { isDisabled, isReadOnly } = useFieldState(field);

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
            type="number"
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            value={controller.value ?? ""}
            disabled={isDisabled}
            readOnly={isReadOnly}
            onChange={(e) =>
              controller.onChange(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        </FieldWrapper>
      )}
    />
  );
}
