/**
 * -----------------------------------------------------------------------------
 * File: ManagerReferencesSection.tsx
 *
 * Description:
 * Manager workspace for applicant references.
 *
 * Responsibilities:
 * - Fetch manager references.
 * - Render the references table.
 * - Handle reference actions.
 * - Open the appropriate manager modal.
 *
 * Important:
 * References are a separate workflow and do not use ComplianceSectionProvider.
 * -----------------------------------------------------------------------------
 */

import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import ReferenceEditModal from "./components/manager/ReferenceEditModal";
import ReferenceResponseModal from "./components/manager/ReferenceResponseModal";
import ManagerReferenceResponseModal from "./components/manager/ManagerReferenceResponseModal";
import ReferenceReviewModal from "./components/manager/ReferenceReviewModal";

import type {
  ManagerReference,
  ManagerReferenceAction,
} from "@/features/recruitment/types/reference.types";
import { ManagerReferenceTable } from "./components/manager/ManagerReferenceTable";
import { ReferenceViewModal } from "./components/manager/ReferenceViewModal";
import { useManagerReferences } from "../../hooks/reference.hooks";
import SendReferenceModal from "./components/manager/SendReferenceModal";
import ReferenceCreateModal from "./components/manager/ReferenceCreateModal";

interface ManagerReferencesSectionProps {
  applicationId: string;
}

export default function ManagerReferencesSection({
  applicationId,
}: ManagerReferencesSectionProps) {
  const { data, isLoading, isError, refetch } =
    useManagerReferences(applicationId);

  const [selectedReference, setSelectedReference] =
    useState<ManagerReference | null>(null);

  const [selectedAction, setSelectedAction] =
    useState<ManagerReferenceAction | null>(null);

  const handleAction = (
    action: ManagerReferenceAction,
    reference: ManagerReference,
  ) => {
    setSelectedReference(reference);
    setSelectedAction(action);
  };

  const handleCreate = () => {
    setSelectedReference(null);
    setSelectedAction("create");
  };

  const closeModal = () => {
    setSelectedReference(null);
    setSelectedAction(null);
  };

  /**
   * ---------------------------------------------------------------------------
   * Loading
   * ---------------------------------------------------------------------------
   */
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200/30 border-t-blue-400" />
        </div>
      </div>
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Error
   * ---------------------------------------------------------------------------
   */
  if (isError) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-6 backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-red-200">Unable to load references.</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
        {/* ---------------------------------------------------------------------
         * Header
         * --------------------------------------------------------------------- */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-blue-100 transition hover:bg-white/10 sm:w-auto"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Reference
          </button>
        </div>

        {/* ---------------------------------------------------------------------
         * Table
         * --------------------------------------------------------------------- */}
        <div className="p-5">
          <ManagerReferenceTable
            references={data || []}
            onAction={handleAction}
          />
        </div>
      </section>

      {/* -----------------------------------------------------------------------
       * Create Reference
       * ----------------------------------------------------------------------- */}
      {selectedAction === "create" && (
        <ReferenceCreateModal
          applicationId={applicationId}
          open
          onClose={closeModal}
        />
      )}
      {/* -----------------------------------------------------------------------
       * View Reference
       * ----------------------------------------------------------------------- */}
      {selectedReference && selectedAction === "view" && (
        <ReferenceViewModal
          // applicationId={applicationId}
          reference={selectedReference}
          open
          onClose={closeModal}
        />
      )}

      {/* -----------------------------------------------------------------------
       * Edit Reference
       * ----------------------------------------------------------------------- */}
      {selectedReference && selectedAction === "edit" && (
        <ReferenceEditModal
          applicationId={applicationId}
          reference={selectedReference}
          open
          onClose={closeModal}
        />
      )}

      {/* -----------------------------------------------------------------------
       * View Response
       * ----------------------------------------------------------------------- */}
      {selectedReference && selectedAction === "view_response" && (
        <ReferenceResponseModal
          applicationId={applicationId}
          reference={selectedReference}
          open
          onClose={closeModal}
        />
      )}

      {/* -----------------------------------------------------------------------
       * Fill Reference
       * ----------------------------------------------------------------------- */}
      {selectedReference && selectedAction === "fill_response" && (
        <ManagerReferenceResponseModal
          applicationId={applicationId}
          reference={selectedReference}
          open
          onClose={closeModal}
        />
      )}

      {/* -----------------------------------------------------------------------
       * Review Reference
       * ----------------------------------------------------------------------- */}
      {selectedReference && selectedAction === "review" && (
        <ReferenceReviewModal
          applicationId={applicationId}
          reference={selectedReference}
          open
          onClose={closeModal}
        />
      )}

      {/* -----------------------------------------------------------------------
       * Send Reference
       *
       * Sending is intentionally left as a placeholder because the current
       * manager hooks do not contain a send-reference mutation.
       * ----------------------------------------------------------------------- */}
      {selectedReference && selectedAction === "send" && (
        <SendReferenceModal
          applicationId={applicationId}
          reference={selectedReference}
          open
          onClose={closeModal}
        />
      )}
    </>
  );
}
