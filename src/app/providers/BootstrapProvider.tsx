import type { ReactNode } from "react";

import PageLoader from "@/components/feedback/page-loader";

import { useBootstrap } from "@/features/auth/hooks/use-bootstrap";

interface Props {
  children: ReactNode;
}

export default function BootstrapProvider({ children }: Props) {
  const { isLoading } = useBootstrap();

  if (isLoading) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
