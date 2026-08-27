// function isExistingFile(value: unknown): value is {
//   url: string;
//   name: string;
// } {
//   return (
//     typeof value === "object" && value !== null
//     // "url" in value &&
//     // "name" in value
//   );
// }

// function payloadToFormData(data: Record<string, unknown> | unknown): FormData {
//   const formData = new FormData();

//   const fileFields: Record<string, "single" | "multiple"> = {};

//   if (!data) {
//     return formData;
//   }

//   Object.entries(data).forEach(([key, value]) => {
//     if (value === null || value === undefined) {
//       return;
//     }

//     /*
//      * SINGLE NEW FILE
//      */
//     if (value instanceof File) {
//       formData.append(key, value);

//       fileFields[key] = "single";

//       return;
//     }

//     /*
//      * ARRAY
//      */
//     if (Array.isArray(value)) {
//       let hasFileValues = false;

//       value.forEach((item) => {
//         /*
//          * NEW FILE
//          */
//         if (item instanceof File) {
//           console.log(key, item);
//           formData.append(key, item);

//           hasFileValues = true;

//           return;
//         }

//         /*
//          * EXISTING FILE
//          */
//         if (isExistingFile(item)) {
//           formData.append(`${key}_existing`, JSON.stringify(item));

//           hasFileValues = true;

//           return;
//         }

//         /*
//          * NORMAL VALUES
//          */
//         if (
//           typeof item === "string" ||
//           typeof item === "number" ||
//           typeof item === "boolean"
//         ) {
//           formData.append(key, String(item));

//           return;
//         }

//         /*
//          * OTHER OBJECTS
//          */
//         if (typeof item === "object" && item !== null) {
//           formData.append(key, JSON.stringify(item));
//         }
//       });

//       /*
//        * Mark as a multiple file field.
//        */
//       if (hasFileValues) {
//         fileFields[key] = "multiple";
//       }

//       return;
//     }

//     /*
//      * NORMAL OBJECT
//      */
//     if (typeof value === "object") {
//       formData.append(key, JSON.stringify(value));

//       return;
//     }

//     /*
//      * PRIMITIVES
//      */
//     formData.append(key, String(value));
//   });

//   /*
//    * FILE METADATA
//    */
//   formData.append("__files", JSON.stringify(fileFields));

//   return formData;
// }

// export default payloadToFormData;

function isExistingFile(value: unknown): value is {
  url: string;
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
