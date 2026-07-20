/**
 * -----------------------------------------------------------------------------
 * File: ApplicantDashboardContent.tsx
 * Description:
 * Applicant dashboard content.
 * Consumes workflow data from WorkflowProvider.
 * -----------------------------------------------------------------------------
 */

import ApplicantSummaryCard from "./ApplicantSummaryCard";
import RecruiterCommentsCard from "./RecruiterCommentsCard";
import OutstandingDocumentsCard from "./OutstandingDocumentsCard";
import ApplicationTimelineCard from "./ApplicationTimelineCard";

import WorkflowProgress from "@/features/workflow/components/WorkflowProgress";
import { applicantSummary } from "../../utils/mock";

export default function ApplicantDashboardContent() {
  return (
    <div className="space-y-8">
      <ApplicantSummaryCard applicant={applicantSummary} />

      <WorkflowProgress />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecruiterCommentsCard />

        <OutstandingDocumentsCard />
      </div>

      <ApplicationTimelineCard />
    </div>
  );
}
