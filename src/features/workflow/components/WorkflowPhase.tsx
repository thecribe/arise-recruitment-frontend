import { ChevronDown, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PhaseProgressBar from "./PhaseProgressBar";
import WorkflowSection from "./WorkflowSection";
import WorkflowStatusBadge from "./WorkflowStatusBadge";

import { type WorkflowPhase as Phase } from "../types";
import { cn } from "@/lib/utils";
import { calculatePhaseProgress } from "../utils";

interface Props {
  phase: Phase;
}

export default function WorkflowPhase({ phase }: Props) {
  const location = useLocation();

  const hasActiveSection = phase.sections.some(
    (section) => section.route === location.pathname,
  );

  const [expanded, setExpanded] = useState(phase.unlocked || hasActiveSection);
  return (
    <div className="rounded-2xl p-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "clickable flex w-full items-center justify-between rounded-xl p-2 transition",

          hasActiveSection && "bg-blue-50/60",
        )}
      >
        <div className="flex items-center gap-3">
          {!phase.unlocked ? (
            <Lock className="h-5 w-5 text-slate-400" />
          ) : expanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}

          <div className="text-left">
            <h3 className="font-semibold">{phase.title}</h3>

            <p className="text-sm text-slate-500">
              {phase.sections.length} Sections
            </p>
          </div>
        </div>

        <WorkflowStatusBadge status={phase.status} />
      </button>

      {phase.unlocked && (
        <>
          <PhaseProgressBar progress={calculatePhaseProgress(phase)} />

          {expanded && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              {phase.sections.map((section) => (
                <WorkflowSection key={section.id} section={section} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
