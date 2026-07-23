import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface DashboardCardProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const DashboardCard = ({
  children,
  className,
  onClick,
}: DashboardCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-white/20",
        "bg-white/60 dark:bg-slate-900/60",
        "backdrop-blur-xl",
        "shadow-sm",
        "transition-all duration-300",
        onClick && [
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:shadow-xl",
          "active:scale-[0.99]",
        ],
        "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DashboardCard;
