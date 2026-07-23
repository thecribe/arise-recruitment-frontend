import DashboardCard from "../../components/DashboardCard";

interface Props {
  adminName: string;
}

const WelcomeBanner = ({ adminName }: Props) => (
  <DashboardCard className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <div className="space-y-2">
      <p className="text-blue-100">Welcome back,</p>

      <h1 className="text-3xl font-bold">{adminName}</h1>

      <p className="text-blue-100">Organisation recruitment overview.</p>
    </div>
  </DashboardCard>
);

export default WelcomeBanner;
