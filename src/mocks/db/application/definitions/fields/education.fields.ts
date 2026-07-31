import { FIELD_WIDTH, type ApplicationField } from "@/features/application/types";

export const educationFields: ApplicationField[] = [
  {
    id: "institution",
    name: "institution",
    label: "Institution",
    type: "text",
    required: true,
    order: 1,
    width: FIELD_WIDTH.FULL,
  },

  {
    id: "qualification",
    name: "qualification",
    label: "Qualification",
    type: "text",
    required: true,
    order: 2,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "subject",
    name: "subject",
    label: "Subject / Course",
    type: "text",
    order: 3,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "grade",
    name: "grade",
    label: "Grade / Result",
    type: "text",
    order: 4,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "start-date",
    name: "startDate",
    label: "Start Date",
    type: "date",
    order: 5,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "end-date",
    name: "endDate",
    label: "End Date",
    order: 6,
    type: "date",
    width: FIELD_WIDTH.HALF,
  },
];
