import DashboardCard from "../../components/DashboardCard";
import type { RecruitmentPipelineType } from "../../types/admin-dashboard";

interface Props {
  pipeline: RecruitmentPipelineType[];
}

const RecruitmentPipeline = ({ pipeline }: Props) => (
  <DashboardCard>
    <div className="space-y-5">
      <h3 className="text-lg font-semibold">Recruitment Pipeline</h3>

      {pipeline.map((item) => (
        <div
          key={item.phase}
          className="flex items-center justify-between border-b pb-3 last:border-none"
        >
          <span>{item.phase}</span>

          <span className="font-semibold">{item.total}</span>
        </div>
      ))}
    </div>
  </DashboardCard>
);

export default RecruitmentPipeline;
