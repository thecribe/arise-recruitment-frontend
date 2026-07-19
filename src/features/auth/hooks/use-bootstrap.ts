import { useCurrentUser } from "./use-current-user";

export function useBootstrap() {
  const currentUser = useCurrentUser();

  return {
    isLoading: currentUser.isLoading,
    isReady: !currentUser.isLoading,
    user: currentUser.data ?? null,
    error: currentUser.error,
  };
}
