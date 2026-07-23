import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";

export default function PhoneField({ field, prefix }: FieldComponentProps) {
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
            type="tel"
            placeholder={field.placeholder}
            autoComplete="tel"
            value={controller.value ?? ""}
            disabled={isDisabled}
            readOnly={isReadOnly}
          />
        </FieldWrapper>
      )}
    />
  );
}
