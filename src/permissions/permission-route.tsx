/**
 * -----------------------------------------------------------------------------
 * File: permission-route.tsx
 *
 * Description:
 * Protects a route based on the authenticated user's permission.
 *
 * Authentication is handled separately by ProtectedRoute.
 * This component is responsible only for authorization.
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";

interface PermissionRouteProps {
  /**
   * Permission required to access the route.
   */
  permission: string;

  /**
   * Content to render when the user has the required permission.
   */
  children: ReactNode;
}

export default function PermissionRoute({
  permission,
  children,
}: PermissionRouteProps) {
  const { data: user, isLoading } = useCurrentUser();

  /**
   * Wait until the current user has been resolved.
   *
   * This prevents temporarily denying access while the
   * authentication/user request is still loading.
   */
  if (isLoading) {
    return null;
  }

  /**
   * TOP_ADMIN has unrestricted access.
   *
   * This mirrors the backend role-permission map where
   * TOP_ADMIN is represented by "*".
   */
  if (user?.role === "TOP_ADMIN") {
    return <>{children}</>;
  }

  /**
   * Check whether the current user has the required permission.
   */
  const hasPermission =
    user?.permissions?.includes(permission) ?? false;

  /**
   * Deny access when the user does not have the permission.
   *
   * We redirect to the dashboard rather than rendering the
   * requested page.
   */
  if (!hasPermission) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}