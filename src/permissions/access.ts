import type { AuthUser } from "./types";

export function hasRole(user: AuthUser | null, allowedRoles: string[]) {
  if (!user) return false;

  return allowedRoles.includes(user.role);
}

export function hasPermission(user: AuthUser | null, permission: string) {
  if (!user) return false;

  return user.permissions.includes(permission);
}

export function hasAnyPermission(user: AuthUser | null, permissions: string[]) {
  if (!user) return false;

  return permissions.some((permission) =>
    user.permissions.includes(permission),
  );
}
