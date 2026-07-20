/**
 * -----------------------------------------------------------------------------
 * File: use-navigation.ts
 * Description:
 * Returns navigation items available to the authenticated user.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { navigation } from "./navigation.config";
import { filterNavigation } from "./navigation.utils";

import { useCurrentUser } from "@/features/auth/hooks/use-auth";

export function useNavigation() {
  const { data: user } = useCurrentUser();

  return useMemo(() => {
    return filterNavigation(navigation, user?.permissions ?? []);
  }, [user]);
}
