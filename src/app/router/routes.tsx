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
  TrainingCertificateRequirementsPage,
  ApplicantCompliancePage,
} from "./lazy";

import RouteSuspense from "./suspense";
import { ROUTES } from "@/constants/routes";
import ProtectedRoute from "@/permissions/protected-route";
import VerifyEmailPage from "@/features/auth/pages/verify-email-page";
import GeneralLayout from "@/layouts/general-layout";
import PermissionRoute from "@/permissions/permission-route";
import { PERMISSIONS } from "@/constants/permission";
import RecruitmentApplicantPage from "@/features/recruitment/pages/RecruitmentApplicantPage";
import SettingsLayout from "@/features/settings/components/SettingsLayout";
import GeneralSettingsPage from "@/features/settings/components/general-settings/GeneralSettingsPage";
import JobTypesSettingsPage from "@/features/settings/pages/JobTypesSettingsPage";
import RolesPermissionsPage from "@/features/settings/pages/RolesPermissionsPage";
import UserManagementPage from "@/features/settings/pages/UserManagementPage";
import UserProfilePage from "@/features/settings/pages/UserProfilePage";

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
            path: ROUTES.ROOT,
            element: <LoginPage />,
          },
          {
            path: ROUTES.AUTH.REGISTER,
            element: <RegisterPage />,
          },
        ],
      },

      {
        element: <GeneralLayout />,
        children: [
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: ROUTES.AUTH.VERIFY_EMAIL,
            element: <VerifyEmailPage />,
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
                path: ROUTES.APPLICATION.COMPLIANCE,
                element: (
                  <RouteSuspense>
                    <ApplicantCompliancePage />
                  </RouteSuspense>
                ),
              },
              {
                path: ROUTES.RECRUITMENT.ROOT,
                element: (
                  <PermissionRoute
                    permission={PERMISSIONS.RECRUITMENT_VIEW.name}
                  >
                    <RouteSuspense>
                      <RecruitmentPage />
                    </RouteSuspense>
                  </PermissionRoute>
                ),
              },
              {
                path: ROUTES.RECRUITMENT.APPLICANT,
                element: (
                  <PermissionRoute
                    permission={PERMISSIONS.RECRUITMENT_VIEW.name}
                  >
                    <RouteSuspense>
                      <RecruitmentApplicantPage />
                    </RouteSuspense>
                  </PermissionRoute>
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
                  <PermissionRoute
                    permission={PERMISSIONS.RECRUITMENT_VIEW.name}
                  >
                    <SettingsLayout />
                  </PermissionRoute>
                ),
                children: [
                  {
                    index: true,
                    element: (
                      <RouteSuspense>
                        <SettingsPage />
                      </RouteSuspense>
                    ),
                  },
                  {
                    path: "general",
                    element: (
                      <RouteSuspense>
                        <GeneralSettingsPage />
                      </RouteSuspense>
                    ),
                  },
                  {
                    path: "job-types",
                    element: (
                      <RouteSuspense>
                        <JobTypesSettingsPage />
                      </RouteSuspense>
                    ),
                  },
                  {
                    path: "roles-permissions",
                    element: (
                      <RouteSuspense>
                        <RolesPermissionsPage />
                      </RouteSuspense>
                    ),
                  },
                  {
                    path: "users",
                    element: (
                      <RouteSuspense>
                        <UserManagementPage />
                      </RouteSuspense>
                    ),
                  },
                  {
                    path: "users/:id",
                    element: (
                      <RouteSuspense>
                        <UserProfilePage />
                      </RouteSuspense>
                    ),
                  },
                  {
                    path: "compliance/training-certificates",
                    element: (
                      <RouteSuspense>
                        <TrainingCertificateRequirementsPage />
                      </RouteSuspense>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
