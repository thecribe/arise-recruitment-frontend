import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface DashboardSectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
}

const DashboardSection = ({
  title,
  description,
  className,
  children,
}: DashboardSectionProps) => {
  return (
    <section className={cn("space-y-5", className)}>
      {(title || description) && (
        <div>
          {title && <h2 className="text-lg font-semibold">{title}</h2>}

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {children}
    </section>
  );
};

export default DashboardSection;
