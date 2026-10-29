import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  KeyRound,
  LoaderCircle,
  Search,
  ShieldAlert,
} from "lucide-react";
import type { Permission } from "../../types/role.types";
import { useRolePermissions } from "../../hooks/useRoles";

interface RolePermissionSelectorProps {
  selectedIds: string[];
  onChange: (permissionIds: string[]) => void;
  disabled?: boolean;
}

const CATEGORY_ORDER = [
  "Dashboard",
  "Applications",
  "Recruitment",
  "Compliance",
  "Staff",
  "Job Types",
  "Roles",
  "Settings",
  "Other",
];

const CATEGORY_LABELS: Record<string, string> = {
  DASHBOARD: "Dashboard",
  APPLICATION: "Applications",
  APPLICATIONS: "Applications",
  RECRUITMENT: "Recruitment",
  COMPLIANCE: "Compliance",
  STAFF: "Staff",
  JOB_TYPE: "Job Types",
  JOB_TYPES: "Job Types",
  ROLE: "Roles",
  ROLES: "Roles",
  SETTINGS: "Settings",
};

const ACTION_LABELS: Record<string, string> = {
  VIEW: "View",
  CREATE: "Create",
  UPDATE: "Update",
  DELETE: "Delete",
  SUBMIT: "Submit",
  COMMENT: "Comment",
  APPROVE: "Approve",
  UPLOAD: "Upload",
  DOWNLOAD: "Download",
  MANAGE: "Manage",
};

const getCategory = (permissionName: string): string => {
  const prefix = permissionName.split("_")[0];
  return CATEGORY_LABELS[prefix] ?? "Other";
};

const getPermissionLabel = (permission: Permission): string => {
  const parts = permission.name.split("_");
  const action = parts.pop() ?? permission.name;
  const resource = parts.join(" ");

  const actionLabel = ACTION_LABELS[action] ?? action.toLowerCase();
  const resourceLabel = resource
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return resourceLabel ? `${actionLabel} ${resourceLabel}` : actionLabel;
};

const getPermissionDescription = (permission: Permission): string =>
  permission.description?.trim() || permission.name.replaceAll("_", " ");

export default function RolePermissionSelector({
  selectedIds,
  onChange,
  disabled = false,
}: RolePermissionSelectorProps) {
  const {
    data: permissions = [],
    isLoading,
    isError,
    refetch,
  } = useRolePermissions();

  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();
    const grouped = new Map<string, Permission[]>();

    permissions.forEach((permission) => {
      const category = getCategory(permission.name);
      const searchableText = [
        permission.name,
        permission.description ?? "",
        getPermissionLabel(permission),
        category,
      ]
        .join(" ")
        .toLowerCase();

      if (query && !searchableText.includes(query)) return;

      const current = grouped.get(category) ?? [];
      current.push(permission);
      grouped.set(category, current);
    });

    return [...grouped.entries()]
      .sort(([categoryA], [categoryB]) => {
        const indexA = CATEGORY_ORDER.indexOf(categoryA);
        const indexB = CATEGORY_ORDER.indexOf(categoryB);

        return (
          (indexA === -1 ? CATEGORY_ORDER.length : indexA) -
          (indexB === -1 ? CATEGORY_ORDER.length : indexB)
        );
      })
      .map(([category, items]) => ({
        category,
        permissions: [...items].sort((a, b) => a.name.localeCompare(b.name)),
      }));
  }, [permissions, search]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const totalSelected = permissions.filter((permission) =>
    selectedSet.has(permission.id),
  ).length;

  const updateCategory = (
    categoryPermissions: Permission[],
    checked: boolean,
  ) => {
    const nextIds = new Set(selectedIds);

    categoryPermissions.forEach((permission) => {
      if (checked) {
        nextIds.add(permission.id);
      } else {
        nextIds.delete(permission.id);
      }
    });

    onChange([...nextIds]);
  };

  const updatePermission = (permissionId: string, checked: boolean) => {
    if (checked) {
      onChange([...new Set([...selectedIds, permissionId])]);
    } else {
      onChange(selectedIds.filter((id) => id !== permissionId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-10 text-sm text-slate-500">
        <LoaderCircle size={18} className="animate-spin text-blue-600" />
        Loading available permissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/70 p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert size={19} className="mt-0.5 text-red-600" />
          <div>
            <p className="text-sm font-medium text-slate-800">
              Unable to load permissions
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 text-xs font-semibold text-red-700 hover:underline"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (permissions.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
        <p className="text-sm font-medium text-slate-800">
          No permissions available
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Check that the backend permissions have been seeded and that your
          account is allowed to retrieve them.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/90 to-white/80 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <KeyRound size={17} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Role permissions
              </p>
              <p className="text-xs text-slate-500">
                Choose what this role can access.
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-blue-200 bg-white px-2.5 py-1 text-xs font-semibold tabular-nums text-blue-700">
            {totalSelected} / {permissions.length}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <label className="relative min-w-0 flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a permission..."
              aria-label="Search permissions"
              className="w-full rounded-xl border border-blue-100 bg-white/90 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <button
            type="button"
            disabled={disabled || totalSelected === permissions.length}
            onClick={() =>
              onChange(permissions.map((permission) => permission.id))
            }
            className="shrink-0 rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 disabled:opacity-40"
          >
            Select all
          </button>
        </div>

        {totalSelected > 0 && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange([])}
            className="mt-2 text-xs font-medium text-slate-500 hover:text-red-600 disabled:opacity-40"
          >
            Clear selection
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
          No permissions match “{search}”.
        </div>
      ) : (
        <div className="space-y-2">
          {groups.map(({ category, permissions: categoryPermissions }) => {
            const selectedCount = categoryPermissions.filter((permission) =>
              selectedSet.has(permission.id),
            ).length;

            const allSelected =
              categoryPermissions.length > 0 &&
              selectedCount === categoryPermissions.length;

            const isCollapsed = collapsed[category] ?? false;

            return (
              <section
                key={category}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80"
              >
                <div className="flex items-center gap-3 bg-slate-50/80 px-3 py-3 sm:px-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    disabled={disabled}
                    onChange={(event) =>
                      updateCategory(categoryPermissions, event.target.checked)
                    }
                    aria-label={`Select all ${category} permissions`}
                    className="size-4 shrink-0 cursor-pointer accent-blue-600 disabled:cursor-not-allowed"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setCollapsed((current) => ({
                        ...current,
                        [category]: !isCollapsed,
                      }))
                    }
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    aria-expanded={!isCollapsed}
                  >
                    <span className="truncate text-sm font-semibold text-slate-800">
                      {category}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-blue-700">
                      {selectedCount}/{categoryPermissions.length}
                    </span>
                  </button>

                  {isCollapsed ? (
                    <ChevronRight size={16} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400" />
                  )}
                </div>

                {!isCollapsed && (
                  <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:p-4">
                    {categoryPermissions.map((permission) => {
                      const checked = selectedSet.has(permission.id);

                      return (
                        <label
                          key={permission.id}
                          className={`flex min-w-0 cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition ${
                            checked
                              ? "border-blue-200 bg-blue-50/80"
                              : "border-slate-100 bg-white hover:border-blue-100 hover:bg-blue-50/30"
                          } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={(event) =>
                              updatePermission(
                                permission.id,
                                event.target.checked,
                              )
                            }
                            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-blue-600 disabled:cursor-not-allowed"
                          />

                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-xs font-semibold text-slate-800">
                              {getPermissionLabel(permission)}
                            </span>
                            <span className="mt-1 block break-words text-[11px] leading-4 text-slate-500">
                              {getPermissionDescription(permission)}
                            </span>
                            <span className="mt-1.5 block break-all font-mono text-[10px] text-slate-400">
                              {permission.name}
                            </span>
                          </span>

                          {checked && (
                            <Check
                              size={15}
                              className="shrink-0 text-blue-600"
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}
