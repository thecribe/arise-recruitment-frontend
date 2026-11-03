/**
 * -----------------------------------------------------------------------------
 * File: ApplicationPage.tsx
 *
 * Description:
 * Applicant application page.
 *
 * Coordinates the overall application layout.
 * Business logic is handled by ApplicationShell.
 * -----------------------------------------------------------------------------
 */

import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import ApplicationFooter from "../components/application-shell/ApplicationFooter";
import ApplicationHeader from "../components/application-shell/ApplicationHeader";
import ApplicationShell from "../components/application-shell/ApplicationShell";
// import ProgressCard from "../components/application-shell/ProgressCard";
import PhaseNavigation from "../components/navigation/PhaseNavigation";
import SectionNavigation from "../components/navigation/SectionNavigation";
import ReviewPanel from "../components/ReviewPanel";
import ApplicationFormRenderer from "../form-renderer/ApplicationFormRenderer";
import ApplicationFormProvider from "../providers/ApplicationFormProvider";
import PageLoader from "@/components/feedback/page-loader";
import { adminRoles } from "@/constants/roles";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function ApplicationPage() {
  const { data: user, isPending } = useCurrentUser();
  const location = useLocation();

  if (isPending) {
    return <PageLoader />;
  }

  if (user && adminRoles.includes(user.role)) {
    return (
      <Navigate
        to={ROUTES.RECRUITMENT.ROOT}
        replace
        state={{
          from: location,
        }}
      />
    );
  }
  return (
    <ApplicationShell>
      <div className="space-y-8">
        <ApplicationHeader />

        {/* <ProgressCard /> */}

        <PhaseNavigation />

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <SectionNavigation />

          <div
            className="space-y-6   
        rounded-3xl
        border
        border-white/20
        bg-white/70
        backdrop-blur-xl
        shadow-lg
        p-5
      "
          >
            <ReviewPanel />

            <ApplicationFormProvider>
              <ApplicationFormRenderer />
              <ApplicationFooter />
            </ApplicationFormProvider>
          </div>
        </div>
      </div>
    </ApplicationShell>
  );
}
