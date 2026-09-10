function isExistingFile(value: unknown): value is {
  document_url: string;
  name: string;
} {
  return (
    typeof value === "object" &&
    value !== null &&
    "document_url" in value &&
    "name" in value
  );
}

function payloadToFormData(data: unknown): FormData {
  const formData = new FormData();

  function processValue(value: unknown, path: string): unknown {
    if (value === null || value === undefined) {
      return value;
    }

    /*
     * NEW FILE
     */
    if (value instanceof File) {
      formData.append(path, value);

      return {
        __file: true,
        field: path,
      };
    }

    /*
     * EXISTING FILE
     */
    if (isExistingFile(value)) {
      return {
        __existingFile: true,
        ...value,
      };
    }

    /*
     * ARRAY
     */
    if (Array.isArray(value)) {
      return value.map((item, index) =>
        processValue(item, path ? `${path}_${index}` : String(index)),
      );
    }

    /*
     * OBJECT
     */
    if (typeof value === "object" && value !== null) {
      const result: Record<string, unknown> = {};

      Object.entries(value as Record<string, unknown>).forEach(
        ([key, item]) => {
          result[key] = processValue(item, path ? `${path}_${key}` : key);
        },
      );

      return result;
    }

    /*
     * PRIMITIVE
     */
    return value;
  }

  const processedData = processValue(data, "");

  /*
   * ROOT ARRAY OR OBJECT
   */
  if (
    Array.isArray(processedData) ||
    (typeof processedData === "object" && processedData !== null)
  ) {
    formData.append("__payload", JSON.stringify(processedData));
  } else {
    /*
     * ROOT PRIMITIVE
     */
    formData.append("__payload", String(processedData));
  }

  return formData;
}

export default payloadToFormData;
