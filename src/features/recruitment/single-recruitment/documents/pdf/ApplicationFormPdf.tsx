import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import letterHead from "@/assets/Arise-portrait-letterhead-png8.png";
import type {
  ApplicationDefinitionSection,
  ApplicationDocument,
} from "../types/document.types";

import ApplicationFormSection from "../components/ApplicationFormSection";
import ApplicationReferences from "../components/ApplicationReferences";

interface ApplicationFormPdfProps {
  document: ApplicationDocument;
  sections: ApplicationDefinitionSection[];
}

const HEADER_HEIGHT = 125;
const FOOTER_HEIGHT = 55;

const styles = StyleSheet.create({
  page: {
    position: "relative",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontFamily: "Helvetica",
    fontSize: 10,

    // Reserve sufficient space for fixed header and footer.
    paddingTop: HEADER_HEIGHT,
    paddingBottom: FOOTER_HEIGHT,
    paddingHorizontal: 42,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 0%", // Top center
    zIndex: -1,
  },

  // ---------------------------------------------------------------------------
  // Header
  // ---------------------------------------------------------------------------

  header: {
    position: "absolute",
    top: 28,
    left: 42,
    right: 42,
    height: 82,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2563eb",
  },

  headerTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  agencyName: {
    color: "#1d4ed8",
    fontSize: 18,
    fontWeight: 700,
  },

  agencySubtitle: {
    color: "#64748b",
    fontSize: 8,
    marginTop: 3,
  },

  agencyDetails: {
    alignItems: "flex-end",
  },

  agencyDetail: {
    color: "#475569",
    fontSize: 8,
    marginBottom: 3,
  },

  documentTitle: {
    color: "#0f172a",
    fontSize: 12,
    fontWeight: 700,
    marginTop: 10,
  },

  documentReference: {
    color: "#64748b",
    fontSize: 8,
    marginTop: 3,
  },

  // ---------------------------------------------------------------------------
  // Footer
  // ---------------------------------------------------------------------------

  footer: {
    position: "absolute",
    bottom: 25,
    left: 42,
    right: 42,
    height: 25,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    color: "#64748b",
    fontSize: 8,
  },

  // ---------------------------------------------------------------------------
  // Content
  // ---------------------------------------------------------------------------

  content: {
    width: "100%",
  },

  applicantSummary: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },

  applicantSummaryTitle: {
    color: "#1e40af",
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8,
  },

  applicantSummaryRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 4,
  },

  applicantSummaryLabel: {
    color: "#64748b",
    fontSize: 9,
    width: 115,
  },

  applicantSummaryValue: {
    color: "#0f172a",
    fontSize: 9,
    flex: 1,
  },

  generatedDate: {
    color: "#64748b",
    fontSize: 8,
    marginBottom: 14,
  },
});

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const getApplicantValue = (
  applicant: Record<string, unknown> | null,
  keys: string[],
): string => {
  if (!applicant) {
    return "—";
  }

  for (const key of keys) {
    const value = applicant[key];

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value);
    }
  }

  return "—";
};

const formatGeneratedDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ApplicationFormPdf = ({
  document,
  sections,
}: ApplicationFormPdfProps) => {
  const applicant = document.applicant;
  const reference = document.references;

  const applicantName = getApplicantValue(
    {
      ...applicant,
      fullName: `${applicant?.last_name ?? ""} ${
        applicant?.first_name ?? ""
      }`.trim(),
    },
    ["fullName"],
  );

  const applicantEmail = getApplicantValue(applicant, [
    "email",
    "emailAddress",
  ]);

  const applicantPhone = getApplicantValue(applicant, [
    "phone",
    "phone_number",
    "mobileNumber",
  ]);

  const sortedSections = [...sections].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const sectionValues = new Map(
    document.sections.map((section) => [section.sectionId, section.values]),
  );

  return (
    <Document
      title="Application Form"
      author="Airse Nursing Agency"
      subject="Applicant Application Form"
    >
      <Page size="A4" style={styles.page} wrap>
        <Image src={letterHead} style={styles.backgroundImage} fixed />
        {/* Fixed header: repeated on every page */}
        {/* <View fixed style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.agencyName}>AIRSE NURSING AGENCY</Text>

              <Text style={styles.agencySubtitle}>
                Professional Healthcare Recruitment
              </Text>
            </View>

            <View style={styles.agencyDetails}>
              <Text style={styles.agencyDetail}>123 Healthcare Avenue</Text>

              <Text style={styles.agencyDetail}>London, United Kingdom</Text>

              <Text style={styles.agencyDetail}>info@airse.example.com</Text>

              <Text style={styles.agencyDetail}>+44 20 0000 0000</Text>
            </View>
          </View>

          <Text style={styles.documentTitle}>APPLICANT APPLICATION FORM</Text>

          <Text style={styles.documentReference}>
            Application Reference: {document.application.id}
          </Text>
        </View> */}

        {/* Main content */}
        <View style={styles.content}>
          <View style={styles.applicantSummary}>
            <Text style={styles.applicantSummaryTitle}>
              Applicant Information
            </Text>

            <View style={styles.applicantSummaryRow}>
              <Text style={styles.applicantSummaryLabel}>Applicant Name</Text>

              <Text style={styles.applicantSummaryValue}>{applicantName}</Text>
            </View>

            <View style={styles.applicantSummaryRow}>
              <Text style={styles.applicantSummaryLabel}>Email Address</Text>

              <Text style={styles.applicantSummaryValue}>{applicantEmail}</Text>
            </View>

            <View style={styles.applicantSummaryRow}>
              <Text style={styles.applicantSummaryLabel}>Phone Number</Text>

              <Text style={styles.applicantSummaryValue}>{applicantPhone}</Text>
            </View>
          </View>

          <Text style={styles.generatedDate}>
            Generated on: {formatGeneratedDate(document.generatedAt)}
          </Text>

          {sortedSections.map((section) => {
            const values = sectionValues.get(section.id) ?? {};

            return (
              <ApplicationFormSection
                key={section.id}
                section={section}
                values={values}
              />
            );
          })}

          <ApplicationReferences references={reference ?? []} />
        </View>

        {/* Fixed footer: repeated on every page */}
        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>
            Airse Nursing Agency • Confidential Document
          </Text>

          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default ApplicationFormPdf;
