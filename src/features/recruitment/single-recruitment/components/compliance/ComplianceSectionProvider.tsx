import type { PropsWithChildren } from "react";
import { useComplianceSectionValues } from "./hooks/useComplianceSectionValues";
import { ComplianceSectionContext } from "./context/ComplianceSectionContext";

interface ComplianceSectionProviderProps extends PropsWithChildren {
  applicationId: string;
  applicantId: string;
  sectionId: string;
}

export default function ComplianceSectionProvider({
  applicationId,
  applicantId,
  sectionId,
  children,
}: ComplianceSectionProviderProps) {
  const values = useComplianceSectionValues({
    applicationId,
    applicantId,
    sectionId,
  });

  return (
    <ComplianceSectionContext.Provider value={values}>
      {children}
    </ComplianceSectionContext.Provider>
  );
}
