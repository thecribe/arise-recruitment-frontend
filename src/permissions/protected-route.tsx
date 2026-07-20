/**
 * -----------------------------------------------------------------------------
 * File: ProtectedRoute.tsx
 * Description:
 * Route guard for authenticated pages.
 *
 * Responsibilities:
 * - Verify the authenticated user session.
 * - Display a loading screen while authentication is loading.
 * - Redirect unauthenticated users to the login page.
 * - Render protected routes for authenticated users.
 * -----------------------------------------------------------------------------
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { ROUTES } from "@/constants/routes";
import PageLoader from "@/components/feedback/page-loader";

/**
 * Protects authenticated routes.
 */
export default function ProtectedRoute() {
  const location = useLocation();

  const { data: user, isPending, isError } = useCurrentUser();

  /**
   * Authentication state is loading.
   */
  if (isPending) {
    return <PageLoader />;
  }

  /**
   * User is not authenticated.
   */
  if (isError || !user) {
    return (
      <Navigate
        to={ROUTES.AUTH.LOGIN}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /**
   * User authenticated.
   */
  return <Outlet />;
}
