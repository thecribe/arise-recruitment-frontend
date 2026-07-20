import { ROLE_CODES } from "@/constants/roles";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import ApplicantDashboard from "../components/applicant/ApplicantDashboard";

export default function DashboardPage() {
  const { data } = useCurrentUser();

  if (!data) return null;

  console.log("Current user:", data);

  switch (data.role) {
    case ROLE_CODES.APPLICANT:
      return <ApplicantDashboard />;

    // case ROLE_CODES.RECRUITMENT_MANAGER:
    //   return <ManagerDashboard />;

    // case ROLE_CODES.ADMIN:
    //   return <AdminDashboard />;
  }
}
