import { CheckCircle2, Circle, Clock3, Lock, XCircle } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

import type { WorkflowSection as Section } from "../types";
// import { WorkflowSection as Section } from "../types";

interface Props {
  section: Section;
}

export default function WorkflowSection({ section }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === section.route;
  const clickable = section.visible && section.status !== "locked";

  const icon = () => {
    switch (section.status) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;

      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />;

      case "in_progress":
        return <Clock3 className="h-5 w-5 text-amber-500" />;

      case "locked":
        return <Lock className="h-5 w-5 text-slate-300" />;

      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;

      default:
        return <Circle className="h-5 w-5 text-slate-300" />;
    }
  };

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => clickable && navigate(section.route)}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200",

        clickable && ["cursor-pointer", "hover:bg-white/70", "hover:shadow-sm"],

        !clickable && ["cursor-not-allowed", "opacity-50"],

        active && ["border", "border-blue-200", "bg-blue-50/80", "shadow-sm"],
      )}
    >
      {active && <div className="h-8 w-1 rounded-full bg-blue-600" />}
      {icon()}

      <span className="flex-1 text-sm">{section.title}</span>
    </button>
  );
}
