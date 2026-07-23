import { Controller } from "react-hook-form";

import { Switch } from "@/components/ui/switch";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";

export default function SwitchField({ field, prefix }: FieldComponentProps) {
  const { control } = useApplicationForm();

  const { isDisabled } = useFieldState(field);

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
          <div className="flex items-center gap-3">
            <Switch
              id={field.id}
              checked={Boolean(controller.value)}
              disabled={isDisabled}
              onCheckedChange={(checked) => {
                if (isDisabled) return;
                controller.onChange(checked);
              }}
            />

            <span className="text-sm text-slate-600">{field.placeholder}</span>
          </div>
        </FieldWrapper>
      )}
    />
  );
}
