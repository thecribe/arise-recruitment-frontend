import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  //   ChevronDown,
  //   CircleAlert,
  Ellipsis,
  Pencil,
  Search,
  ShieldCheck,
  Star,
  Trash2,
} from "lucide-react";
import type { JobType } from "../../types/job-type.types";

interface JobTypeTableProps {
  jobTypes: JobType[];
  isLoading?: boolean;
  busyJobTypeId?: string | null;
  onEdit: (jobType: JobType) => void;
  onSetDefault: (jobType: JobType) => void;
  onDelete: (jobType: JobType) => void;
}

export default function JobTypeTable({
  jobTypes,
  isLoading = false,
  busyJobTypeId = null,
  onEdit,
  onSetDefault,
  onDelete,
}: JobTypeTableProps) {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredJobTypes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return jobTypes;

    return jobTypes.filter((jobType) =>
      jobType.name.toLowerCase().includes(query),
    );
  }, [jobTypes, search]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Job types
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {jobTypes.length} {jobTypes.length === 1 ? "job type" : "job types"}{" "}
            configured
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search job types..."
            aria-label="Search job types"
            className="w-full rounded-xl border border-slate-200 bg-white/80 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white"
          />
        </div>
      </div>

      {filteredJobTypes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/40 px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-900/30">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
            {search ? <Search size={20} /> : <BriefcaseBusiness size={20} />}
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-white">
            {search ? "No matching job types" : "No job types yet"}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {search
              ? "Try a different search term."
              : "Create a job type to get started."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-visible rounded-xl border border-slate-200/80 md:block dark:border-slate-700/70">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Job type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-700/70">
                {filteredJobTypes.map((jobType) => {
                  const busy = busyJobTypeId === jobType.id;

                  return (
                    <tr
                      key={jobType.id}
                      className="bg-white/50 transition hover:bg-blue-50/40 dark:bg-slate-900/30 dark:hover:bg-blue-950/20"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                            <BriefcaseBusiness size={17} />
                          </div>
                          <span className="truncate font-medium text-slate-800 dark:text-slate-100">
                            {jobType.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        {jobType.is_default ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/50 dark:text-blue-300">
                            <ShieldCheck size={13} />
                            Default
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {!jobType.is_default && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => onSetDefault(jobType)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-2.5 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50 disabled:opacity-50 dark:border-blue-900/70 dark:text-blue-300 dark:hover:bg-blue-950/40"
                            >
                              <Star size={14} />
                              Set default
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => onEdit(jobType)}
                            aria-label={`Edit ${jobType.name}`}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-700 disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            disabled={busy || jobType.is_default}
                            onClick={() => onDelete(jobType)}
                            aria-label={`Delete ${jobType.name}`}
                            title={
                              jobType.is_default
                                ? "The default job type cannot be deleted"
                                : "Delete job type"
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-red-950/30 dark:hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredJobTypes.map((jobType) => {
              const busy = busyJobTypeId === jobType.id;
              const menuOpen = openMenuId === jobType.id;

              return (
                <article
                  key={jobType.id}
                  className="rounded-xl border border-slate-200/80 bg-white/60 p-3.5 shadow-sm backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      <BriefcaseBusiness size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold text-slate-900 dark:text-white">
                        {jobType.name}
                      </p>

                      <div className="mt-2">
                        {jobType.is_default ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/50 dark:text-blue-300">
                            <Check size={12} />
                            Default
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            Active
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        disabled={busy}
                        aria-label={`Actions for ${jobType.name}`}
                        aria-expanded={menuOpen}
                        onClick={() =>
                          setOpenMenuId(menuOpen ? null : jobType.id)
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
                      >
                        <Ellipsis size={19} />
                      </button>

                      {menuOpen && (
                        <>
                          <button
                            type="button"
                            aria-label="Close actions menu"
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setOpenMenuId(null)}
                          />

                          <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                            {!jobType.is_default && (
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onSetDefault(jobType);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-blue-950/50"
                              >
                                <Star size={15} />
                                Set as default
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null);
                                onEdit(jobType);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                              <Pencil size={15} />
                              Edit
                            </button>

                            {!jobType.is_default && (
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onDelete(jobType);
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                              >
                                <Trash2 size={15} />
                                Delete
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
