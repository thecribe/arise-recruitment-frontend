/**
 * -----------------------------------------------------------------------------
 * File: SelectField.tsx
 *
 * Description:
 * Generic select field integrated with React Hook Form.
 *
 * Supports:
 * - Dynamic options
 * - Option visibility
 * - Disabled options
 * - Form disabled/read-only state
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";
import { useFieldOptions } from "../hooks/useFieldOptions";

import type { FieldComponentProps } from "./BaseField";

export default function SelectField({ field, prefix }: FieldComponentProps) {
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
          <Select
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
          >
            <SelectTrigger id={field.id} className="border-slate-300">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldWrapper>
      )}
    />
  );
}
