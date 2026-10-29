import { KeyRound, ShieldCheck, Users } from "lucide-react";
import type { Role } from "../../types/role.types";

interface RoleStatsProps {
  roles: Role[];
}

export default function RoleStats({ roles }: RoleStatsProps) {
  const systemRoleCount = roles.filter((role) => role.is_system).length;
  const customRoleCount = roles.filter((role) => !role.is_system).length;
  const assignedUserCount = roles.reduce(
    (total, role) => total + (role.user_count ?? 0),
    0,
  );

  const stats = [
    {
      label: "Total roles",
      value: roles.length,
      note: `${systemRoleCount} system · ${customRoleCount} custom`,
      icon: ShieldCheck,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      label: "Custom roles",
      value: customRoleCount,
      note: "Roles you can configure",
      icon: KeyRound,
      iconClass: "bg-sky-50 text-sky-700",
    },
    {
      label: "Assigned users",
      value: assignedUserCount,
      note: "Across all roles",
      icon: Users,
      iconClass: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, note, icon: Icon, iconClass }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{label}</p>
            <span className={`rounded-xl p-2 ${iconClass}`}>
              <Icon size={18} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{note}</p>
        </div>
      ))}
    </section>
  );
}
