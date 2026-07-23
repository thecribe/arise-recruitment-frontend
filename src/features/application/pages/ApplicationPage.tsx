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

import ApplicationFooter from "../components/application-shell/ApplicationFooter";
import ApplicationHeader from "../components/application-shell/ApplicationHeader";
import ApplicationShell from "../components/application-shell/ApplicationShell";
import ProgressCard from "../components/application-shell/ProgressCard";
import PhaseNavigation from "../components/navigation/PhaseNavigation";
import SectionNavigation from "../components/navigation/SectionNavigation";
import ReviewPanel from "../components/ReviewPanel";
import FormRenderer from "../form-renderer/FormRenderer";
import ApplicationFormProvider from "../providers/ApplicationFormProvider";

export default function ApplicationPage() {
  return (
    <ApplicationShell>
      <div className="space-y-8">
        <ApplicationHeader />

        <ProgressCard />

        <PhaseNavigation />

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <SectionNavigation />

          <div className="space-y-6">
            <ReviewPanel />

            <ApplicationFormProvider>
              <FormRenderer />
            </ApplicationFormProvider>
          </div>
        </div>

        <ApplicationFooter />
      </div>
    </ApplicationShell>
  );
}
