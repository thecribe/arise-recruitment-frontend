/**
 * -----------------------------------------------------------------------------
 * File: use-navigation.ts
 *
 * Description:
 * Returns navigation items available to the authenticated user.
 *
 * TOP_ADMIN has unrestricted access and therefore bypasses the
 * normal permission-based navigation filtering.
 * -----------------------------------------------------------------------------
 */

import { useMemo } from "react";

import { navigation } from "./navigation.config";
import { filterNavigation } from "./navigation.utils";

import { useCurrentUser } from "@/features/auth/hooks/use-auth";

export function useNavigation() {
  const { data: user } = useCurrentUser();

  return useMemo(() => {
    /**
     * TOP_ADMIN has all system permissions.
     *
     * We don't need to explicitly add every permission to the
     * user's permission array. The role itself represents
     * unrestricted access.
     */
    if (user?.role === "TOP_ADMIN") {
      return navigation;
    }

    /**
     * All other users are filtered according to their
     * assigned permissions.
     */
    return filterNavigation(
      navigation,
      user?.permissions ?? [],
    );
  }, [user]);
}