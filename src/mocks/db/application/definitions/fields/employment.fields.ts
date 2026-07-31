import { FIELD_WIDTH, type ApplicationField } from "@/features/application/types";

export const employmentFields: ApplicationField[] = [
  {
    id: "employer-name",
    name: "employerName",
    label: "Employer Name",
    type: "text",
    required: true,
    order: 1,
    width: FIELD_WIDTH.FULL,
  },

  {
    id: "job-title",
    name: "jobTitle",
    label: "Job Title",
    type: "text",
    required: true,
    order: 2,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "department",
    name: "department",
    label: "Department",
    type: "text",
    order: 3,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "employment-type",
    name: "employmentType",
    label: "Employment Type",
    type: "select",
    required: true,
    order: 4,
    width: FIELD_WIDTH.HALF,
    options: [
      { label: "Full Time", value: "full_time" },
      { label: "Part Time", value: "part_time" },
      { label: "Agency", value: "agency" },
      { label: "Bank", value: "bank" },
      { label: "Contract", value: "contract" },
    ],
  },

  {
    id: "start-date",
    name: "startDate",
    label: "Start Date",
    type: "date",
    required: true,
    order: 5,
    width: FIELD_WIDTH.HALF,
  },

  {
    id: "currently-working",
    name: "currentlyWorking",
    label: "I currently work here",
    type: "checkbox",
    order: 6,
    width: FIELD_WIDTH.FULL,
  },

  {
    id: "end-date",
    name: "endDate",
    label: "End Date",
    type: "date",
    order: 7,
    width: FIELD_WIDTH.HALF,
    visibleWhen: {
      rules: [
        {
          field: "currentlyWorking",
          operator: "equals",
          value: false,
        },
      ],
    },
  },

  {
    id: "reason-for-leaving",
    name: "reasonForLeaving",
    label: "Reason for Leaving",
    type: "textarea",
    order: 8,
    width: FIELD_WIDTH.FULL,
    visibleWhen: {
      rules: [
        {
          field: "currentlyWorking",
          operator: "equals",
          value: false,
        },
      ],
    },
  },
];
