import DashboardCard from "../../components/DashboardCard";

interface WelcomeBannerProps {
  managerName: string;
  pendingReviews: number;
}

const WelcomeBanner = ({ managerName, pendingReviews }: WelcomeBannerProps) => {
  return (
    <DashboardCard className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white">
      <div className="space-y-2">
        <p className="text-sky-100">Welcome back,</p>

        <h1 className="text-3xl font-bold">{managerName}</h1>

        <p className="text-sky-100">
          You have <span className="font-semibold">{pendingReviews}</span> phase
          reviews awaiting action.
        </p>
      </div>
    </DashboardCard>
  );
};

export default WelcomeBanner;
