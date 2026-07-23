import type { ComponentType } from "react";

import { FIELD_TYPES, type FieldType } from "../../constants/field-types";

import TextField from "../fields/TextField";
import SignatureField from "../fields/SignatureField";
import NumberField from "../fields/NumberField";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import PhoneField from "../fields/PhoneField";
import TextAreaField from "../fields/TextAreaField";
import SelectField from "../fields/SelectField";
import RadioField from "../fields/RadioField";
import CheckboxField from "../fields/CheckboxField";
import DateField from "../fields/DateField";
import UploadField from "../fields/UploadField";
import type { FieldComponentProps } from "../fields/BaseField";

type FieldComponent = ComponentType<FieldComponentProps>;

export const FIELD_REGISTRY: Record<FieldType, FieldComponent> = {
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.PASSWORD]: PasswordField,
  [FIELD_TYPES.EMAIL]: EmailField,
  [FIELD_TYPES.PHONE]: PhoneField,
  [FIELD_TYPES.NUMBER]: NumberField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.TEXTAREA]: TextAreaField,
  [FIELD_TYPES.SELECT]: SelectField,
  [FIELD_TYPES.MULTISELECT]: SelectField,
  [FIELD_TYPES.RADIO]: RadioField,
  [FIELD_TYPES.CHECKBOX]: CheckboxField,
  [FIELD_TYPES.SIGNATURE]: SignatureField,
  [FIELD_TYPES.UPLOAD]: UploadField,
};
