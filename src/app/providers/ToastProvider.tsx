/**
 * -----------------------------------------------------------------------------
 * File: ToastProvider.tsx
 * Description:
 * Registers the global toast notification system.
 *
 * Library:
 * Sonner
 *
 * Any component can trigger:
 * toast.success(...)
 * toast.error(...)
 * toast.warning(...)
 * -----------------------------------------------------------------------------
 */

import { Toaster } from "sonner";

/**
 * Global notification provider.
 */
export default function ToastProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      closeButton
      expand={false}
      duration={4000}
    />
  );
}