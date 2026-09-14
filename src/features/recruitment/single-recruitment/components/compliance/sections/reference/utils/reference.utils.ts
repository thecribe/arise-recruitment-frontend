export const formatReferenceDate = (
  value: string | null | undefined,
): string => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatReferencePeriod = (
  fromDate: string | null | undefined,
  toDate: string | null | undefined,
): string => {
  if (!fromDate && !toDate) {
    return "—";
  }

  if (fromDate && !toDate) {
    return `${formatReferenceDate(fromDate)} – Present`;
  }

  if (!fromDate && toDate) {
    return `— – ${formatReferenceDate(toDate)}`;
  }

  return `${formatReferenceDate(fromDate)} – ${formatReferenceDate(toDate)}`;
};
