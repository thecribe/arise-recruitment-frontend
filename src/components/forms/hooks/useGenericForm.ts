/**
 * -----------------------------------------------------------------------------
 * File: useGenericForm.ts
 *
 * Description:
 * Generic React Hook Form factory for dynamic forms.
 *
 * This hook is feature-agnostic.
 *
 * It can be used by:
 * - Application
 * - Recruitment
 * - Compliance
 * - Staff
 * - Interview
 * - Settings
 *
 * Responsibilities:
 * - Build default values from field definitions.
 * - Normalize backend values.
 * - Create the validation schema.
 * - Initialize React Hook Form.
 * - Expose a reset helper for lazy-loaded section values.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useMemo } from "react";

import {
  useForm,
  type DefaultValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { createFormValues } from "../utils/createFormValues";
import type { FormField } from "../types/field";
import type { FormMode } from "../types/form";
import { buildFormSchema } from "../utils/buildFormSchema";

export interface UseGenericFormOptions {
  /**
   * Field definitions rendered by the form.
   */
  fields: FormField[];

  /**
   * Values returned by the backend.
   */
  values?: Record<string, unknown> | null;

  /**
   * Current form mode.
   */
  mode?: FormMode;

  /**
   * Additional React Hook Form configuration.
   */
  formOptions?: Omit<
    UseFormProps<Record<string, unknown>>,
    "resolver" | "defaultValues"
  >;
}

export interface UseGenericFormReturn extends UseFormReturn<
  Record<string, unknown>
> {
  /**
   * Resets the form using a new set of backend values.
   */
  resetWithValues: (values?: Record<string, unknown> | null) => void;
}

export function useGenericForm({
  fields,
  values,
  mode = "edit",
  formOptions,
}: UseGenericFormOptions): UseGenericFormReturn {
  /**
   * ---------------------------------------------------------------------------
   * Build validation schema.
   * ---------------------------------------------------------------------------
   */

  const schema = useMemo(() => buildFormSchema(fields), [fields]);

  /**
   * ---------------------------------------------------------------------------
   * Build initial values.
   *
   * This includes:
   *
   * - field defaults
   * - backend values
   * - normalized uploaded files
   * ---------------------------------------------------------------------------
   */

  const defaultValues = useMemo(
    () => createFormValues(fields, values),
    [fields, values],
  );

  /**
   * ---------------------------------------------------------------------------
   * Initialize React Hook Form.
   * ---------------------------------------------------------------------------
   */

  const methods = useForm<Record<string, unknown>>({
    ...formOptions,

    resolver: zodResolver(schema),

    mode: formOptions?.mode ?? "onBlur",

    reValidateMode: formOptions?.reValidateMode ?? "onChange",

    defaultValues: defaultValues as DefaultValues<Record<string, unknown>>,
  });

  /**
   * ---------------------------------------------------------------------------
   * Reset using backend values.
   *
   * Useful when a Recruitment section is loaded lazily after the form
   * component has already mounted.
   * ---------------------------------------------------------------------------
   */

  const resetWithValues = useCallback(
    (nextValues?: Record<string, unknown> | null) => {
      const nextFormValues = createFormValues(fields, nextValues);

      methods.reset(nextFormValues);
    },
    [fields, methods],
  );

  /**
   * ---------------------------------------------------------------------------
   * Read-only/view mode.
   *
   * The actual disabled/read-only behavior is handled by FormRendererContext.
   *
   * `mode` is deliberately not injected into individual field components.
   * ---------------------------------------------------------------------------
   */

  void mode;

  return {
    ...methods,
    resetWithValues,
  };
}
