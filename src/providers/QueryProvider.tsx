/**
 * -----------------------------------------------------------------------------
 * File: QueryProvider.tsx
 * Description:
 * Registers React Query for the entire application.
 *
 * Responsibilities:
 * - API caching
 * - Background refetching
 * - Mutations
 * - Request deduplication
 *
 * Every API call in the application will use this provider.
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Create a single Query Client instance.
 *
 * This should never be recreated on every render.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent unnecessary refetching while navigating.
      staleTime: 1000 * 60 * 5,

      // Retry failed requests once before throwing an error.
      retry: 1,

      // Automatically refetch when reconnecting.
      refetchOnReconnect: true,

      // Don't refetch just because the browser gains focus.
      refetchOnWindowFocus: false,
    },
  },
});

interface Props {
  children: ReactNode;
}

/**
 * Global React Query provider.
 */
export default function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Display React Query Devtools only during development. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}