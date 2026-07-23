import { MessageSquareQuote } from "lucide-react";

import DashboardCard from "../../components/DashboardCard";

import type { DashboardFeedback } from "../../types/dashboard";

interface Props {
  feedback?: DashboardFeedback;
}

const RecruiterFeedbackCard = ({ feedback }: Props) => {
  return (
    <DashboardCard>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <MessageSquareQuote className="text-primary" />

          <div>
            <h3 className="font-semibold">Recruiter Feedback</h3>

            <p className="text-sm text-muted-foreground">
              Latest communication from your recruiter
            </p>
          </div>
        </div>

        {feedback ? (
          <>
            <blockquote className="rounded-xl border-l-4 border-primary bg-muted/40 p-4 italic">
              {feedback.message}
            </blockquote>

            <div className="text-sm text-muted-foreground">
              {feedback.author} • {feedback.createdAt}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center">
            <p className="font-medium">No recruiter feedback.</p>

            <p className="mt-2 text-sm text-muted-foreground">
              You'll receive updates here whenever your recruiter leaves
              comments.
            </p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default RecruiterFeedbackCard;
