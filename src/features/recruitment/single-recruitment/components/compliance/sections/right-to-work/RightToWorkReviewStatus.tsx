import { CheckCircle2, Clock3, XCircle } from "lucide-react";

interface RightToWorkManagerValues {
  checkDate?: string | null;
  rightToWorkExpiryDate?: string | null;
}

interface RightToWorkReviewStatusProps {
  values: RightToWorkManagerValues;
}

type ReviewState = "valid" | "due_for_review" | "expired";

interface ReviewStateConfig {
  title: string;
  message: string;
  icon: typeof CheckCircle2;
  containerClassName: string;
  iconClassName: string;
  titleClassName: string;
  messageClassName: string;
}

const getSixMonthsAgo = (date: Date) => {
  const result = new Date(date);

  result.setMonth(result.getMonth() - 6);

  return result;
};

const parseDate = (value?: string | null): Date | null => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  // Create local date to avoid timezone shifts.
  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const getReviewState = (
  values: RightToWorkManagerValues,
): ReviewState | null => {
  const checkDate = parseDate(values.checkDate);
  const expiryDate = parseDate(values.rightToWorkExpiryDate);

  if (!checkDate || !expiryDate) {
    return null;
  }

  const today = new Date();

  // Ignore the current time and work with calendar dates.
  today.setHours(0, 0, 0, 0);

  // ---------------------------------------------------------------
  // Expired takes priority over every other state.
  // ---------------------------------------------------------------
  if (expiryDate < today) {
    return "expired";
  }

  // ---------------------------------------------------------------
  // Due for review when the check date is 6 months old or older.
  // ---------------------------------------------------------------
  const sixMonthsAgo = getSixMonthsAgo(today);

  if (checkDate <= sixMonthsAgo) {
    return "due_for_review";
  }

  // ---------------------------------------------------------------
  // Otherwise the right to work is currently valid.
  // ---------------------------------------------------------------
  return "valid";
};

const stateConfig: Record<ReviewState, ReviewStateConfig> = {
  valid: {
    title: "Right to Work Valid",
    message: "The right to work is currently valid.",
    icon: CheckCircle2,
    containerClassName:
      "border-green-200 bg-green-50/80 dark:border-green-900/50 dark:bg-green-950/30",
    iconClassName:
      "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    titleClassName: "text-green-800 dark:text-green-300",
    messageClassName: "text-green-700 dark:text-green-400",
  },

  due_for_review: {
    title: "Right to Work Due for Review",
    message: "The right to work check is due for review.",
    icon: Clock3,
    containerClassName:
      "border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/30",
    iconClassName:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    titleClassName: "text-amber-800 dark:text-amber-300",
    messageClassName: "text-amber-700 dark:text-amber-400",
  },

  expired: {
    title: "Expired Right to Work",
    message: "The right to work has expired and requires attention.",
    icon: XCircle,
    containerClassName:
      "border-red-200 bg-red-50/80 dark:border-red-900/50 dark:bg-red-950/30",
    iconClassName:
      "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
    titleClassName: "text-red-800 dark:text-red-300",
    messageClassName: "text-red-700 dark:text-red-400",
  },
};

export default function RightToWorkReviewStatus({
  values,
}: RightToWorkReviewStatusProps) {
  const reviewState = getReviewState(values);

  if (!reviewState) {
    return null;
  }

  const config = stateConfig[reviewState];

  const StatusIcon = config.icon;

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border p-4 shadow-sm backdrop-blur-xl ${config.containerClassName}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconClassName}`}
      >
        <StatusIcon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <h3 className={`text-sm font-semibold ${config.titleClassName}`}>
          {config.title}
        </h3>

        <p className={`mt-1 text-sm ${config.messageClassName}`}>
          {config.message}
        </p>
      </div>
    </div>
  );
}
