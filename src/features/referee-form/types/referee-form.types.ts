import type { ReferenceResponseApiPayload } from "@/features/recruitment/types/reference.types";

export interface RefereeFormDetails {
  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string | null;
    postcode: string;
  };

  reference: {
    id: string;
    companyName: string | null;
    fromDate: string | null;
    toDate: string | null;
    refereeName: string | null;
    refereeEmail: string | null;
    refereePhone: string | null;
    refereeRelationship: string | null;
  };
}

export type RefereeFormSubmission = ReferenceResponseApiPayload;
