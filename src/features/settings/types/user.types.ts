export interface AssignableRole {
  id: string;
  name: string;
  description: string | null;
  is_system: boolean;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  address: string | null;
  postcode: string | null;
  role_id: string;
  role: AssignableRole;
  job_type_id: string | null;
  profile_img: string | null;
  is_email_verified: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
  address?: string;
  postcode?: string;
  role_id: string;
  job_type_id?: string | null;
}

export interface UserUpdateValues {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string | null;
  address?: string | null;
  postcode?: string | null;
  job_type_id?: string | null;
}

export interface UserRoleValues {
  roleId: string;
}

export interface UserStatusValues {
  isActive: boolean;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  roleId?: string;
  isActive?: boolean;
}

export interface UserPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserListResponse {
  users: User[];
  pagination: UserPagination;
}

export interface UserApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
