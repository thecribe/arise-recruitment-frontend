/**
 * -----------------------------------------------------------------------------
 * File: TextAreaField.tsx
 * Description:
 * Dynamic textarea field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";

export default function TextAreaField({ field, prefix }: FieldComponentProps) {
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
          <Textarea
            {...controller}
            id={field.id}
            placeholder={field.placeholder}
            rows={field.rows ?? 5}
            disabled={isDisabled}
            readOnly={isReadOnly}
            className="resize-y"
          />
        </FieldWrapper>
      )}
    />
  );
}
