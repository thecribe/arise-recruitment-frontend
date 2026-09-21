interface ComplianceCommentViewProps {
  comment?: string | null;
}

export default function ComplianceCommentView({
  comment,
}: ComplianceCommentViewProps) {
  if (!comment?.trim()) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-amber-900">
            Recruitment Manager Comment
          </h3>

          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-amber-800">
            {comment}
          </p>
        </div>
      </div>
    </section>
  );
}
