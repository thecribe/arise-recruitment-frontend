/**
 * ---------------------------------------------------------------------------
 * File: providers.tsx
 *
 * Description:
 * Central registration point for application providers.
 * ---------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

import QueryProvider from "@/app/providers/QueryProvider";

// import AuthProvider from "@/app/providers/AuthProvider";

interface Props {
  children: ReactNode;
}

/**
 * Wraps the application with all global providers.
 */
export default function Providers({ children }: Props) {
  return (
    <QueryProvider>
      {/* <AuthProvider>{children}</AuthProvider> */}
      {children}
    </QueryProvider>
  );
}
