/**
 * -----------------------------------------------------------------------------
 * File: Section.tsx
 * Description:
 * Shared content section wrapper.
 * -----------------------------------------------------------------------------
 */

/**
 * -----------------------------------------------------------------------------
 * File: Section.tsx
 * Description:
 * Shared content section wrapper.
 * -----------------------------------------------------------------------------
 */
import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Section({
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
