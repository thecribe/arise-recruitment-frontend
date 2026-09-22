/**
 * -----------------------------------------------------------------------------
 * File: ApplicationReferences.tsx
 *
 * Description:
 * Displays applicant references inside the generated application form PDF.
 * -----------------------------------------------------------------------------
 */

import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface ApplicationReference {
  id?: string;
  companyName?: string;
  fromDate?: string;
  toDate?: string;
  refereeName?: string;
  refereeRelationship?: string;
  refereeEmail?: string;
  refereePhone?: string;
}

interface ApplicationReferencesProps {
  references: ApplicationReference[];
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 12,
  },

  heading: {
    color: "#1e3a8a",
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#2563eb",
  },

  referenceCard: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 5,
    backgroundColor: "#f8fafc",
  },

  referenceTitle: {
    color: "#1e40af",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },

  table: {
    width: "100%",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },

  labelColumn: {
    width: "38%",
    paddingRight: 8,
  },

  valueColumn: {
    width: "62%",
  },

  label: {
    color: "#475569",
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
  },

  value: {
    color: "#0f172a",
    fontSize: 8.5,
    lineHeight: 1.3,
  },

  emptyText: {
    color: "#64748b",
    fontSize: 9,
  },
});

const formatDate = (value?: string): string => {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB");
};

const ReferenceRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <View style={styles.labelColumn}>
      <Text style={styles.label}>{label}</Text>
    </View>

    <View style={styles.valueColumn}>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  </View>
);

const ApplicationReferences = ({ references }: ApplicationReferencesProps) => {
  if (!references || references.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>References</Text>
        <Text style={styles.emptyText}>No references provided.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} break>
      <Text style={styles.heading}>References</Text>

      {references.map((reference, index) => (
        <View
          key={reference.id ?? `reference-${index}`}
          style={styles.referenceCard}
        >
          <Text style={styles.referenceTitle}>Reference {index + 1}</Text>

          <View style={styles.table}>
            <ReferenceRow
              label="Name of Organisation"
              value={reference.companyName ?? ""}
            />

            <ReferenceRow
              label="Dates Worked From"
              value={formatDate(reference.fromDate)}
            />

            <ReferenceRow
              label="Dates Worked To"
              value={formatDate(reference.toDate)}
            />

            <ReferenceRow
              label="Referee Name and Surname"
              value={reference.refereeName ?? ""}
            />

            <ReferenceRow
              label="Referee Relationship"
              value={reference.refereeRelationship ?? ""}
            />

            <ReferenceRow
              label="Referee Email Address"
              value={reference.refereeEmail ?? ""}
            />

            <ReferenceRow
              label="Referee Phone Number"
              value={reference.refereePhone ?? ""}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default ApplicationReferences;
