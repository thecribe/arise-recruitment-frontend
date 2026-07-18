/**
 * -----------------------------------------------------------------------------
 * File: providers.tsx
 * Description:
 * Central registration point for all application providers.
 *
 * Responsibilities:
 * - React Query
 * - Router
 * - Toast Notifications
 *
 * Future Providers:
 * - Theme Provider
 * - Authentication Provider (if required)
 * -----------------------------------------------------------------------------
 */

import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";

/**
 * Registers every global provider used by the application.
 */
export default function Providers() {
  return (
    <QueryProvider>
      <ToastProvider />
    </QueryProvider>
  );
}