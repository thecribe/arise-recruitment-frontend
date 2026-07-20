import { useContext } from "react";

import { WorkflowContext } from "../context/workflow-context";

import {
  calculateWorkflowProgress,
  getCurrentPhase,
  getCurrentSection,
} from "../utils";

export function useWorkflow() {
  const context = useContext(WorkflowContext);

  if (!context) {
    throw new Error("useWorkflow must be used within WorkflowProvider");
  }

  const workflow = context.workflow;

  return {
    workflow,

    currentPhase: getCurrentPhase(workflow),

    currentSection: getCurrentSection(workflow),

    overallProgress: calculateWorkflowProgress(workflow),
  };
}
