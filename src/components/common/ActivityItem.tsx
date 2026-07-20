import { Clock3 } from "lucide-react";

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

export default function ActivityItem({
  title,
  description,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-slate-100 p-4 transition-colors hover:bg-blue-50">
      <div className="space-y-1">
        <h4 className="font-medium text-slate-900">{title}</h4>

        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Clock3 className="h-4 w-4" />
        {time}
      </div>
    </div>
  );
}
