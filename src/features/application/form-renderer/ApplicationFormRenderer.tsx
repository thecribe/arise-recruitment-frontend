/**
 * -----------------------------------------------------------------------------
 * File: ApplicationFormRenderer.tsx
 *
 * Description:
 * Renders all fields for the currently active application section.
 * -----------------------------------------------------------------------------
 */

import FormRenderer from "@/components/forms/FormRenderer";
import { useApplicationContext } from "../context/ApplicationContext";

// import FieldRenderer from "./FieldRenderer"
import RepeatableSectionRenderer from "./RepeatableSectionRenderer";

export default function ApplicationFormRenderer() {
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
  if (activeSection.repeatable) {
    return <RepeatableSectionRenderer section={activeSection} />;
  }

  return (
    <FormRenderer
      fields={activeSection.fields}
      // prefix={prefix}
      config={{
        mode: "edit",
        // mode: isEditing ? "edit" : "view",
        // canEdit: isEditing,
        readOnly: false,
      }}
    />
    // <div className="grid grid-cols-12 gap-6">

    //   {activeSection.fields.map((field) => (
    //     <FieldRenderer key={field.id} field={field} />
    //   ))}
    // </div>
  );
}
