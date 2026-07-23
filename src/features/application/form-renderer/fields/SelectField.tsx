import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";
import { useFieldOptions } from "../../utils/useFieldOptions";

export default function SelectField({ field, prefix }: FieldComponentProps) {
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
          <Select
            value={controller.value ?? ""}
            onValueChange={(value) => {
              if (isDisabled) return;
              controller.onChange(value);
            }}
            disabled={isDisabled}
          >
            <SelectTrigger id={field.id}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
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
