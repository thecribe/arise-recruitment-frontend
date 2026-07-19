export type UserRole =
  | "APPLICANT"
  | "RECRUITMENT_MANAGER"
  | "ADMIN"
  | "STAFF_MANAGER";

export interface AuthUser {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  role: UserRole;

  phone?: string;

  avatar?: string;

  createdAt: string;

  updatedAt: string;
}

export interface LoginPayload {
  email: string;

  password: string;
}

export interface RegisterPayload {
  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  address: string;

  postcode: string;

  jobType: string;

  // password: string;

  // confirmPassword: string;

  acceptTerms: boolean;
}
export interface LoginResponse {
  user: AuthUser;
}
