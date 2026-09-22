import { StyleSheet, Text, View } from "@react-pdf/renderer";

import DocumentUploadLinks from "./DocumentUploadLinks";
import { FIELD_TYPES, type FieldType } from "@/components/forms/types/field";
import type { FormUploadedFile } from "@/components/forms/types/file";

interface ApplicationFormFieldProps {
  label: string;
  type: FieldType;
  value: unknown;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: "#64748b",
    fontSize: 9,
    marginBottom: 3,
  },
  value: {
    color: "#0f172a",
    fontSize: 10,
  },
  emptyValue: {
    color: "#94a3b8",
    fontSize: 10,
    fontStyle: "italic",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  listItem: {
    color: "#0f172a",
    fontSize: 10,
  },
});

const formatDate = (value: unknown): string => {
  if (typeof value !== "string" || !value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item)).join(", ");
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map((item) => formatValue(item))
      .join(", ");
  }

  return String(value);
};

const isUploadedFile = (value: unknown): value is FormUploadedFile => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const file = value as Partial<FormUploadedFile>;

  return (
    typeof file.id === "string" &&
    typeof file.document_url === "string" &&
    typeof file.name === "string"
  );
};

const ApplicationFormField = ({
  label,
  type,
  value,
}: ApplicationFormFieldProps) => {
  const isEmpty = value === null || value === undefined || value === "";

  const renderValue = () => {
    if (type === FIELD_TYPES.UPLOAD) {
      if (
        isUploadedFile(value) ||
        (Array.isArray(value) && value.some(isUploadedFile))
      ) {
        return (
          <DocumentUploadLinks
            value={value as FormUploadedFile | FormUploadedFile[]}
          />
        );
      }

      return <Text style={styles.emptyValue}>No document uploaded</Text>;
    }

    if (isEmpty) {
      return <Text style={styles.emptyValue}>—</Text>;
    }

    if (type === FIELD_TYPES.DATE) {
      return <Text style={styles.value}>{formatDate(value)}</Text>;
    }

    if (type === FIELD_TYPES.CHECKBOX) {
      if (Array.isArray(value)) {
        return (
          <View style={styles.list}>
            {value.map((item, index) => (
              <Text key={`${String(item)}-${index}`} style={styles.listItem}>
                • {formatValue(item)}
              </Text>
            ))}
          </View>
        );
      }
    }

    if (type === FIELD_TYPES.MULTISELECT) {
      return (
        <Text style={styles.value}>
          {Array.isArray(value)
            ? value.map((item) => formatValue(item)).join(", ")
            : formatValue(value)}
        </Text>
      );
    }

    return <Text style={styles.value}>{formatValue(value)}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {renderValue()}
    </View>
  );
};

export default ApplicationFormField;
