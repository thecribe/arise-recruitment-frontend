import { useMemo, useState } from "react";

import { Pencil, Save, Trash2, X } from "lucide-react";

import DOMPurify from "dompurify";

import { RichTextEditor } from "@/components/ui/rich-text-editor";

import {
  useCreateInterviewNote,
  useDeleteInterviewNote,
  useInterviewNotes,
  useUpdateInterviewNote,
} from "../hooks/useInterview";
import ConfirmationModal from "@/features/compliance/applicant/components/reference/ConfirmDeleteModal";

interface InterviewNotesProps {
  interviewId: string;
}

/**
 * Checks whether the rich-text HTML contains meaningful text.
 */
function hasRichTextContent(html: string): boolean {
  const sanitized = DOMPurify.sanitize(html);

  const container = document.createElement("div");
  container.innerHTML = sanitized;

  return Boolean(container.textContent?.trim());
}

export default function InterviewNotes({ interviewId }: InterviewNotesProps) {
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const [pendingDeleteNoteId, setPendingDeleteNoteId] = useState<string | null>(
    null,
  );

  const { data: notes = [], isLoading } = useInterviewNotes(interviewId);

  const createNoteMutation = useCreateInterviewNote();

  const updateNoteMutation = useUpdateInterviewNote(interviewId);

  const deleteNoteMutation = useDeleteInterviewNote(interviewId);

  const isSaving = createNoteMutation.isPending || updateNoteMutation.isPending;

  const isDeleting = deleteNoteMutation.isPending;

  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content),
    [content],
  );

  const canSubmit = hasRichTextContent(sanitizedContent);

  /**
   * Reset editor state.
   */
  const resetEditor = () => {
    setContent("");
    setEditingNoteId(null);
  };

  /**
   * Create or update an interview note.
   */
  const handleSubmit = async () => {
    if (!canSubmit || isSaving) return;

    const safeContent = DOMPurify.sanitize(content);

    try {
      if (editingNoteId) {
        await updateNoteMutation.mutateAsync({
          noteId: editingNoteId,
          content: safeContent,
        });
      } else {
        await createNoteMutation.mutateAsync({
          interviewId,
          content: safeContent,
        });
      }

      resetEditor();
    } catch {
      // Global mutation/error handling handles the error.
    }
  };

  /**
   * Load a note into the editor.
   */
  const handleEdit = (note: { id: string; content: string }) => {
    setEditingNoteId(note.id);
    setContent(note.content);
  };

  /**
   * Open the delete confirmation modal.
   */
  const handleDeleteRequest = (noteId: string) => {
    if (isDeleting || isSaving) return;

    setPendingDeleteNoteId(noteId);
  };

  /**
   * Confirm note deletion.
   */
  const handleDeleteConfirm = async () => {
    if (!pendingDeleteNoteId || isDeleting) return;

    try {
      await deleteNoteMutation.mutateAsync({
        noteId: pendingDeleteNoteId,
      });

      if (editingNoteId === pendingDeleteNoteId) {
        resetEditor();
      }

      setPendingDeleteNoteId(null);
    } catch {
      // Global mutation/error handling handles the error.
    }
  };

  /**
   * Cancel note deletion.
   */
  const handleDeleteCancel = () => {
    if (isDeleting) return;

    setPendingDeleteNoteId(null);
  };

  return (
    <>
      <section className="space-y-6">
        {/* Note Editor */}
        <div className="rounded-2xl border border-white/20 bg-white/75 p-5 shadow-xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {editingNoteId ? "Edit Interview Note" : "Add Interview Note"}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Add observations and feedback about the applicant.
              </p>
            </div>

            {editingNoteId && (
              <button
                type="button"
                onClick={resetEditor}
                disabled={isSaving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Cancel editing"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your interview observations..."
            minHeight="180px"
            disabled={isSaving}
          />

          <div className="mt-4 flex flex-wrap justify-end gap-3">
            {editingNoteId && (
              <button
                type="button"
                onClick={resetEditor}
                disabled={isSaving}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              disabled={!canSubmit || isSaving}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />

              {isSaving
                ? "Saving..."
                : editingNoteId
                  ? "Update Note"
                  : "Save Note"}
            </button>
          </div>
        </div>

        {/* Existing Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Previous Notes
          </h3>

          {isLoading && (
            <p className="text-sm text-slate-400">Loading notes...</p>
          )}

          {!isLoading && notes.length === 0 && (
            <p className="text-sm text-slate-400">
              No interview notes have been added.
            </p>
          )}

          {notes.map((note) => (
            <article
              key={note.id}
              className="rounded-2xl border border-white/20 bg-white/75 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <time
                  dateTime={note.createdAt}
                  className="text-xs text-slate-400"
                >
                  {new Date(note.createdAt).toLocaleString()}
                </time>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(note)}
                    disabled={isSaving || isDeleting}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Edit note"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteRequest(note.id)}
                    disabled={isDeleting || isSaving}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Delete note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div
                className="interview-note-content text-sm text-slate-900"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(note.content),
                }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={Boolean(pendingDeleteNoteId)}
        title="Delete Interview Note?"
        description="Are you sure you want to delete this interview note? This action cannot be undone."
        confirmLabel="Delete Note"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
