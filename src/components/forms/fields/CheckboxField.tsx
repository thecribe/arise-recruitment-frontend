/**
 * -----------------------------------------------------------------------------
 * File: CheckboxField.tsx
 *
 * Description:
 * Generic checkbox field integrated with React Hook Form.
 *
 * Supports:
 * - Single checkbox: boolean
 * - Multiple checkbox options: unknown[]
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";
import { useFieldOptions } from "../hooks/useFieldOptions";

import type { FieldComponentProps } from "./BaseField";

export default function CheckboxField({ field, prefix }: FieldComponentProps) {
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
      render={({ field: controller, fieldState }) => {
        /**
         * ---------------------------------------------------------------
         * Multiple checkbox options.
         * ---------------------------------------------------------------
         */

        if (field.options?.length) {
          const selectedValues = Array.isArray(controller.value)
            ? controller.value
            : [];

          return (
            <FieldWrapper
              id={field.id}
              label={field.label}
              required={field.required}
              helpText={field.helpText}
              error={fieldState.error?.message}
              width={field.width}
              disabled={isLocked}
            >
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {options.map((option) => {
                  const optionId = `${field.id}-${String(option.value)}`;

                  const isChecked = selectedValues.includes(option.value);

                  return (
                    <div
                      key={String(option.value)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        id={optionId}
                        checked={isChecked}
                        disabled={isLocked || option.disabled}
                        className="border-slate-300"
                        onCheckedChange={(checked) => {
                          if (isLocked || option.disabled) {
                            return;
                          }

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
              </div>
            </FieldWrapper>
          );
        }

        /**
         * ---------------------------------------------------------------
         * Single boolean checkbox.
         * ---------------------------------------------------------------
         */

        return (
          <FieldWrapper
            id={field.id}
            label={field.label}
            required={field.required}
            helpText={field.helpText}
            error={fieldState.error?.message}
            width={field.width}
            disabled={isLocked}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                id={field.id}
                checked={Boolean(controller.value)}
                disabled={isLocked}
                onCheckedChange={(checked) => {
                  if (isLocked) {
                    return;
                  }

                  controller.onChange(checked === true);
                }}
              />

              {field.placeholder && (
                <label
                  htmlFor={field.id}
                  className="
                    cursor-pointer
                    text-sm
                    text-slate-600
                  "
                >
                  {field.placeholder}
                </label>
              )}
            </div>
          </FieldWrapper>
        );
      }}
    />
  );
}
