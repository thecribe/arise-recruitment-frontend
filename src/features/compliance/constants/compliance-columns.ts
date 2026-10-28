export interface ComplianceColumn {
  id: string;
  label: string;
  group: string;
  fieldName?: string;
  defaultVisible: boolean;
}

export interface ComplianceColumnGroup {
  id: string;
  label: string;
  columns: ComplianceColumn[];
}

export const APPLICANT_COLUMN = {
  id: "applicant",
  label: "Applicant",
} as const;

export const COMPLIANCE_COLUMN_GROUPS: ComplianceColumnGroup[] = [
  {
    id: "identity",
    label: "Identity",
    columns: [
      {
        id: "identity.proofOfAddress",
        label: "Proof of Address",
        group: "identity",
        fieldName: "proofOfAddress",
        defaultVisible: true,
      },
      {
        id: "identity.nationalInsuranceNumber",
        label: "National Insurance Number",
        group: "identity",
        fieldName: "nationalInsuranceNumber",
        defaultVisible: false,
      },
      {
        id: "identity.passport",
        label: "Passport",
        group: "identity",
        fieldName: "passport",
        defaultVisible: false,
      },
      {
        id: "identity.proofOfNationalInsuranceNumber",
        label: "Proof of National Insurance Number",
        group: "identity",
        fieldName: "proofOfNationalInsuranceNumber",
        defaultVisible: false,
      },
      {
        id: "identity.passportSizePhoto",
        label: "Passport Size Photo",
        group: "identity",
        fieldName: "passportSizePhoto",
        defaultVisible: false,
      },
      {
        id: "identity.birthCertificate",
        label: "Birth Certificate",
        group: "identity",
        fieldName: "birthCertificate",
        defaultVisible: false,
      },
    ],
  },
  {
    id: "professionalMemberships",
    label: "Professional Memberships",
    columns: [
      {
        id: "professionalMemberships.professionalBodyType",
        label: "Professional Body/Type",
        group: "professionalMemberships",
        fieldName: "professionalBodyType",
        defaultVisible: false,
      },
      {
        id: "professionalMemberships.pin",
        label: "PIN",
        group: "professionalMemberships",
        fieldName: "pin",
        defaultVisible: false,
      },
      {
        id: "professionalMemberships.renewalDate",
        label: "Renewal Date",
        group: "professionalMemberships",
        fieldName: "renewalDate",
        defaultVisible: false,
      },
      {
        id: "professionalMemberships.membershipCard",
        label: "Membership Card",
        group: "professionalMemberships",
        fieldName: "membershipCard",
        defaultVisible: false,
      },
    ],
  },
  {
    id: "training",
    label: "Mandatory Training",
    columns: [],
  },
];

export const DEFAULT_VISIBLE_COLUMNS = [
  "identity.proofOfAddress",
  "rightToWork",
  "dbs",
];

export const SINGLE_COMPLIANCE_COLUMNS = [
  {
    id: "rightToWork",
    label: "Right to Work",
  },
  {
    id: "dbs",
    label: "DBS",
  },
  {
    id: "references",
    label: "References",
  },
] as const;
