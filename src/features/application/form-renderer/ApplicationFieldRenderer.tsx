import type { ApplicationField } from "../types/field";

import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import CheckboxField from "./fields/CheckboxField";
import RadioField from "./fields/RadioField";
import DateField from "./fields/DateField";
import SignatureField from "./fields/SignatureField";
import UploadField from "./fields/UploadField";

interface Props {
  field: ApplicationField;
}

export default function ApplicationFieldRenderer({ field }: Props) {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "tel":
      return <TextField field={field} />;

    case "textarea":
      return <TextAreaField field={field} />;

    case "select":
      return <SelectField field={field} />;

    case "checkbox":
      return <CheckboxField field={field} />;

    case "radio":
      return <RadioField field={field} />;

    case "date":
      return <DateField field={field} />;

    case "file":
      return <UploadField field={field} />;

    case "signature":
      return <SignatureField field={field} />;

    default:
      return null;
  }
}
