import type { Control, FieldValues, Path } from "react-hook-form";

export interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;

  label: string;

  description?: string;

  placeholder?: string;

  disabled?: boolean;

  required?: boolean;
}
