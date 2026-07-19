import { lazy } from "react";

export const LoginPage = lazy(() => import("@/features/auth/pages/login-page"));
export const RegisterPage = lazy(
  () => import("@/features/auth/pages/register-page"),
);
export const ResetPasswordPage = lazy(
  () => import("@/features/auth/pages/reset-password-page"),
);
export const ForgotPasswordPage = lazy(
  () => import("@/features/auth/pages/forgot-password-page"),
);

export const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/dashboard-page"),
);

export const ApplicationPage = lazy(
  () => import("@/features/application/pages/application-page"),
);

export const RecruitmentPage = lazy(
  () => import("@/features/recruitment/pages/recruitment-page"),
);

export const CompliancePage = lazy(
  () => import("@/features/compliance/pages/compliance-page"),
);

export const StaffPage = lazy(
  () => import("@/features/staff/pages/staff-page"),
);

export const SettingsPage = lazy(
  () => import("@/features/settings/pages/settings-page"),
);
