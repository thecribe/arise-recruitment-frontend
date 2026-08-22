/**
 * -----------------------------------------------------------------------------
 * File: SwitchField.tsx
 *
 * Description:
 * Generic switch field integrated with React Hook Form.
 * -----------------------------------------------------------------------------
 */

import { Controller, useFormContext } from "react-hook-form";

import { Switch } from "@/components/ui/switch";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";

import type { FieldComponentProps } from "./BaseField";

export default function SwitchField({ field, prefix }: FieldComponentProps) {
  const { control } = useFormContext();

  const { isDisabled, isReadOnly } = useFormFieldState(field);

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
          <div className="flex items-center gap-3">
            <Switch
              id={field.id}
              checked={Boolean(controller.value)}
              disabled={isLocked}
              onCheckedChange={(checked) => {
                if (isLocked) {
                  return;
                }

                controller.onChange(checked);
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
      )}
    />
  );
}
