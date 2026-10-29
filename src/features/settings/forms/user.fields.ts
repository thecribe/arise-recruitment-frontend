import {
  FIELD_TYPES,
  FIELD_WIDTH,
  type FormField,
} from "@/components/forms/types/field";

import type { AssignableRole } from "../types/user.types";

export const getUserFields = (
  roles: AssignableRole[],
  isEditing = false,
): FormField[] => {
  const fields: FormField[] = [
    {
      id: "first_name",
      name: "first_name",
      type: FIELD_TYPES.TEXT,
      label: "First name",
      placeholder: "Enter first name",
      required: true,
      width: FIELD_WIDTH.HALF,
      order: 1,
    },
    {
      id: "last_name",
      name: "last_name",
      type: FIELD_TYPES.TEXT,
      label: "Last name",
      placeholder: "Enter last name",
      required: true,
      width: FIELD_WIDTH.HALF,
      order: 2,
    },
    {
      id: "email",
      name: "email",
      type: FIELD_TYPES.EMAIL,
      label: "Email address",
      placeholder: "user@airse.co.uk",
      required: true,
      width: FIELD_WIDTH.FULL,
      order: 3,
    },
    {
      id: "phone_number",
      name: "phone_number",
      type: FIELD_TYPES.PHONE,
      label: "Phone number",
      placeholder: "Enter phone number",
      width: FIELD_WIDTH.HALF,
      order: 4,
    },
    {
      id: "postcode",
      name: "postcode",
      type: FIELD_TYPES.TEXT,
      label: "Postcode",
      placeholder: "Enter postcode",
      width: FIELD_WIDTH.HALF,
      order: 5,
    },
    {
      id: "address",
      name: "address",
      type: FIELD_TYPES.TEXTAREA,
      label: "Address",
      placeholder: "Enter address",
      width: FIELD_WIDTH.FULL,
      rows: 2,
      order: 6,
    },
  ];

  if (!isEditing) {
    fields.push(
      {
        id: "password",
        name: "password",
        type: FIELD_TYPES.PASSWORD,
        label: "Initial password",
        placeholder: "Enter a strong temporary password",
        required: true,
        width: FIELD_WIDTH.FULL,
        order: 7,
        helpText: "Use a strong password and share it securely.",
      },
      {
        id: "role_id",
        name: "role_id",
        type: FIELD_TYPES.SELECT,
        label: "Assigned role",
        placeholder: "Select a role",
        required: true,
        width: FIELD_WIDTH.FULL,
        order: 8,
        options: roles.map((role) => ({
          label: role.name.replaceAll("_", " "),
          value: role.id,
        })),
      },
    );
  }

  return fields;
};
