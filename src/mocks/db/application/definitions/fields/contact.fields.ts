import type { ApplicationField } from "@/features/application/types";
import { FIELD_WIDTH } from "@/features/application/types/field-width";

export const contactFields: ApplicationField[] = [
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    order: 1,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "mobile-phone",
    name: "mobilePhone",
    label: "Mobile Phone",
    type: "tel",
    required: true,
    order: 2,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "home-phone",
    name: "homePhone",
    label: "Home Phone",
    type: "tel",
    order: 3,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "address-line-1",
    name: "addressLine1",
    label: "Address Line 1",
    type: "text",
    required: true,
    order: 4,
    width: FIELD_WIDTH.FULL,
  },

  {
    id: "address-line-2",
    name: "addressLine2",
    label: "Address Line 2",
    type: "text",
    order: 5,
    width: FIELD_WIDTH.FULL,
  },

  {
    id: "city",
    name: "city",
    label: "Town / City",
    type: "text",
    required: true,
    order: 6,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "county",
    name: "county",
    label: "County",
    type: "text",
    order: 7,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "postcode",
    name: "postcode",
    label: "Postcode",
    type: "text",
    required: true,
    order: 8,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "country",
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    order: 9,
    width: FIELD_WIDTH.HALF,
    options: [
      {
        label: "United Kingdom",
        value: "GB",
      },
    ],
  },

  {
    id: "emergency-contact-name",
    name: "emergencyContactName",
    label: "Emergency Contact Name",
    type: "text",
    required: true,
    order: 10,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "emergency-contact-phone",
    name: "emergencyContactPhone",
    label: "Emergency Contact Phone",
    type: "tel",
    required: true,
    order: 11,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "emergency-contact-relationship",
    name: "emergencyContactRelationship",
    label: "Relationship",
    type: "text",
    required: true,
    order: 12,
    width: FIELD_WIDTH.HALF,
  },
];
