import { createContext } from "react";

import type { RecruitmentWorkflow } from "../types";

export interface WorkflowContextValue {
  workflow: RecruitmentWorkflow;
}

export const WorkflowContext = createContext<WorkflowContextValue | null>(null);
