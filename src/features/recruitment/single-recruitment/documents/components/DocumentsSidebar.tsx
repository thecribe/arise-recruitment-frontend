import {
  ClipboardCheck,
  FileText,
  Files,
  NotebookText,
  ShieldCheck,
  Upload,
} from "lucide-react";

export type DocumentView =
  | "application-form"
  | "interview-scoresheet"
  | "interview-notes"
  | "compliance-summary"
  | "uploaded-documents";

interface DocumentsSidebarProps {
  activeView: DocumentView;
  onViewChange: (view: DocumentView) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface SidebarItem {
  id: DocumentView;
  label: string;
  description: string;
  icon: React.ElementType;
}

const systemDocuments: SidebarItem[] = [
  {
    id: "application-form",
    label: "Application Form",
    description: "Applicant information",
    icon: FileText,
  },
  {
    id: "interview-scoresheet",
    label: "Interview Scoresheet",
    description: "Interview assessment",
    icon: ClipboardCheck,
  },
  {
    id: "interview-notes",
    label: "Interview Notes",
    description: "Recruitment notes",
    icon: NotebookText,
  },
  {
    id: "compliance-summary",
    label: "Compliance Summary",
    description: "Compliance information",
    icon: ShieldCheck,
  },
];

const SidebarItemButton = ({
  item,
  activeView,
  onViewChange,
  onCloseMobile,
}: {
  item: SidebarItem;
  activeView: DocumentView;
  onViewChange: (view: DocumentView) => void;
  onCloseMobile: () => void;
}) => {
  const Icon = item.icon;
  const isActive = activeView === item.id;

  return (
    <button
      type="button"
      onClick={() => {
        onViewChange(item.id);
        onCloseMobile();
      }}
      className={[
        "group flex w-full items-center gap-3 rounded-xl px-3 py-3",
        "text-left transition-all duration-200",
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-700",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isActive
            ? "bg-white/15 text-white"
            : "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
        ].join(" ")}
      >
        <Icon size={18} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{item.label}</span>

        <span
          className={[
            "mt-0.5 block truncate text-xs",
            isActive ? "text-blue-100" : "text-slate-400",
          ].join(" ")}
        >
          {item.description}
        </span>
      </span>
    </button>
  );
};

const DocumentsSidebar = ({
  activeView,
  onViewChange,
  isMobileOpen,
  onCloseMobile,
}: DocumentsSidebarProps) => {
  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close documents navigation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[285px] flex-col",
          "border-r border-white/60 bg-white/90 p-4 shadow-2xl backdrop-blur-xl",
          "transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            {/* <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Workspace
            </p> */}
            <h2 className="mt-1 text-lg font-bold text-slate-900">Documents</h2>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto">
          <section>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              System Documents
            </p>

            <div className="space-y-1">
              {systemDocuments.map((item) => (
                <SidebarItemButton
                  key={item.id}
                  item={item}
                  activeView={activeView}
                  onViewChange={onViewChange}
                  onCloseMobile={onCloseMobile}
                />
              ))}
            </div>
          </section>

          <section>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Manager Documents
            </p>

            <SidebarItemButton
              item={{
                id: "uploaded-documents",
                label: "Uploaded Documents",
                description: "Manage uploaded files",
                icon: Files,
              }}
              activeView={activeView}
              onViewChange={onViewChange}
              onCloseMobile={onCloseMobile}
            />
          </section>
        </nav>

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
          <div className="flex items-center gap-2 text-blue-700">
            <Upload size={16} />
            <span className="text-xs font-semibold">Manager Access</span>
          </div>

          <p className="mt-2 text-xs leading-5 text-blue-600/80">
            Uploaded documents are private and available to authorized
            recruitment staff.
          </p>
        </div>
      </aside>
    </>
  );
};

export default DocumentsSidebar;
