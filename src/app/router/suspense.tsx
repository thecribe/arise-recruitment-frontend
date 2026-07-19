import { Suspense, type ReactNode } from "react";

import PageLoader from "@/components/feedback/page-loader";

interface Props {
  children: ReactNode;
}

export default function RouteSuspense({ children }: Props) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
