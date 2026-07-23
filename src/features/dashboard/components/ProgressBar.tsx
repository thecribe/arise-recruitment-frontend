import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>Overall Progress</span>
        <span>{value}%</span>
      </div>

      <Progress value={value} />
    </div>
  );
};

export default ProgressBar;
