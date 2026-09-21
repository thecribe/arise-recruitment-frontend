import { Plus, RefreshCw, Send } from "lucide-react";
import { useState } from "react";
import {
  useApplicantReferences,
  useDeleteApplicantReference,
  useSubmitApplicantReferences,
} from "../../hooks/useApplicantReferences";
import type { ApplicantReference } from "@/features/recruitment/types/reference.types";
import ApplicantReferenceCard from "./ApplicantReferenceCard";
import ApplicantReferenceForm from "./ApplicantReferenceForm";
import ConfirmationModal from "./ConfirmDeleteModal";

export default function ReferencesTab() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReference, setEditingReference] =
    useState<ApplicantReference | null>(null);

  const [referenceToDelete, setReferenceToDelete] =
    useState<ApplicantReference | null>(null);

  const referencesQuery = useApplicantReferences();
  const deleteMutation = useDeleteApplicantReference();
  const submitMutation = useSubmitApplicantReferences();

  const references = referencesQuery.data ?? [];

  const hasSubmittableReferences = references.some(
    (reference) =>
      reference.status === "in_progress" || reference.status === "rejected",
  );

  const handleAddReference = () => {
    setEditingReference(null);
    setIsFormOpen(true);
  };

  const handleEditReference = (reference: ApplicantReference) => {
    setEditingReference(reference);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingReference(null);
    setIsFormOpen(false);
  };

  const handleDelete = (reference: ApplicantReference) => {
    setReferenceToDelete(reference);
  };

  const handleConfirmDelete = () => {
    if (!referenceToDelete) return;

    deleteMutation.mutate(referenceToDelete.id, {
      onSuccess: () => {
        setReferenceToDelete(null);
      },
    });
  };

  const handleCancelDelete = () => {
    if (deleteMutation.isPending) return;

    setReferenceToDelete(null);
  };

  const handleSubmitReferences = () => {
    submitMutation.mutate();
  };

  if (referencesQuery.isLoading) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/70 p-8 text-center shadow-lg backdrop-blur-xl">
        <p className="text-sm text-slate-500">Loading references...</p>
      </div>
    );
  }

  if (referencesQuery.isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50/80 p-6 text-center">
        <p className="text-sm text-red-700">Unable to load your references.</p>

        <button
          type="button"
          onClick={() => void referencesQuery.refetch()}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/20 bg-white/70 p-5 shadow-lg backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">References</h2>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Add your employment references. You can continue adding references
              until you submit them.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddReference}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add reference
          </button>
        </div>
      </div>

      {isFormOpen && (
        <ApplicantReferenceForm
          reference={editingReference}
          onClose={handleCloseForm}
        />
      )}

      {references.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50/50 p-8 text-center">
          <h3 className="font-semibold text-slate-800">No references added</h3>

          <p className="mt-1 text-sm text-slate-500">
            Add your first employment reference to get started.
          </p>

          <button
            type="button"
            onClick={handleAddReference}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add your first reference
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {references.map((reference) => (
            <ApplicantReferenceCard
              key={reference.id}
              reference={reference}
              onEdit={handleEditReference}
              onDelete={handleDelete}
              isDeleting={
                deleteMutation.isPending &&
                deleteMutation.variables === reference.id
              }
            />
          ))}
        </div>
      )}

      {references.length > 0 && (
        <div className="rounded-3xl border border-blue-200/70 bg-blue-50/60 p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Submit references
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Only references that are in progress or rejected will be
                submitted. Submitted and approved references remain unchanged.
              </p>
            </div>

            <button
              type="button"
              disabled={!hasSubmittableReferences || submitMutation.isPending}
              onClick={handleSubmitReferences}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {submitMutation.isPending ? "Submitting..." : "Submit references"}
            </button>
          </div>
        </div>
      )}
      <ConfirmationModal
        open={Boolean(referenceToDelete)}
        title="Delete reference?"
        description={
          referenceToDelete
            ? `Are you sure you want to delete the reference for ${referenceToDelete.refereeName || "this referee"}? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete reference"
        cancelLabel="Keep reference"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
