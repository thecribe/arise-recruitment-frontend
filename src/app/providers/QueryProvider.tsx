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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./auth-provider";
import { Toaster } from "@/components/ui/sonner";

/**
 * Create a single Query Client instance.
 *
 * This should never be recreated on every render.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,

      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 30,

      refetchOnWindowFocus: false,

      refetchOnReconnect: true,

      refetchOnMount: false,
    },

    mutations: {
      retry: 0,
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
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>

      {/* Display React Query Devtools only during development. */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
