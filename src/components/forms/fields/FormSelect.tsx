/**
 * -----------------------------------------------------------------------------
 * File: FormSelect.tsx
 * Description:
 * React Hook Form controlled select component.
 *
 * Responsibilities:
 * - Connect Shadcn Select with React Hook Form.
 * - Render validation messages.
 * - Provide consistent Airse styling.
 * -----------------------------------------------------------------------------
 */

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { useController } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FormFieldWrapper from "../FormFieldWrapper";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  required,
  helperText,
  disabled,
}: FormSelectProps<T>) {
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
      <Select
        value={field.value}
        onValueChange={field.onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={field.name}
          className="
            h-12
            rounded-2xl
            border-slate-200/80
            bg-white/80
            backdrop-blur-xl
            shadow-sm
            transition-all
            hover:border-blue-300
            focus:ring-4
            focus:ring-blue-500/15
          "
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  );
}
