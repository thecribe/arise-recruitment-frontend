/**
 * -----------------------------------------------------------------------------
 * File: FormRenderer.tsx
 *
 * Description:
 * Renders all fields for the currently active application section.
 * -----------------------------------------------------------------------------
 */

import { useApplicationContext } from "../context/ApplicationContext";

import FieldRenderer from "./FieldRenderer";

export default function FormRenderer() {
  const { activeSection } = useApplicationContext();

  if (!activeSection.fields.length) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-white/10
          p-10
          text-center
        "
      >
        <p className="text-slate-500">
          This section doesn't contain any fields yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {activeSection.fields.map((field) => (
        <FieldRenderer key={field.id} field={field} />
      ))}
    </div>
  );
}
