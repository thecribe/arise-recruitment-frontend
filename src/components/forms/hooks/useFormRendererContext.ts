/**
 * -----------------------------------------------------------------------------
 * File: useFormRendererContext.ts
 *
 * Description:
 * Accesses the generic form renderer context.
 * -----------------------------------------------------------------------------
 */

import { useContext } from "react";
import { FormRendererContext } from "../context/FormRendererContext";

export function useFormRendererContext() {
  const context = useContext(FormRendererContext);

  if (!context) {
    throw new Error(
      "useFormRendererContext must be used inside FormRendererContextProvider.",
    );
  }

  return context;
}
