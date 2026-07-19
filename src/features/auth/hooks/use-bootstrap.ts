import { useCurrentUser } from "./use-auth";

export function useBootstrap() {
  const currentUser = useCurrentUser();

  return {
    isLoading: currentUser.isLoading,
    isReady: !currentUser.isLoading,
    user: currentUser.data ?? null,
    error: currentUser.error,
  };
}
