import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { InterviewScoresheetDocument } from "../types/document.types";
import letterHead from "@/assets/Arise-portrait-letterhead-png8.png";

interface InterviewScoresheetPdfProps {
  documentData: InterviewScoresheetDocument;
}

const styles = StyleSheet.create({
  page: {
    position: "relative",
    paddingTop: 100,
    paddingBottom: 65,
    paddingHorizontal: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectPosition: "50% 0%",
  },

  header: {
    position: "absolute",
    top: 25,
    left: 40,
    right: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2563eb",
  },

  agencyName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1d4ed8",
  },

  agencyDetails: {
    marginTop: 3,
    fontSize: 8,
    color: "#64748b",
  },

  footer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    fontSize: 8,
    color: "#64748b",
  },

  title: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 20,
  },

  detailsContainer: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
  },

  detailRow: {
    flexDirection: "row",
    marginBottom: 7,
  },

  detailLabel: {
    width: "30%",
    fontWeight: "bold",
    color: "#334155",
  },

  detailValue: {
    width: "70%",
    color: "#475569",
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    backgroundColor: "#dbeafe",
    color: "#1e3a8a",
    fontSize: 10,
    fontWeight: "bold",
    padding: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    paddingVertical: 7,
  },

  tableRow: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    paddingVertical: 7,
    minHeight: 28,
  },

  criteriaColumn: {
    width: "28%",
    paddingHorizontal: 6,
  },

  assessmentColumn: {
    width: "57%",
    paddingHorizontal: 6,
  },

  scoreColumn: {
    width: "15%",
    paddingHorizontal: 6,
    textAlign: "center",
  },

  headerText: {
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  cellText: {
    color: "#334155",
    lineHeight: 1.4,
  },

  scoreText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#1d4ed8",
  },

  summaryContainer: {
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#93c5fd",
    backgroundColor: "#eff6ff",
    borderRadius: 4,
  },

  summaryTitle: {
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 6,
  },

  summaryScore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1d4ed8",
  },

  signatureContainer: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 4,
  },

  signatureTitle: {
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 10,
  },

  signatureImage: {
    width: 150,
    height: 55,
    objectFit: "contain",
    objectPosition: "left center",
  },

  signatureFallback: {
    color: "#64748b",
    fontStyle: "italic",
  },
});

const formatDate = (date?: string | null) => {
  if (!date) return "Not provided";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB");
};

const getScoreValue = (score: number | null) => {
  return score === null || score === undefined ? "0" : String(score);
};

export const InterviewScoresheetPdf = ({
  documentData,
}: InterviewScoresheetPdfProps) => {
  const { applicant, interview, sections } = documentData;

  return (
    <Document
      title="Interview Score Sheet"
      author="Airse Nursing Agency"
      subject="Applicant Interview Scoresheet"
    >
      <Page size="A4" style={styles.page}>
        {letterHead && (
          <Image src={letterHead} style={styles.backgroundImage} fixed />
        )}

        {/* Header
        <View style={styles.header} fixed>
          <Text style={styles.agencyName}>Airse Nursing Agency</Text>

          <Text style={styles.agencyDetails}>
            Recruitment and Healthcare Staffing Services
          </Text>
        </View> */}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Interview Score Sheet</Text>

          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>

        {/* Document title */}
        <Text style={styles.title}>Interview Score Sheet</Text>

        {/* Candidate details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Candidate Name:</Text>

            <Text style={styles.detailValue}>
              {applicant?.fullName ?? "Not provided"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interview Date:</Text>

            <Text style={styles.detailValue}>
              {formatDate(interview.interviewDate)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interviewer:</Text>

            <Text style={styles.detailValue}>
              {interview.interviewerName || "Not provided"}
            </Text>
          </View>
        </View>

        {/* Assessment sections */}
        {sections
          .filter((section) => section.id !== "general-information")
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((section) => (
            <View key={section.id} style={styles.section} wrap>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              <View style={styles.tableHeader}>
                <Text style={[styles.criteriaColumn, styles.headerText]}>
                  Criteria
                </Text>

                <Text style={[styles.assessmentColumn, styles.headerText]}>
                  Assessment Area
                </Text>

                <Text style={[styles.scoreColumn, styles.headerText]}>
                  Score
                </Text>
              </View>

              {section.fields.map((field) => (
                <View key={field.id} style={styles.tableRow} wrap={false}>
                  <Text style={[styles.criteriaColumn, styles.cellText]}>
                    {/* {getCriteria(field)} */}
                    {field.label}
                  </Text>

                  <Text style={[styles.assessmentColumn, styles.cellText]}>
                    {field.description}
                  </Text>

                  <Text style={[styles.scoreColumn, styles.scoreText]}>
                    {getScoreValue(field.score)}
                  </Text>
                </View>
              ))}
            </View>
          ))}

        {/* Score summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Total Score (Out of 50)</Text>

          <Text style={styles.summaryScore}>
            {interview.normalizedScore === null
              ? "Not available"
              : `${interview.normalizedScore} / ${interview.totalScore}`}
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureTitle}>
            Interviewer Signature and Date
          </Text>

          {interview.interviewerSignature ? (
            <Image
              src={interview.interviewerSignature.document_url}
              style={styles.signatureImage}
            />
          ) : (
            <Text style={styles.signatureFallback}>Signature not provided</Text>
          )}

          <Text style={styles.cellText}>
            Date: {formatDate(interview.interviewDate)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
