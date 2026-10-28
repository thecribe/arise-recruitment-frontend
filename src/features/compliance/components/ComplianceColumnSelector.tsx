import { useState } from "react";
import { Check, ChevronDown, RotateCcw, Settings2 } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

import {
  APPLICANT_COLUMN,
  COMPLIANCE_COLUMN_GROUPS,
  DEFAULT_VISIBLE_COLUMNS,
  SINGLE_COMPLIANCE_COLUMNS,
  type ComplianceColumn,
} from "../constants/compliance-columns";

interface TrainingColumn {
  id: string;
  label: string;
}

interface ComplianceColumnSelectorProps {
  visibleColumns: string[];
  trainingColumns: TrainingColumn[];
  onChange: (columns: string[]) => void;
}

export default function ComplianceColumnSelector({
  visibleColumns,
  trainingColumns,
  onChange,
}: ComplianceColumnSelectorProps) {
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const allColumns: ComplianceColumn[] = [
    ...COMPLIANCE_COLUMN_GROUPS.flatMap((group) => group.columns),
    ...trainingColumns.map((column) => ({
      id: column.id,
      label: column.label,
      group: "training",
      defaultVisible: false,
    })),
  ];

  const isVisible = (id: string) => visibleColumns.includes(id);

  const toggleColumn = (id: string) => {
    onChange(
      isVisible(id)
        ? visibleColumns.filter((column) => column !== id)
        : [...visibleColumns, id],
    );
  };

  const toggleGroup = (ids: string[]) => {
    const allSelected = ids.every(isVisible);

    onChange(
      allSelected
        ? visibleColumns.filter((column) => !ids.includes(column))
        : [...new Set([...visibleColumns, ...ids])],
    );
  };

  const toggleExpanded = (groupId: string) => {
    setExpandedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  };

  const groups = [
    ...COMPLIANCE_COLUMN_GROUPS.map((group) => ({
      id: group.id,
      label: group.label,
      columns: group.columns,
    })),
    {
      id: "training",
      label: "Mandatory Training",
      columns: allColumns.filter((column) => column.group === "training"),
    },
  ];

  const reset = () => {
    onChange([...DEFAULT_VISIBLE_COLUMNS]);
  };

  const selectedCount = visibleColumns.length + 1; // Include the locked Applicant column.

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen((value) => !value)}
        className="border-blue-200 bg-white/70 text-slate-700 hover:bg-blue-50"
      >
        <Settings2 className="mr-2 h-4 w-4 text-blue-600" />
        Columns
        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
          {selectedCount}
        </span>
      </Button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close column selector"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpen(false)}
          />

          <GlassCard className="absolute right-0 z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden border border-blue-100/80 p-0 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Visible columns
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Choose the details to display.
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={reset}
                className="text-blue-700"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Reset
              </Button>
            </div>

            <div className="max-h-[min(65vh,28rem)] space-y-1 overflow-y-auto p-2">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded border border-blue-200 bg-blue-50">
                  <Check className="h-3 w-3 text-blue-700" />
                </span>
                <span className="flex-1 text-sm font-medium text-slate-700">
                  {APPLICANT_COLUMN.label}
                </span>
                <span className="text-xs text-slate-400">Always shown</span>
              </div>

              {SINGLE_COMPLIANCE_COLUMNS.map((column) => (
                <label
                  key={column.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50/70"
                >
                  <input
                    type="checkbox"
                    checked={isVisible(column.id)}
                    onChange={() => toggleColumn(column.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />
                  <span className="text-sm text-slate-700">{column.label}</span>
                </label>
              ))}

              <div className="my-2 border-t border-slate-200/70" />

              {groups.map((group, index: number) => {
                const ids = group.columns.map((column) => column.id);
                const selected = ids.filter(isVisible).length;
                const allSelected = ids.length > 0 && selected === ids.length;

                return (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <div className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-blue-50/70">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(element) => {
                          if (element) {
                            element.indeterminate =
                              selected > 0 && selected < ids.length;
                          }
                        }}
                        disabled={ids.length === 0}
                        onChange={() => toggleGroup(ids)}
                        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                        aria-label={`Toggle all ${group.label} columns`}
                      />

                      <button
                        type="button"
                        onClick={() => toggleExpanded(group.id)}
                        className="flex min-w-0 flex-1 items-center justify-between gap-2 py-2 text-left"
                      >
                        <span className="truncate text-sm font-medium text-slate-700">
                          {group.label}
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="text-xs text-slate-400">
                            {selected}/{ids.length}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-slate-400 transition-transform ${
                              expandedGroups.includes(group.id)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </span>
                      </button>
                    </div>

                    {expandedGroups.includes(group.id) && (
                      <div className="ml-4 border-l border-blue-100 pl-3">
                        {group.columns.length === 0 ? (
                          <p className="px-2 py-3 text-xs text-slate-500">
                            No training requirements available.
                          </p>
                        ) : (
                          group.columns.map((column) => (
                            <label
                              key={column.id}
                              className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-blue-50/70"
                            >
                              <input
                                type="checkbox"
                                checked={isVisible(column.id)}
                                onChange={() => toggleColumn(column.id)}
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
                              />
                              <span className="text-sm text-slate-600">
                                {column.label}
                              </span>
                            </label>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-200/70 px-4 py-3">
              <p className="text-xs text-slate-500">
                {selectedCount} columns selected, including Applicant.
              </p>
              <Button
                type="button"
                size="sm"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}
