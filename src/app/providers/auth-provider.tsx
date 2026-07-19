import { useCurrentUser } from "@/features/auth/hooks/use-auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useCurrentUser();

  return children;
}
