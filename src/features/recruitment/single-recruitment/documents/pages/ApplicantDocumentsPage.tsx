import { useState } from "react";

import DocumentsSidebar, {
  type DocumentView,
} from "../components/DocumentsSidebar";

import DocumentsWorkspace from "../components/DocumentsWorkspace";

const ApplicantDocumentsPage = ({
  applicationId,
}: {
  applicationId: string;
}) => {
  const [activeView, setActiveView] =
    useState<DocumentView>("application-form");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50/80 via-slate-50 to-blue-100/50">
      <div className="flex min-h-[calc(100vh-4rem)]  overflow-hidden lg:rounded-3xl lg:border lg:border-white/70 lg:bg-white/20 lg:shadow-2xl lg:shadow-blue-950/[0.04]">
        <DocumentsSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <DocumentsWorkspace
          activeView={activeView}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          applicationId={applicationId}
        />
      </div>
    </div>
  );
};

export default ApplicantDocumentsPage;
