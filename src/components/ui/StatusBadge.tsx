import { cn } from "@/lib/utils";

type Variant = "pending" | "approved" | "rejected" | "draft" | "active";

interface Props {
  status: Variant;
}

const variants: Record<Variant, string> = {
  pending: "bg-amber-100 text-amber-700",

  approved: "bg-green-100 text-green-700",

  rejected: "bg-red-100 text-red-700",

  draft: "bg-slate-100 text-slate-700",

  active: "bg-blue-100 text-blue-700",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        variants[status],
      )}
    >
      {status}
    </span>
  );
}
