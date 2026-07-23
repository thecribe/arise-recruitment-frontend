/**
 * -----------------------------------------------------------------------------
 * File: buildFormData.ts
 *
 * Description:
 * Converts any object into FormData.
 *
 * Supports:
 * - primitives
 * - File
 * - Blob
 * - Arrays
 * - Nested objects
 * - null handling
 *
 * This is the single serializer used by the application.
 * -----------------------------------------------------------------------------
 */

function appendValue(formData: FormData, key: string, value: unknown): void {
  if (value === undefined || value === null) {
    return;
  }

  if (value instanceof File || value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  if (value instanceof Date) {
    formData.append(key, value.toISOString());
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendValue(formData, `${key}[${index}]`, item);
    });

    return;
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([childKey, childValue]) => {
      appendValue(formData, `${key}.${childKey}`, childValue);
    });

    return;
  }

  formData.append(key, String(value));
}

export function buildFormData<T extends Record<string, unknown>>(
  values: T,
): FormData {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    appendValue(formData, key, value);
  });

  return formData;
}
