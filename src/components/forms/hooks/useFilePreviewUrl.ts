import { useEffect, useState } from "react";

import type { FormFile } from "../utils/file";

import { isExistingFile } from "../utils/file";

export function useFilePreviewUrl(file: FormFile | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl(null);
      return;
    }

    /**
     * Existing backend file.
     */
    if (isExistingFile(file)) {
      setUrl(file.document_url);

      return;
    }

    /**
     * Newly selected browser file.
     */
    const objectUrl = URL.createObjectURL(file);

    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return url;
}
