/**
 * ---------------------------------------------------------------------------
 * File: ProtectedRoute.tsx
 *
 * Description:
 *
 * Protects routes that require authentication.
 *
 * If user is not authenticated,
 * redirect to login.
 * ---------------------------------------------------------------------------
 */

import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useAuth } from "./auth";
import PageLoader from "@/components/feedback/page-loader";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <PageLoader />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
}
