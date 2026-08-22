/**
 * -----------------------------------------------------------------------------
 * File: FieldRenderer.tsx
 *
 * Description:
 * Resolves and renders the correct field component for a generic FormField.
 *
 * Responsibilities:
 * - Resolve field component from field.type.
 * - Respect field visibility.
 * - Pass field and prefix to the resolved component.
 * - Fail safely for unsupported field types.
 *
 * Important:
 * This component must remain feature-agnostic.
 *
 * It must NOT depend on:
 * - ApplicationContext
 * - RecruitmentContext
 * - Applicant state
 * - Phase state
 * - Section state
 * -----------------------------------------------------------------------------
 */

import type { ComponentType } from "react";

import type { FormField } from "./types/field";

import type { FieldComponentProps } from "./fields/BaseField";

import TextField from "./fields/TextField";
import PasswordField from "./fields/PasswordField";
import EmailField from "./fields/EmailField";
import PhoneField from "./fields/PhoneField";
import NumberField from "./fields/NumberField";
import DateField from "./fields/DateField";
import TimeField from "./fields/TimeField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import MultiSelectField from "./fields/MultiSelectField";
import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import SignatureField from "./fields/SignatureField";
import UploadField from "./fields/UploadField";
import { useFieldVisibility } from "./hooks/useFieldVisibility";
import SwitchField from "./fields/SwitchField";

/**
 * -----------------------------------------------------------------------------
 * Field component registry
 * -----------------------------------------------------------------------------
 *
 * The keys MUST correspond to FieldType values.
 *
 * Keeping this registry in one place prevents large switch statements and
 * makes adding a new field type straightforward.
 * -----------------------------------------------------------------------------
 */

const FIELD_COMPONENTS = {
  text: TextField,
  password: PasswordField,
  email: EmailField,
  tel: PhoneField,
  number: NumberField,
  date: DateField,
  time: TimeField,
  textarea: TextAreaField,
  switch: SwitchField,
  select: SelectField,
  multiselect: MultiSelectField,
  radio: RadioField,
  checkbox: CheckboxField,
  signature: SignatureField,
  file: UploadField,
} satisfies Record<FormField["type"], ComponentType<FieldComponentProps>>;

/**
 * -----------------------------------------------------------------------------
 * Unsupported field fallback
 * -----------------------------------------------------------------------------
 */

function UnsupportedField({ field }: FieldComponentProps) {
  if (import.meta.env.DEV) {
    console.warn(
      `Unsupported form field type "${field.type}" for field "${field.id}".`,
    );
  }

  return (
    <div
      className="
        col-span-12
        rounded-xl
        border
        border-amber-200
        bg-amber-50
        px-4
        py-3
        text-sm
        text-amber-700
      "
    >
      This form field is not currently supported.
    </div>
  );
}

/**
 * -----------------------------------------------------------------------------
 * Field renderer
 * -----------------------------------------------------------------------------
 */

interface FieldRendererProps {
  field: FormField;

  /**
   * Optional prefix used for repeatable/nested fields.
   *
   * Example:
   *
   * employmentHistory.0
   */
  prefix?: string;
}

export default function FieldRenderer({ field, prefix }: FieldRendererProps) {
  /**
   * ---------------------------------------------------------------------------
   * Visibility
   *
   * Visibility is evaluated against the current form values.
   *
   * This hook is generic and does not know anything about the feature using
   * the renderer.
   * ---------------------------------------------------------------------------
   */

  const isVisible = useFieldVisibility(field.visibleWhen);

  if (!isVisible) {
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   * Resolve component.
   * ---------------------------------------------------------------------------
   */

  const FieldComponent = FIELD_COMPONENTS[field.type];

  /**
   * ---------------------------------------------------------------------------
   * Defensive fallback.
   *
   * TypeScript normally guarantees that the registry contains every
   * FieldType, but this keeps the renderer safe if the definition changes.
   * ---------------------------------------------------------------------------
   */

  if (!FieldComponent) {
    return <UnsupportedField field={field} prefix={prefix} />;
  }

  return <FieldComponent field={field} prefix={prefix} />;
}
