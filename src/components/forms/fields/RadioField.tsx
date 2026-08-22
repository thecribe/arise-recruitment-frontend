/**
 * -----------------------------------------------------------------------------
 * File: RadioField.tsx
 *
 * Description:
 * Generic radio field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";
import { useFieldOptions } from "../hooks/useFieldOptions";

import type { FieldComponentProps } from "./BaseField";

export default function RadioField({ field, prefix }: FieldComponentProps) {
  const { control } = useFormContext();

  const { isDisabled, isReadOnly } = useFormFieldState(field);

  const options = useFieldOptions(field.options);

  if (!field.name) {
    return null;
  }

  const fieldName = prefix ? `${prefix}.${field.name}` : field.name;

  const isLocked = isDisabled || isReadOnly;

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
          disabled={isLocked}
        >
          <RadioGroup
            value={
              controller.value === undefined || controller.value === null
                ? ""
                : String(controller.value)
            }
            disabled={isLocked}
            onValueChange={(value) => {
              if (isLocked) {
                return;
              }

              controller.onChange(value);
            }}
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
            "
          >
            {options.map((option) => {
              const optionId = `${field.id}-${String(option.value)}`;

              return (
                <div
                  key={String(option.value)}
                  className="flex items-center gap-2"
                >
                  <RadioGroupItem
                    id={optionId}
                    value={String(option.value)}
                    disabled={isLocked || option.disabled}
                    className="border-slate-300"
                  />

                  <label
                    htmlFor={optionId}
                    className="
                      cursor-pointer
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    {option.label}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </FieldWrapper>
      )}
    />
  );
}
