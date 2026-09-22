import { StyleSheet, Text, View } from "@react-pdf/renderer";

import type {
  ApplicationDefinitionField,
  ApplicationDefinitionSection,
} from "../types/document.types";

import ApplicationFormField from "./ApplicationFormField";

interface ApplicationFormSectionProps {
  section: ApplicationDefinitionSection;
  values: Record<string, unknown> | unknown[];
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    color: "#1e40af",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
  },
  description: {
    color: "#64748b",
    fontSize: 9,
    marginBottom: 12,
  },
  fieldsGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 18,
  },
  field: {
    width: "46%",
  },
  repeatableItem: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  itemTitle: {
    color: "#334155",
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 8,
  },
  emptyValue: {
    color: "#94a3b8",
    fontSize: 9,
    fontStyle: "italic",
  },
});

const getFieldValue = (
  values: Record<string, unknown>,
  field: ApplicationDefinitionField,
) => {
  return values[field.name];
};

const ApplicationFormSection = ({
  section,
  values,
}: ApplicationFormSectionProps) => {
  const isRepeatable = Boolean(section.repeatable);

  const repeatableValues = isRepeatable
    ? Array.isArray(values)
      ? values
      : []
    : [];

  const singleValues =
    !isRepeatable &&
    values &&
    !Array.isArray(values) &&
    typeof values === "object"
      ? (values as Record<string, unknown>)
      : {};

  const renderFields = (fieldValues: Record<string, unknown>) => {
    return (
      <View style={styles.fieldsGrid}>
        {section.fields.map((field) => (
          <View key={field.id} style={styles.field}>
            <ApplicationFormField
              label={field.label}
              type={field.type}
              value={getFieldValue(fieldValues, field)}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.section} wrap>
      <Text style={styles.title}>{section.title}</Text>

      {section.description && (
        <Text style={styles.description}>{section.description}</Text>
      )}

      {isRepeatable ? (
        repeatableValues.length > 0 ? (
          repeatableValues.map((item, index) => {
            const itemValues =
              item && typeof item === "object" && !Array.isArray(item)
                ? (item as Record<string, unknown>)
                : {};

            return (
              <View
                key={`${section.id}-${index}`}
                style={styles.repeatableItem}
                wrap={false}
              >
                <Text style={styles.itemTitle}>
                  {`${section.title} ${index + 1}`}
                </Text>

                {renderFields(itemValues)}
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyValue}>No information provided</Text>
        )
      ) : (
        renderFields(singleValues)
      )}
    </View>
  );
};

export default ApplicationFormSection;
