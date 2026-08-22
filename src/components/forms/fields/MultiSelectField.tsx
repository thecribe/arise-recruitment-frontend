/**
 * -----------------------------------------------------------------------------
 * File: MultiSelectField.tsx
 *
 * Description:
 * Generic multi-select field integrated with React Hook Form.
 *
 * Stores selected option values as an array.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import FieldWrapper from "../FieldWrapper";

import { useFormFieldState } from "../hooks/useFormFieldState";
import { useFieldOptions } from "../hooks/useFieldOptions";

import type { FieldComponentProps } from "./BaseField";

export default function MultiSelectField({
  field,
  prefix,
}: FieldComponentProps) {
  const { control } = useFormContext();

  const [open, setOpen] = useState(false);

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
        const selectedValues = Array.isArray(controller.value)
          ? controller.value.map(String)
          : [];

        const selectedOptions = options.filter((option) =>
          selectedValues.includes(String(option.value)),
        );

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
            <Popover
              open={open}
              onOpenChange={(nextOpen) => {
                if (isLocked) {
                  return;
                }

                setOpen(nextOpen);
              }}
            >
              <PopoverTrigger
                type="button"
                disabled={isLocked}
                className="
      flex
      h-auto
      min-h-10
      w-full
      items-center
      justify-between
      rounded-md
      border
      border-slate-300
      bg-white
      px-3
      py-2
      text-left
      text-sm
      font-normal
      transition-colors
      hover:bg-slate-50
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
              >
                <span className="min-w-0 flex-1 truncate">
                  {selectedOptions.length
                    ? selectedOptions.map((option) => option.label).join(", ")
                    : (field.placeholder ?? "Select options")}
                </span>

                <ChevronDown className="ml-2 size-4 shrink-0 text-slate-500" />
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) p-3"
              >
                {/* options */}
              </PopoverContent>
            </Popover>
          </FieldWrapper>
        );
      }}
    />
  );
}
