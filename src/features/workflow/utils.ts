import type {
  RecruitmentWorkflow,
  WorkflowPhase,
  WorkflowSection,
} from "./types";

/**
 * Returns the current phase.
 */
export function getCurrentPhase(
  workflow: RecruitmentWorkflow,
): WorkflowPhase | undefined {
  return workflow.phases.find((phase) => phase.id === workflow.currentPhaseId);
}

/**
 * Returns the current section.
 */
export function getCurrentSection(
  workflow: RecruitmentWorkflow,
): WorkflowSection | undefined {
  return getCurrentPhase(workflow)?.sections.find(
    (section) => section.id === workflow.currentSectionId,
  );
}

/**
 * Calculates the completion percentage for a phase.
 */
export function calculatePhaseProgress(phase: WorkflowPhase): number {
  if (!phase.sections.length) return 0;

  const completed = phase.sections.filter(
    (section) =>
      section.status === "completed" || section.status === "approved",
  ).length;

  return Math.round((completed / phase.sections.length) * 100);
}

/**
 * Calculates the completion percentage for the entire workflow.
 */
export function calculateWorkflowProgress(
  workflow: RecruitmentWorkflow,
): number {
  const sections = workflow.phases.flatMap((phase) => phase.sections);

  if (!sections.length) return 0;

  const completed = sections.filter(
    (section) =>
      section.status === "completed" || section.status === "approved",
  ).length;

  return Math.round((completed / sections.length) * 100);
}

/**
 * Finds a workflow phase by id.
 */
export function findPhase(
  workflow: RecruitmentWorkflow,
  phaseId: string,
): WorkflowPhase | undefined {
  return workflow.phases.find((phase) => phase.id === phaseId);
}

/**
 * Finds a workflow section by id.
 */
export function findSection(
  workflow: RecruitmentWorkflow,
  sectionId: string,
): WorkflowSection | undefined {
  for (const phase of workflow.phases) {
    const section = phase.sections.find((section) => section.id === sectionId);

    if (section) {
      return section;
    }
  }

  return undefined;
}

/**
 * Determines whether a section is accessible.
 */
export function canAccessSection(section: WorkflowSection): boolean {
  return section.visible && section.status !== "locked";
}
