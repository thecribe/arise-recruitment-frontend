import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { FormField } from "@/components/forms/types/field";
import type {
  DeclarationSections,
  DeclarationValues,
  DeclarationSection,
} from "@/features/recruitment/types/declarations.types";
import letterHead from "@/assets/Arise-portrait-letterhead-png8.png";

interface DeclarationsPdfProps {
  sections: DeclarationSections;
  values: DeclarationValues;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 100,
    paddingBottom: 55,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1e293b",
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
    width: "100%",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "1px solid #bfdbfe",
  },

  brand: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1d4ed8",
    marginBottom: 3,
  },

  documentTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 4,
    textAlign: "center",
  },

  applicationId: {
    fontSize: 8,
    color: "#64748b",
  },

  section: {
    width: "100%",
    marginBottom: 18,
    padding: 12,
    border: "1px solid #dbeafe",
    borderRadius: 6,
    backgroundColor: "#f8fbff",
  },

  sectionHeader: {
    width: "100%",
    marginBottom: 9,
    paddingBottom: 7,
    borderBottom: "1px solid #dbeafe",
  },

  sectionTitle: {
    width: "100%",
    fontSize: 12,
    fontWeight: 700,
    color: "#1e40af",
  },

  status: {
    width: "100%",
    marginTop: 3,
    fontSize: 7.5,
    color: "#64748b",
  },

  declarationText: {
    width: "100%",
    marginBottom: 5,
    fontSize: 9,
    lineHeight: 1.5,
    color: "#334155",
    textAlign: "justify",
  },

  fields: {
    width: "100%",
  },

  field: {
    width: "100%",
    marginBottom: 9,
    paddingBottom: 7,
    borderBottom: "1px solid #e2e8f0",
  },

  fieldLabel: {
    width: "100%",
    marginBottom: 3,
    fontSize: 8,
    fontWeight: 700,
    color: "#475569",
  },

  fieldValue: {
    width: "100%",
    fontSize: 9,
    lineHeight: 1.35,
    color: "#0f172a",
  },

  signatureContainer: {
    width: "100%",
    marginTop: 3,
    minHeight: 55,
    justifyContent: "center",
  },

  signatureImage: {
    width: 150,
    height: 55,
    objectFit: "contain",
    objectPosition: "left center",
  },

  empty: {
    width: "100%",
    fontSize: 8,
    color: "#94a3b8",
    fontStyle: "italic",
  },

  footer: {
    position: "absolute",
    bottom: 22,
    left: 42,
    right: 42,
    paddingTop: 6,
    borderTop: "1px solid #e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    fontSize: 7,
    color: "#94a3b8",
  },
});

const SECTION_TITLES: Record<string, string> = {
  health: "Health Declaration",
  disability: "Disability Declaration",
  confidentiality: "Confidentiality Declaration",
  "photographic-images": "Photographic Images Declaration",
  "personal-declarations": "Personal Declaration",
  "working-time-regulations": "Working Time Regulations",
  "other-declarations": "Other Declarations",
  "health-and-safety": "Health and Safety Declaration",
  "rehabilitation-of-offenders-act":
    "Rehabilitation of Offenders Act Declaration",
};

const getSectionTitle = (sectionId: string) => {
  if (SECTION_TITLES[sectionId]) {
    return SECTION_TITLES[sectionId];
  }

  return sectionId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const htmlToText = (html: string): string => {
  if (!html) {
    return "";
  }

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n")
    .trim();
};

const getDocumentUrl = (value: unknown): string | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (
    "document_url" in value &&
    typeof value.document_url === "string" &&
    value.document_url.trim()
  ) {
    return value.document_url;
  }

  return null;
};

const getOptionLabel = (field: FormField, value: unknown): string | null => {
  if (!Array.isArray(field.options)) {
    return null;
  }

  const option = field.options.find((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    return "value" in item && item.value === value;
  });

  if (!option || typeof option !== "object") {
    return null;
  }

  if ("label" in option && typeof option.label === "string") {
    return option.label;
  }

  return null;
};

const getFieldDisplayValue = (field: FormField, value: unknown): string => {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return "Not provided";
    }

    return value
      .map((item) => getOptionLabel(field, item) ?? String(item))
      .join(", ");
  }

  const optionLabel = getOptionLabel(field, value);

  if (optionLabel) {
    return optionLabel;
  }

  if (typeof value === "object") {
    if ("value" in value && typeof value.value === "string") {
      return value.value;
    }

    if ("name" in value && typeof value.name === "string") {
      return value.name;
    }

    return "Provided";
  }

  return String(value);
};

const isSignatureField = (field: FormField): boolean => {
  return field.type === "signature";
};

const DeclarationField = ({
  field,
  value,
}: {
  field: FormField;
  value: unknown;
}) => {
  const documentUrl = isSignatureField(field) ? getDocumentUrl(value) : null;

  return (
    <View style={styles.field} wrap={false}>
      <Text style={styles.fieldLabel}>
        {field.label ?? field.name ?? "Field"}
      </Text>

      {documentUrl ? (
        <View style={styles.signatureContainer}>
          <Image src={documentUrl} style={styles.signatureImage} />
        </View>
      ) : (
        <Text style={styles.fieldValue}>
          {getFieldDisplayValue(field, value)}
        </Text>
      )}
    </View>
  );
};

const DeclarationSection = ({
  section,
  values,
}: {
  section: DeclarationSection;
  values?: Record<string, unknown>;
}) => {
  const hasValues = !!values;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{getSectionTitle(section.id)}</Text>

        <Text style={styles.status}>
          {hasValues ? "Completed" : "Not completed"}
        </Text>
      </View>

      {section.text ? (
        <View
          style={{
            width: "100%",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: 9,
            paddingBottom: 7,
          }}
        >
          <Text style={styles.declarationText}>{htmlToText(section.text)}</Text>
        </View>
      ) : null}

      <View style={styles.fields}>
        {section.fields.map((field) => {
          if (!field.name) {
            return null;
          }

          return (
            <DeclarationField
              key={field.id}
              field={field}
              value={values?.[field.name]}
            />
          );
        })}
      </View>
    </View>
  );
};

const DeclarationsPdf = ({ sections, values }: DeclarationsPdfProps) => {
  const orderedSections = Object.values(sections);

  return (
    <Document title="Applicant Declarations">
      <Page size="A4" style={styles.page}>
        <Image src={letterHead} style={styles.backgroundImage} fixed />
        <Text style={styles.documentTitle}>Applicant Declarations</Text>
        {/* <View style={styles.header}>
          <Text style={styles.brand}>ARISE NURSING</Text>


          <Text style={styles.applicationId}>
            Application ID: {applicationId}
          </Text>
        </View> */}

        {orderedSections.map((section) => (
          <DeclarationSection
            key={section.id}
            section={section}
            values={values[section.id]}
          />
        ))}

        <View fixed style={styles.footer}>
          <Text style={styles.footerText}>Applicant Declarations</Text>

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

export default DeclarationsPdf;
