import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface RoleSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  showSystemRoles: boolean;
  onToggleSystemRoles: () => void;
  resultCount: number;
  totalCount: number;
}

export default function RoleSearchBar({
  search,
  onSearchChange,
  showSystemRoles,
  onToggleSystemRoles,
  resultCount,
  totalCount,
}: RoleSearchBarProps) {
  return (
    <>
      <div className="flex flex-col gap-3 border-b border-blue-100/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="font-semibold text-slate-900">Available roles</h2>
          <p className="mt-1 text-xs text-slate-500">
            System roles are protected. Custom roles can be managed here.
          </p>
        </div>
        <label className="relative block w-full sm:max-w-xs">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search roles..."
            aria-label="Search roles"
            className="w-full rounded-xl border border-blue-200/70 bg-white/70 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">{resultCount}</span> of{" "}
          <span className="font-semibold text-slate-700">{totalCount}</span> roles
        </p>
        <button
          type="button"
          onClick={onToggleSystemRoles}
          className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 hover:text-blue-900"
        >
          {showSystemRoles ? "Hide system roles" : "Show system roles"}
          {showSystemRoles ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>
    </>
  );
}
