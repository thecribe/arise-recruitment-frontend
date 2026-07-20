import WorkflowProvider from "@/features/workflow/providers/WorkflowProvider";
import ApplicantDashboardContent from "./ApplicantDashboardContent";

export default function ApplicantDashboard() {
  return (
    <div className="space-y-8">
      <WorkflowProvider>
        <ApplicantDashboardContent />
      </WorkflowProvider>
    </div>
  );
}
