/**
 * -----------------------------------------------------------------------------
 * File: FormInput.tsx
 * Description:
 * React Hook Form controlled input component.
 *
 * Responsibilities:
 * - Connect input with React Hook Form.
 * - Render validation errors.
 * - Provide consistent Airse styling.
 * -----------------------------------------------------------------------------
 */

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { useController } from "react-hook-form";

import { Input } from "@/components/ui/input";
import FormFieldWrapper from "../FormFieldWrapper";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required,
  helperText,
  disabled,
  icon,
}: FormInputProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  return (
    <FormFieldWrapper
      id={field.name}
      label={label}
      required={required}
      helperText={helperText}
      error={fieldState.error?.message}
    >
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <Input
          {...field}
          id={field.name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={icon ? "pl-11" : undefined}
        />
      </div>
    </FormFieldWrapper>
  );
}
