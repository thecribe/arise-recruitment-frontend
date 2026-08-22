/**
 * -----------------------------------------------------------------------------
 * File: FormRendererProvider.tsx
 *
 * Description:
 * Provides generic runtime configuration to all form fields.
 *
 * This provider does not create the React Hook Form instance.
 *
 * React Hook Form's FormProvider remains responsible for form state.
 * -----------------------------------------------------------------------------
 */

import type { PropsWithChildren } from "react";
import type { FormRendererConfig } from "../types/form";
import {
  FormRendererContext,
  type FormRendererContextValue,
} from "./FormRendererContext";

interface FormRendererProviderProps extends PropsWithChildren {
  config: FormRendererConfig;

  onDeleteFile?: (file: import("../types/file").FormUploadedFile) => void;
}

export default function FormRendererProvider({
  config,
  onDeleteFile,
  children,
}: FormRendererProviderProps) {
  /**
   * ---------------------------------------------------------------------------
   * Resolve form mode.
   * ---------------------------------------------------------------------------
   */

  const mode = config.mode;

  /**
   * ---------------------------------------------------------------------------
   * Resolve edit permission.
   *
   * Explicit canEdit takes precedence.
   *
   * If not provided, edit capability is derived from the mode.
   * ---------------------------------------------------------------------------
   */

  const canEdit = config.canEdit ?? mode === "edit";

  /**
   * ---------------------------------------------------------------------------
   * Global disabled state.
   * ---------------------------------------------------------------------------
   */

  const disabled = config.disabled ?? false;

  /**
   * ---------------------------------------------------------------------------
   * Global read-only state.
   * ---------------------------------------------------------------------------
   */

  const readOnly = config.readOnly ?? mode === "view";

  const value: FormRendererContextValue = {
    mode,

    canEdit,

    disabled,

    readOnly,

    onDeleteFile,
  };

  return (
    <FormRendererContext.Provider value={value}>
      {children}
    </FormRendererContext.Provider>
  );
}
