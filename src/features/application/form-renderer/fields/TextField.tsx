import { Controller } from "react-hook-form";

import { useApplicationContext } from "../../context/ApplicationContext";
import { useApplicationForm } from "../../hooks/useApplicationForm";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";
import { useFieldState } from "../../hooks/useFieldState";

export default function TextField({ field, prefix }: FieldComponentProps) {
  const { control } = useApplicationForm();

  const { isDisabled, isReadOnly } = useFieldState(field);

  if (!field.name) return null;

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
          disabled={isReadOnly}
        >
          <input
            {...controller}
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            disabled={isReadOnly}
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
