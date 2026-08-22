/**
 * -----------------------------------------------------------------------------
 * File: FormRendererContext.tsx
 *
 * Description:
 * Generic runtime context for the reusable form renderer.
 *
 * Important:
 * This context knows nothing about:
 *
 * - Application
 * - Recruitment
 * - Applicant
 * - Phase
 * - Section
 *
 * It only controls how the generic form behaves.
 * -----------------------------------------------------------------------------
 */

import { createContext, useContext } from "react";
import type { FormMode } from "../types/form";
import type { FormUploadedFile } from "../types/file";

export interface FormRendererContextValue {
  /**
   * Current form mode.
   */
  mode: FormMode;

  /**
   * Whether fields can be edited.
   */
  canEdit: boolean;

  /**
   * Whether the entire form is disabled.
   */
  disabled: boolean;

  /**
   * Whether the entire form is read-only.
   */
  readOnly: boolean;

  /**
   * Called when an existing backend file should be deleted.
   *
   * The consuming feature owns the actual API operation.
   */
  onDeleteFile?: (file: FormUploadedFile) => void;
}

export const FormRendererContext =
  createContext<FormRendererContextValue | null>(null);

export function useFormRendererContext() {
  const context = useContext(FormRendererContext);

  if (!context) {
    throw new Error(
      "useFormRendererContext must be used inside FormRendererProvider.",
    );
  }

  return context;
}
