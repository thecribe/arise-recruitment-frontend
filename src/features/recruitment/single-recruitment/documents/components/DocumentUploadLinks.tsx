import type { FormUploadedFile } from "@/components/forms/types/file";

import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";

interface DocumentUploadLinksProps {
  value: FormUploadedFile | FormUploadedFile[];
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
  },

  /**
   * Table row
   */
  fileRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  /**
   * First column
   */
  fileNameColumn: {
    width: "68%",
    paddingRight: 10,
  },

  fileName: {
    color: "#334155",
    fontSize: 9,
    lineHeight: 1.4,
  },

  /**
   * Second column
   */
  actionColumn: {
    width: "32%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#2563eb",
    borderRadius: 4,
    color: "#ffffff",
    fontSize: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    textDecoration: "none",
  },

  emptyText: {
    color: "#64748b",
    fontSize: 9,
  },
});

const isFormUploadedFile = (value: unknown): value is FormUploadedFile => {
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

const isAbsoluteUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const DocumentUploadLinks = ({ value }: DocumentUploadLinksProps) => {
  const files = Array.isArray(value) ? value : [value];

  const validFiles = files.filter(isFormUploadedFile);

  if (validFiles.length === 0) {
    return <Text style={styles.emptyText}>No document uploaded</Text>;
  }

  return (
    <View style={styles.container}>
      {validFiles.map((file) => {
        const hasValidUrl = isAbsoluteUrl(file.document_url);

        return (
          <View key={file.id} style={styles.fileRow}>
            {/* Column 1: File name */}
            <View style={styles.fileNameColumn}>
              <Text style={styles.fileName}>{file.name}</Text>
            </View>

            {/* Column 2: Action button */}
            <View style={styles.actionColumn}>
              {hasValidUrl ? (
                <Link href={file.document_url} style={styles.button}>
                  View Document
                </Link>
              ) : (
                <Text style={styles.emptyText}>Invalid document URL</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default DocumentUploadLinks;
