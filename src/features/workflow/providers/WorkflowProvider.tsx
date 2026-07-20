import type { ReactNode } from "react";

import { WorkflowContext } from "../context/workflow-context";
import { workflow } from "../mock/workflow";

interface WorkflowProviderProps {
  children: ReactNode;
}

export default function WorkflowProvider({ children }: WorkflowProviderProps) {
  return (
    <WorkflowContext.Provider
      value={{
        workflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}
