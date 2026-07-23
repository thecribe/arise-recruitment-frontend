import DashboardCard from "./DashboardCard";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  onClick?: () => void;
}

const StatCard = ({ title, value, description, onClick }: StatCardProps) => {
  return (
    <DashboardCard onClick={onClick}>
      <p className="text-sm text-muted-foreground">{title}</p>

      <h3 className="mt-2 text-3xl font-bold">{value}</h3>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </DashboardCard>
  );
};

export default StatCard;
