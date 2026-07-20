/**
 * -----------------------------------------------------------------------------
 * File: PageHeader.tsx
 * Description:
 * Shared page heading component.
 * -----------------------------------------------------------------------------
 */

/**
 * -----------------------------------------------------------------------------
 * File: PageHeader.tsx
 * Description:
 * Shared page heading component.
 * -----------------------------------------------------------------------------
 */
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {description && <p className="mt-2 text-slate-500">{description}</p>}
      </div>

      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
