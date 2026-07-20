import { RootLayout, AuthLayout, DashboardLayout } from "@/layouts";

import {
  LoginPage,
  DashboardPage,
  RecruitmentPage,
  ApplicationPage,
  CompliancePage,
  StaffPage,
  SettingsPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "./lazy";

import RouteSuspense from "./suspense";
import { ROUTES } from "@/constants/routes";
import ProtectedRoute from "@/permissions/protected-route";

export const appRoutes = [
  {
    element: <RootLayout />,
    children: [
      /**
       * ---------------------------------------------------------
       * Public Authentication Routes
       * ---------------------------------------------------------
       */
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTES.AUTH.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: ROUTES.AUTH.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
        ],
      },

      /**
       * ---------------------------------------------------------
       * Protected Dashboard Routes
       * ---------------------------------------------------------
       */
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: ROUTES.DASHBOARD,
                element: (
                  <RouteSuspense>
                    <DashboardPage />
                  </RouteSuspense>
                ),
              },
              {
                path: ROUTES.APPLICATION.ROOT,
                element: (
                  <RouteSuspense>
                    <ApplicationPage />
                  </RouteSuspense>
                ),
              },
              {
                path: ROUTES.RECRUITMENT.ROOT,
                element: (
                  <RouteSuspense>
                    <RecruitmentPage />
                  </RouteSuspense>
                ),
              },
              {
                path: ROUTES.COMPLIANCE.ROOT,
                element: (
                  <RouteSuspense>
                    <CompliancePage />
                  </RouteSuspense>
                ),
              },
              {
                path: ROUTES.STAFF.ROOT,
                element: (
                  <RouteSuspense>
                    <StaffPage />
                  </RouteSuspense>
                ),
              },
              {
                path: ROUTES.SETTINGS,
                element: (
                  <RouteSuspense>
                    <SettingsPage />
                  </RouteSuspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
];
