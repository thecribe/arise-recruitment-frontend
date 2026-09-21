import { ClipboardCheck, GraduationCap, Users } from "lucide-react";

export type ComplianceTab =
  | "compliance-forms"
  | "references"
  | "training-certificates";

interface ApplicantComplianceTabsProps {
  activeTab: ComplianceTab;
  onTabChange: (tab: ComplianceTab) => void;
}

const tabs: Array<{
  id: ComplianceTab;
  label: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    id: "compliance-forms",
    label: "Compliance Forms",
    description: "Complete required forms",
    icon: ClipboardCheck,
  },
  {
    id: "references",
    label: "References",
    description: "Manage your references",
    icon: Users,
  },
  {
    id: "training-certificates",
    label: "Training Certificates",
    description: "Manage your certificates",
    icon: GraduationCap,
  },
];

export default function ApplicantComplianceTabs({
  activeTab,
  onTabChange,
}: ApplicantComplianceTabsProps) {
  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-white/20 bg-white/70 p-2 shadow-lg backdrop-blur-xl">
      <div className="flex min-w-max gap-2 lg:min-w-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex min-w-[190px] flex-1 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 lg:min-w-0",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
              ].join(" ")}
            >
              <div
                className={[
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-blue-100 text-blue-600",
                ].join(" ")}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold">{tab.label}</p>

                <p
                  className={[
                    "mt-0.5 text-xs",
                    isActive ? "text-blue-100" : "text-slate-500",
                  ].join(" ")}
                >
                  {tab.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
