import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import letterHead from "@/assets/Arise-portrait-letterhead-png8.png";

import type {
  ComplianceDocumentFile,
  ComplianceRecord,
  ComplianceSummaryDocument as ComplianceSummaryDocumentType,
} from "../types/document.types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 120,
    paddingBottom: 40,
    paddingHorizontal: 32,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1e293b",
    backgroundColor: "#ffffff",
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
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  eyebrow: {
    fontSize: 8,
    color: "#2563eb",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#64748b",
  },
  metadata: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    gap: 12,
  },
  metadataItem: {
    width: "47%",
    marginBottom: 5,
  },
  metadataLabel: {
    fontSize: 7,
    color: "#64748b",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metadataValue: {
    fontSize: 9,
    color: "#0f172a",
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  summaryCard: {
    width: "48%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  summaryValue: {
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 8,
    color: "#475569",
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 5,
    overflow: "hidden",
  },
  sectionHeader: {
    padding: 9,
    backgroundColor: "#eff6ff",
    borderBottomWidth: 1,
    borderBottomColor: "#dbeafe",
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af",
  },
  sectionSubtitle: {
    marginTop: 3,
    fontSize: 8,
    color: "#64748b",
  },
  sectionBody: {
    padding: 9,
  },
  fieldRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f5f9",
  },
  fieldLabel: {
    width: "42%",
    paddingRight: 8,
    fontSize: 8,
    color: "#64748b",
  },
  fieldValue: {
    flex: 1,
    fontSize: 8,
    color: "#0f172a",
    lineHeight: 1.5,
  },
  status: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 7,
  },
  item: {
    padding: 9,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  itemText: {
    fontSize: 8,
    color: "#475569",
    lineHeight: 1.5,
    marginBottom: 3,
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
    fontSize: 8,
    marginTop: 4,
  },
  warning: {
    padding: 9,
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fde68a",
    borderRadius: 4,
    marginBottom: 7,
  },
  warningText: {
    color: "#92400e",
    fontSize: 8,
    lineHeight: 1.5,
  },
  emptyText: {
    fontSize: 8,
    color: "#64748b",
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 32,
    right: 32,
    paddingTop: 7,
    borderTopWidth: 0.5,
    borderTopColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: "#94a3b8",
  },
});

const formatLabel = (key: string): string =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatDate = (value: unknown): string => {
  if (typeof value !== "string" || !value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getApplicantName = (
  applicant: ComplianceSummaryDocumentType["applicant"],
): string => {
  if (!applicant) return "Applicant";

  if (typeof applicant.fullName === "string" && applicant.fullName.trim()) {
    return applicant.fullName;
  }

  const firstName =
    typeof applicant.first_name === "string" ? applicant.first_name : "";
  const lastName =
    typeof applicant.last_name === "string" ? applicant.last_name : "";

  return `${firstName} ${lastName}`.trim() || "Applicant";
};

const isFileObject = (value: unknown): value is ComplianceDocumentFile =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getFileUrl = (file: ComplianceDocumentFile): string | null => {
  const candidates = [file.document_url, file.documentUrl, file.url, file.path];

  return (
    candidates.find(
      (candidate): candidate is string =>
        typeof candidate === "string" && candidate.trim().length > 0,
    ) ?? null
  );
};

const getFileName = (file: ComplianceDocumentFile): string => {
  const candidates = [
    file.name,
    file.filename,
    file.originalname,
    file.document_name,
  ];

  return (
    candidates.find(
      (candidate): candidate is string =>
        typeof candidate === "string" && candidate.trim().length > 0,
    ) ?? "View document"
  );
};

const isUploadField = (key: string): boolean =>
  /document|passport|updatecheck|photo|certificate|membershipcard|proofOfAddress|birthCertificate/i.test(
    key,
  );

const renderValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.length ? `${value.length} item(s)` : "None";
  }

  // Do not stringify uploaded file objects into the PDF.
  if (isFileObject(value)) return "Document available";

  return "Available";
};

const DocumentLinks = ({ value }: { value: unknown }) => {
  const files = (Array.isArray(value) ? value : [value]).filter(isFileObject);

  if (!files.length) {
    return (
      <Text style={styles.fieldValue}>
        {value
          ? "Document details available; link not supplied"
          : "Not provided"}
      </Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {files.map((file, index) => {
        const url = getFileUrl(file);

        return url ? (
          <Link key={`${url}-${index}`} src={url} style={styles.link}>
            {/* {getFileName(file)} */}
            View Document
          </Link>
        ) : (
          <Text key={index} style={styles.fieldValue}>
            {getFileName(file)} — link unavailable
          </Text>
        );
      })}
    </View>
  );
};

const RecordFields = ({ values }: { values: ComplianceRecord }) => {
  const entries = Object.entries(values).filter(
    ([, value]) => value !== undefined && value !== null && value !== "",
  );

  if (!entries.length) {
    return (
      <Text style={styles.emptyText}>
        No compliance values have been provided.
      </Text>
    );
  }

  return (
    <View>
      {entries.map(([key, value]) => (
        <View key={key} style={styles.fieldRow} wrap={false}>
          <Text style={styles.fieldLabel}>{formatLabel(key)}</Text>
          {isUploadField(key) &&
          (isFileObject(value) ||
            (Array.isArray(value) && value.some(isFileObject))) ? (
            <DocumentLinks value={value} />
          ) : (
            <Text style={styles.fieldValue}>{renderValue(value)}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const ComplianceSection = ({
  title,
  status,
  values,
  description,
}: {
  title: string;
  status: string;
  values: ComplianceRecord;
  description: string;
}) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>Status: {formatLabel(status)}</Text>
      <Text style={styles.sectionSubtitle}>{description}</Text>
    </View>
    <View style={styles.sectionBody}>
      <RecordFields values={values} />
    </View>
  </View>
);

const ComplianceSummaryPdf = ({
  document,
}: {
  document: ComplianceSummaryDocumentType;
}) => {
  const applicantName = getApplicantName(document.applicant);
  const { summary, sections, trainingCertificates, references } = document;

  const rightToWorkValues = {
    ...(sections.rightToWork.applicantValues ?? {}),
    ...(sections.rightToWork.managerValues ?? {}),
  };

  return (
    <Document
      title={`Compliance Summary - ${applicantName}`}
      author="Arise Nursing"
      subject="Applicant compliance summary"
    >
      <Page size="A4" style={styles.page} wrap>
        <Image src={letterHead} style={styles.backgroundImage} fixed />
        <View style={styles.header}>
          {/* <Text style={styles.eyebrow}>Arise Nursing · Recruitment</Text> */}
          <Text style={styles.title}>Compliance Summary</Text>
          <Text style={styles.subtitle}>
            Compliance overview for {applicantName}
          </Text>

          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Applicant</Text>
              <Text style={styles.metadataValue}>{applicantName}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Application reference</Text>
              <Text style={styles.metadataValue}>
                {document.application.id}
              </Text>
            </View>
            {/* <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Application status</Text>
              <Text style={styles.metadataValue}>
                {formatLabel(document.application.status ?? "Not available")}
              </Text>
            </View> */}
            {/* <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Submitted date</Text>
              <Text style={styles.metadataValue}>
                {formatDate(document.application.submittedAt)}
              </Text>
            </View> */}
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Generated on</Text>
              <Text style={styles.metadataValue}>
                {formatDate(document.generatedAt)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {summary.uploadedCertificateCount}
            </Text>
            <Text style={styles.summaryLabel}>Uploaded certificates</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {summary.missingMandatoryCertificateCount}
            </Text>
            <Text style={styles.summaryLabel}>
              Missing mandatory requirements
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {summary.receivedReferenceResponses}
            </Text>
            <Text style={styles.summaryLabel}>
              Reference responses received
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {summary.pendingReferenceResponses}
            </Text>
            <Text style={styles.summaryLabel}>Pending reference responses</Text>
          </View>
        </View>

        <ComplianceSection
          title="Identity Compliance"
          status={sections.identityCompliance.status}
          values={sections.identityCompliance.values}
          description="Identity and address verification"
        />

        <ComplianceSection
          title="Right to Work"
          status={sections.rightToWork.status}
          values={rightToWorkValues}
          description="Applicant declarations and manager verification"
        />

        <ComplianceSection
          title="DBS"
          status={sections.dbs.status}
          values={sections.dbs.managerValues ?? {}}
          description="Manager-recorded DBS check information"
        />

        <ComplianceSection
          title="Professional Memberships"
          status={sections.professionalMemberships.status}
          values={sections.professionalMemberships.values}
          description="Professional registration and membership details"
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Training Certificates</Text>
            <Text style={styles.sectionSubtitle}>
              {trainingCertificates.uploaded.length} uploaded ·{" "}
              {trainingCertificates.missingMandatoryRequirements.length} missing
            </Text>
          </View>
          <View style={styles.sectionBody}>
            {trainingCertificates.uploaded.length ? (
              trainingCertificates.uploaded.map((certificate) => {
                const name =
                  certificate.certificate_name ??
                  certificate.certificateName ??
                  "Training certificate";

                const certificateNumber =
                  certificate.certificate_number ??
                  certificate.certificateNumber ??
                  "Not provided";

                const issueDate =
                  certificate.issue_date ?? certificate.issueDate;

                const expiryDate =
                  certificate.expiry_date ?? certificate.expiryDate;

                return (
                  <View key={certificate.id} style={styles.item} wrap={false}>
                    <Text style={styles.itemTitle}>{name}</Text>
                    <Text style={styles.itemText}>
                      Certificate number: {certificateNumber}
                    </Text>
                    <Text style={styles.itemText}>
                      Issue date: {formatDate(issueDate)}
                    </Text>
                    <Text style={styles.itemText}>
                      Expiry date: {formatDate(expiryDate)}
                    </Text>
                    {certificate.document && (
                      <DocumentLinks value={certificate.document} />
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>
                No training certificates have been uploaded.
              </Text>
            )}

            {trainingCertificates.missingMandatoryRequirements.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text style={[styles.itemTitle, { color: "#92400e" }]}>
                  Missing mandatory requirements
                </Text>
                {trainingCertificates.missingMandatoryRequirements.map(
                  (requirement) => (
                    <View
                      key={requirement.id}
                      style={styles.warning}
                      wrap={false}
                    >
                      <Text style={styles.warningText}>{requirement.name}</Text>
                      {requirement.description && (
                        <Text style={styles.warningText}>
                          {requirement.description}
                        </Text>
                      )}
                    </View>
                  ),
                )}
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>References</Text>
            <Text style={styles.sectionSubtitle}>
              {summary.receivedReferenceResponses} received ·{" "}
              {summary.pendingReferenceResponses} pending
            </Text>
          </View>
          <View style={styles.sectionBody}>
            {references.length ? (
              references.map((reference) => (
                <View key={reference.id} style={styles.item} wrap={false}>
                  <Text style={styles.itemTitle}>
                    {reference.companyName || "Company not provided"}
                  </Text>
                  <Text style={styles.itemText}>
                    Referee: {reference.refereeName || "Not provided"}
                  </Text>
                  <Text style={styles.itemText}>
                    Relationship:{" "}
                    {reference.refereeRelationship || "Not provided"}
                  </Text>
                  <Text style={styles.itemText}>
                    Email: {reference.refereeEmail || "Not provided"}
                  </Text>
                  <Text style={styles.itemText}>
                    Reference status:{" "}
                    {formatLabel(reference.status ?? "Not available")}
                  </Text>
                  <Text style={styles.status}>
                    Response:{" "}
                    {reference.responseStatus === "received"
                      ? "Received"
                      : "Pending"}
                  </Text>

                  {reference.responses.map((response, index) => (
                    <View key={response.id ?? index}>
                      {response.refererName && (
                        <Text style={styles.itemText}>
                          Respondent: {response.refererName}
                        </Text>
                      )}
                      {response.signatureDate && (
                        <Text style={styles.itemText}>
                          Response date: {formatDate(response.signatureDate)}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                No references are recorded for this application.
              </Text>
            )}
          </View>
        </View>

        <Text style={styles.subtitle}>
          This summary reflects the compliance information returned by the
          system at the time of generation. Verify source documents before
          making compliance decisions.
        </Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Arise Nursing · Confidential</Text>
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

export default ComplianceSummaryPdf;
