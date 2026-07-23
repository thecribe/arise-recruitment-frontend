import { Controller } from "react-hook-form";

import { SignaturePad } from "@/components/signature";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";

export default function SignatureField({ field, prefix }: FieldComponentProps) {
  const { control } = useApplicationForm();

  const { isDisabled } = useFieldState(field);

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
          <div className="w-full min-w-0 overflow-hidden rounded-2xl">
            <SignaturePad
              value={(controller.value as File | null) ?? null}
              onChange={controller.onChange}
              disabled={isDisabled}
            />
          </div>
        </FieldWrapper>
      )}
    />
  );
}
