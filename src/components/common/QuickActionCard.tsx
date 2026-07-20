/**
 * -----------------------------------------------------------------------------
 * File: QuickActionCard.tsx
 * Description:
 * Reusable quick action card.
 * -----------------------------------------------------------------------------
 */

import { ChevronRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  className,
}: QuickActionCardProps) {
  return (
    <GlassCard
      hover
      onClick={onClick}
      className={cn(
        "clickable flex items-center justify-between p-5",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>

          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="cursor-pointer rounded-xl">
        <ChevronRight className="h-5 w-5" />
      </Button>
    </GlassCard>
  );
}
