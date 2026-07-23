import { Controller } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";
import { useFieldOptions } from "../../utils/useFieldOptions";

export default function RadioField({ field, prefix }: FieldComponentProps) {
  const { control } = useApplicationForm();

  const { isDisabled } = useFieldState(field);

  const options = useFieldOptions(field.options);

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
          <RadioGroup
            value={controller.value ?? ""}
            onValueChange={(value) => {
              if (isDisabled) return;
              controller.onChange(value);
            }}
            disabled={isDisabled}
            className="space-y-3"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  id={`${field.id}-${option.value}`}
                  value={String(option.value)}
                  disabled={isDisabled}
                />

                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="cursor-pointer text-sm font-medium text-slate-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </FieldWrapper>
      )}
    />
  );
}
