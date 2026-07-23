import type { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const DashboardHeader = ({
  title,
  description,
  action,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>

      {action}
    </div>
  );
};

export default DashboardHeader;
