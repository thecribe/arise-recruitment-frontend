import { getApplicantComplianceFields } from "../config/compliance-sections";
import ApplicantComplianceFormProvider from "../providers/ApplicantComplianceFormProvider";
import ComplianceFormsSidebar from "./ComplianceFormsSidebar";
import ComplianceFormWorkspace from "./ComplianceFormWorkspace";

export default function ComplianceFormsTab() {
  return (
    <ApplicantComplianceFormProvider getFields={getApplicantComplianceFields}>
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ComplianceFormsSidebar />

        <div className="min-w-0">
          <ComplianceFormWorkspace />
        </div>
      </div>
    </ApplicantComplianceFormProvider>
  );
}
