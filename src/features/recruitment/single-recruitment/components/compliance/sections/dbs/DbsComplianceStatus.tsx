import { CheckCircle2, XCircle } from "lucide-react";

interface DbsManagerValues {
  expiryDate?: string | null;
}

interface DbsComplianceStatusProps {
  values: DbsManagerValues;
}

const parseDate = (value?: string | null): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export default function DbsComplianceStatus({
  values,
}: DbsComplianceStatusProps) {
  const expiryDate = parseDate(values.expiryDate);

  if (!expiryDate) {
    return null;
  }

  const today = new Date();

  // Compare calendar dates rather than time.
  today.setHours(0, 0, 0, 0);

  const isExpired = expiryDate < today;

  if (isExpired) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50/80 p-4 shadow-sm backdrop-blur-xl dark:border-red-900/50 dark:bg-red-950/30">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
          <XCircle className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">
            Expired DBS Check
          </h3>

          <p className="mt-1 text-sm text-red-700 dark:text-red-400">
            The DBS check has expired and requires attention.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-green-200 bg-green-50/80 p-4 shadow-sm backdrop-blur-xl dark:border-green-900/50 dark:bg-green-950/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
        <CheckCircle2 className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">
          DBS Check Valid
        </h3>

        <p className="mt-1 text-sm text-green-700 dark:text-green-400">
          The DBS check is currently valid.
        </p>
      </div>
    </div>
  );
}
