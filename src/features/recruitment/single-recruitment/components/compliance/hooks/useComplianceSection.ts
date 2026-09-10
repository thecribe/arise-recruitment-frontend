import { useContext } from "react";
import { ComplianceSectionContext } from "../context/ComplianceSectionContext";

export function useComplianceSection() {
  const context = useContext(ComplianceSectionContext);

  if (!context) {
    throw new Error(
      "useComplianceSection must be used within ComplianceSectionProvider",
    );
  }

  return context;
}

export default useComplianceSection;
