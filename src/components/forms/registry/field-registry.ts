/**
 * -----------------------------------------------------------------------------
 * File: field-registry.ts
 *
 * Description:
 * Central registry for all generic form field components.
 *
 * Every FieldType must have a corresponding renderer.
 * -----------------------------------------------------------------------------
 */

import type { ComponentType } from "react";

import type { FieldComponentProps } from "../fields/BaseField";

import TextField from "../fields/TextField";
import PasswordField from "../fields/PasswordField";
import EmailField from "../fields/EmailField";
import PhoneField from "../fields/PhoneField";
import NumberField from "../fields/NumberField";
import DateField from "../fields/DateField";
import TimeField from "../fields/TimeField";
import TextAreaField from "../fields/TextAreaField";
import SelectField from "../fields/SelectField";
import RadioField from "../fields/RadioField";
import CheckboxField from "../fields/CheckboxField";
import SignatureField from "../fields/SignatureField";
import UploadField from "../fields/UploadField";
import { FIELD_TYPES, type FieldType } from "../types/field";
import MultiSelectField from "../fields/MultiSelectField";
import SwitchField from "../fields/SwitchField";

type FieldComponent = ComponentType<FieldComponentProps>;

/**
 * -----------------------------------------------------------------------------
 * Field registry
 *
 * IMPORTANT:
 * Record<FieldType, FieldComponent> intentionally forces TypeScript to ensure
 * every supported field type has a renderer.
 * -----------------------------------------------------------------------------
 */

export const FIELD_REGISTRY: Record<FieldType, FieldComponent> = {
  [FIELD_TYPES.TEXT]: TextField,

  [FIELD_TYPES.PASSWORD]: PasswordField,

  [FIELD_TYPES.EMAIL]: EmailField,

  [FIELD_TYPES.PHONE]: PhoneField,

  [FIELD_TYPES.NUMBER]: NumberField,

  [FIELD_TYPES.DATE]: DateField,

  [FIELD_TYPES.TIME]: TimeField,

  [FIELD_TYPES.TEXTAREA]: TextAreaField,

  [FIELD_TYPES.SELECT]: SelectField,
  [FIELD_TYPES.SWITCH]: SwitchField,

  [FIELD_TYPES.MULTISELECT]: MultiSelectField,

  [FIELD_TYPES.RADIO]: RadioField,

  [FIELD_TYPES.CHECKBOX]: CheckboxField,

  [FIELD_TYPES.SIGNATURE]: SignatureField,

  [FIELD_TYPES.UPLOAD]: UploadField,
};
