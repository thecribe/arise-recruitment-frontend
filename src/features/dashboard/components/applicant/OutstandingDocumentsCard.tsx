import { TriangleAlert } from "lucide-react";

import { GlassCard } from "@/components/ui";

const documents = ["Enhanced DBS", "Right to Work"];

export default function OutstandingDocumentsCard() {
  return (
    <GlassCard className="p-6">
      <h3 className="mb-5 text-lg font-semibold">Outstanding Documents</h3>

      <div className="space-y-4">
        {documents.map((document) => (
          <div key={document} className="flex items-center gap-3">
            <TriangleAlert className="h-5 w-5 text-amber-500" />

            <span>{document}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
