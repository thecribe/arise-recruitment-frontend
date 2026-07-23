import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { useApplicationForm } from "../../hooks/useApplicationForm";
import { useFieldState } from "../../hooks/useFieldState";

import FieldWrapper from "../FieldWrapper";

import type { FieldComponentProps } from "./BaseField";

export default function UploadField({ field, prefix }: FieldComponentProps) {
  const { control } = useApplicationForm();

  const { isDisabled } = useFieldState(field);

  if (!field.name) return null;

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
          <Input
            id={field.id}
            type="file"
            disabled={isDisabled}
            multiple={field.file?.multiple}
            accept={field.file?.accept?.join(",")}
            className="
    w-full
    min-w-0
    file:mr-4
    file:rounded-md
    file:border-0
    file:bg-blue-50
    file:px-3
    file:py-2
    file:text-sm
    file:font-medium
    file:text-blue-700
  "
            onChange={(event) => {
              if (isDisabled) return;

              const files = event.target.files;

              if (!files) {
                controller.onChange(null);
                return;
              }

              controller.onChange(
                field.file?.multiple ? Array.from(files) : files[0],
              );
            }}
          />
        </FieldWrapper>
      )}
    />
  );
}
