/**
 * -----------------------------------------------------------------------------
 * File: WorkflowProgress.tsx
 * Description:
 * Displays the applicant recruitment workflow.
 * -----------------------------------------------------------------------------
 */

import { GlassCard } from "@/components/ui";

import WorkflowPhase from "./WorkflowPhase";

import { useWorkflow } from "../hooks/useWorkflow";

export default function WorkflowProgress() {
  const { workflow, overallProgress } = useWorkflow();

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-6">
        <div className="mb-8 flex-1">
          <h2 className="text-xl font-semibold text-slate-900">
            Recruitment Workflow
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Complete each section to progress through your application.
          </p>
        </div>

        <div className="mt-6 flex-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Overall Progress
            </span>

            <span className="text-sm font-semibold text-blue-600">
              {overallProgress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
              style={{
                width: `${overallProgress}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {workflow.phases.map((phase, index) => (
          <div key={phase.id}>
            <WorkflowPhase phase={phase} />

            {index !== workflow.phases.length - 1 && (
              <div className="mt-6 border-b border-slate-200/60" />
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
