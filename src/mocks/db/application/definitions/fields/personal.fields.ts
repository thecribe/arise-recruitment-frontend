import {
  FIELD_WIDTH,
  type ApplicationField,
} from "@/features/application/types";

export const personalFields: ApplicationField[] = [
  {
    id: "title",
    name: "title",
    label: "Title",
    type: "select",
    required: true,
    order: 1,
    width: FIELD_WIDTH.QUARTER,
    options: [
      { label: "Mr", value: "mr" },
      { label: "Mrs", value: "mrs" },
      { label: "Miss", value: "miss" },
      { label: "Ms", value: "ms" },
      { label: "Dr", value: "dr" },
      { label: "Prof", value: "prof" },
    ],
  },

  {
    id: "first-name",
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    order: 2,
    width: FIELD_WIDTH.THREE_QUARTERS,
  },

  {
    id: "middle-name",
    name: "middleName",
    label: "Middle Name",
    type: "text",
    order: 3,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "last-name",
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    order: 4,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "preferred-name",
    name: "preferredName",
    label: "Preferred Name",
    type: "text",
    order: 5,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "date-of-birth",
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
    order: 6,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "gender",
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    order: 7,
    width: FIELD_WIDTH.HALF,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
      { label: "Prefer not to say", value: "prefer_not_to_say" },
    ],
  },

  {
    id: "marital-status",
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    order: 8,
    width: FIELD_WIDTH.HALF,
    options: [
      { label: "Single", value: "single" },
      { label: "Married", value: "married" },
      { label: "Divorced", value: "divorced" },
      { label: "Widowed", value: "widowed" },
    ],
  },

  {
    id: "nationality",
    name: "nationality",
    label: "Nationality",
    type: "text",
    required: true,
    order: 9,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "national-insurance",
    name: "nationalInsuranceNumber",
    label: "National Insurance Number",
    type: "text",
    order: 10,
    width: FIELD_WIDTH.HALF,
  },
];
