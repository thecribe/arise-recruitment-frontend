import { GlassCard } from "@/components/ui";

const timeline = [
  "Application Submitted",
  "Personal Details Approved",
  "Qualifications Approved",
  "Employment History Approved",
];

export default function ApplicationTimelineCard() {
  return (
    <GlassCard className="p-6">
      <h3 className="mb-5 text-lg font-semibold">Timeline</h3>

      <div className="space-y-4">
        {timeline.map((item) => (
          <div key={item} className="border-l-2 border-blue-200 pl-4">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
