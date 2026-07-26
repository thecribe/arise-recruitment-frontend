import type { ApplicantSectionData } from "@/mocks/db/types";

export const personalInformationData: ApplicantSectionData = {
  applicantId: "applicant-001",

  sectionId: "section-personal-information",

  status: "draft",

  values: {
    title: "",

    firstName: "",

    middleName: "",

    lastName: "",

    preferredName: "",

    gender: "",

    nationality: "",
  },
};
