/**
 * -----------------------------------------------------------------------------
 * File: file.ts
 *
 * Description:
 * Shared contracts for files already stored by the backend.
 * -----------------------------------------------------------------------------
 */

export interface FormUploadedFile {
  /**
   * Unique identifier of the stored document.
   */
  id: string;

  /**
   * URL used to view/access the document.
   */
  document_url: string;

  /**
   * Original/display filename.
   */
  name: string;

  /**
   * MIME type returned by the backend.
   *
   * Examples:
   *
   * image/jpeg
   * image/png
   * application/pdf
   */
  mimeType?: string;

  /**
   * File size in bytes.
   */
  size?: number;

  /**
   * Date the document was uploaded.
   */
  createdAt?: string;
}

/**
 * Value used by a file field.
 *
 * Existing files come from the backend while new files are
 * browser File objects waiting to be uploaded.
 */
export interface FormFileValue {
  existing: FormUploadedFile[];

  newFiles: File[];
}

// Expected value

// {
//   existing: [
//     {
//       id: "1",
//       documentUrl: "/documents/certificate.pdf",
//       name: "certificate.pdf",
//       mimeType: "application/pdf",
//       size: 245000,
//     },
//     {
//       id: "2",
//       documentUrl: "/documents/passport.jpg",
//       name: "passport.jpg",
//       mimeType: "image/jpeg",
//       size: 180000,
//     },
//   ],
//   newFiles: [],
// }
