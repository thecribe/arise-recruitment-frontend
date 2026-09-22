import { useState } from "react";

import { useInterview } from "../hooks/useInterview";

import InterviewNotes from "./InterviewNotes";
import InterviewScoresheetForm from "./InterviewScoresheetForm";

type InterviewTab = "scoresheet" | "notes";

interface InterviewWorkspaceProps {
  applicationId: string;
}

export default function InterviewWorkspace({
  applicationId,
}: InterviewWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<InterviewTab>("scoresheet");

  const { data: interview } = useInterview(applicationId);

  const tabs: {
    value: InterviewTab;
    label: string;
  }[] = [
    {
      value: "scoresheet",
      label: "Scoresheet",
    },
    {
      value: "notes",
      label: "Interview Notes",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Interview Navigation */}
      <div className="inline-flex max-w-full rounded-2xl border border-white/20 bg-white/70 p-1.5 shadow-lg backdrop-blur-xl">
        <div
          className="flex max-w-full flex-wrap gap-1"
          role="tablist"
          aria-label="Interview sections"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.value)}
                className={[
                  "rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                  "whitespace-nowrap",
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scoresheet */}
      {activeTab === "scoresheet" && (
        <InterviewScoresheetForm applicationId={applicationId} />
      )}

      {/* Notes */}
      {activeTab === "notes" && (
        <>
          {interview?.id ? (
            <InterviewNotes interviewId={interview.id} />
          ) : (
            <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-6 text-center text-sm text-slate-600">
              Save the interview scoresheet before adding notes.
            </div>
          )}
        </>
      )}
    </div>
  );
}
