/**
 * -----------------------------------------------------------------------------
 * File: CheckboxField.tsx
 * Description:
 * Dynamic checkbox field integrated with React Hook Form.
 *
 * Supports:
 * - Single checkbox (boolean)
 * - Multiple checkbox options (string[])
 * -----------------------------------------------------------------------------
 */

import { Controller } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";
import { useFieldOptions } from "../../utils/useFieldOptions";

export default function CheckboxField({ field, prefix }: FieldComponentProps) {
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
      render={({ field: controller, fieldState }) => {
        if (field.options?.length) {
          const selectedValues: string[] = controller.value ?? [];

          return (
            <FieldWrapper
              id={field.id}
              label={field.label}
              required={field.required}
              helpText={field.helpText}
              error={fieldState.error?.message}
              width={field.width}
              disabled={isDisabled}
            >
              <div className="space-y-3">
                {options.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`${field.id}-${option.value}`}
                      disabled={isDisabled}
                      checked={selectedValues.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (isDisabled) return;

                        controller.onChange(
                          checked
                            ? [...selectedValues, option.value]
                            : selectedValues.filter(
                                (value) => value !== option.value,
                              ),
                        );
                      }}
                    />

                    <label
                      htmlFor={`${field.id}-${option.value}`}
                      className="cursor-pointer text-sm font-medium"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </FieldWrapper>
          );
        }

        return (
          <FieldWrapper
            id={field.id}
            label={field.label}
            required={field.required}
            helpText={field.helpText}
            error={fieldState.error?.message}
            width={field.width}
            disabled={isDisabled}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={field.id}
                disabled={isDisabled}
                checked={controller.value ?? false}
                onCheckedChange={(checked) => {
                  if (isDisabled) return;

                  controller.onChange(checked);
                }}
              />

              <label htmlFor={field.id} className="cursor-pointer text-sm">
                {field.placeholder}
              </label>
            </div>
          </FieldWrapper>
        );
      }}
    />
  );
}
