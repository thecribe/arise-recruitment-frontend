/**
 * -----------------------------------------------------------------------------
 * File: FormCheckbox.tsx
 * Description:
 * React Hook Form controlled checkbox component.
 *
 * Responsibilities:
 * - Connect checkbox with React Hook Form.
 * - Render validation errors.
 * - Maintain consistent Airse styling.
 * -----------------------------------------------------------------------------
 */

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { useController } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";

import FormFieldWrapper from "../FormFieldWrapper";

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  required?: boolean;
  helperText?: string;
}

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  required,
  helperText,
}: FormCheckboxProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  return (
    <FormFieldWrapper
      id={field.name}
      label=""
      required={required}
      helperText={helperText}
      error={fieldState.error?.message}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={field.name}
          checked={field.value}
          onCheckedChange={field.onChange}
        />

        <label
          htmlFor={field.name}
          className="
            cursor-pointer
            text-sm
            leading-relaxed
            text-slate-600
          "
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>
    </FormFieldWrapper>
  );
}
