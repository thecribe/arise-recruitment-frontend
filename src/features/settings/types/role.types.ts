export interface Permission {
  id: string;
  name: string;
  description: string | null;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  is_system: boolean;
  permissions: Permission[];
  user_count: number;
  created_at: string;
  updated_at: string;
}

export interface RoleFormValues {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface RoleApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
