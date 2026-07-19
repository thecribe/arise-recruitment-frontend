import { Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return children;
}
