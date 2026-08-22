import { useFormContext } from "react-hook-form";

export function useGenericFormContext() {
  return useFormContext<Record<string, unknown>>();
}
